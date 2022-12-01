import { Dimensions } from "react-native";
import {
  Badge,
  Box,
  Button,
  FlatList,
  Flex,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Select,
  Text,
  View,
} from "native-base";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import categories from "../utils/categories";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  setCategoryFilter,
  setFreeShippingFilter,
  setSearchFilter,
  setSort,
} from "../features/products/productsSlice";
import { formatPrice } from "../utils/formatPrice";
import Loader from "../components/Loader";

const windowWidth = Dimensions.get("window").width;

const listHeaderComponent = () => {
  const dispatch = useDispatch();
  const { searchFilter, categoryFilter, freeShippingFilter, sort } =
    useSelector((state) => state.products);

  return (
    <View px="1">
      <Box mb="2">
        <Input
          InputLeftElement={
            <Icon
              as={<FontAwesome name="search" />}
              size="sm"
              ml="2"
              color="muted.400"
            />
          }
          fontSize="16"
          placeholder="Find a product"
          onChangeText={(text) => dispatch(setSearchFilter(text))}
          value={searchFilter}
        />
      </Box>
      <Flex mb="2" direction="row" justifyContent="space-between">
        <Select
          selectedValue={sort}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
          }}
          onValueChange={(itemValue) => dispatch(setSort(itemValue))}
        >
          <Select.Item label="Price: Low to High" value="Price: Low to High" />
          <Select.Item label="Price: High to Low" value="Price: High to Low" />
          <Select.Item
            label="Alphabetically: A to Z"
            value="Alphabetically: A to Z"
          />
          <Select.Item
            label="Alphabetically: Z to A"
            value="Alphabetically: Z to A"
          />
        </Select>
        <Button
          colorScheme={freeShippingFilter ? "success" : "info"}
          variant={freeShippingFilter ? "solid" : "outline"}
          marginRight="2"
          flex="2"
          leftIcon={
            <Icon
              as={FontAwesome5}
              name="shipping-fast"
              size="sm"
              color={freeShippingFilter ? "white" : "gray.400"}
            />
          }
          onPress={() => dispatch(setFreeShippingFilter())}
        >
          <Text color={freeShippingFilter ? "white" : "black"}>
            Free Shipping
          </Text>
        </Button>
      </Flex>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <Button
            variant={categoryFilter === category.value ? "solid" : "outline"}
            colorScheme={categoryFilter === category.value ? "success" : "info"}
            marginRight="2"
            borderRadius="20"
            minW="20"
            key={category.id}
            onPress={() => dispatch(setCategoryFilter(category.value))}
          >
            <Text color={categoryFilter === category.value ? "white" : "black"}>
              {category.displayText}
            </Text>
          </Button>
        ))}
      </ScrollView>
    </View>
  );
};

const Products = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    products,
    searchFilter,
    freeShippingFilter,
    categoryFilter,
    loading,
    sort,
  } = useSelector((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    let filteredProducts = products;

    filteredProducts = products.filter(
      (product) => !product.isDeleted && !product.isArchived
    );

    filteredProducts = filteredProducts.filter((product) =>
      categoryFilter === "all" ? product : product.category === categoryFilter
    );

    if (freeShippingFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.freeShipping
      );
    }

    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase())
    );

    switch (sort) {
      case "Price: High to Low": {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      }
      case "Alphabetically: A to Z": {
        filteredProducts = [...filteredProducts].sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        break;
      }
      case "Alphabetically: Z to A": {
        filteredProducts = [...filteredProducts].sort((a, b) =>
          a.name > b.name ? -1 : 1
        );
        break;
      }
      default: {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      }
    }

    setFilteredProducts(filteredProducts);
  }, [products, freeShippingFilter, categoryFilter, searchFilter, sort]);

  if (loading) {
    return <Loader />;
  }

  return (
    <FlatList
      ListHeaderComponent={listHeaderComponent}
      data={filteredProducts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Pressable
          shadow="2"
          bg="white"
          mx="1"
          my="2"
          onPress={() =>
            navigation.navigate("Product", { productId: item._id })
          }
        >
          <Box position="relative">
            <Image
              source={{ uri: item?.images[0] }}
              h="160"
              w={windowWidth / 2 - 10}
              resizeMode="cover"
              alt="product image"
            />
            {item?.inventory <= 0 ? (
              <Badge
                alignSelf="center"
                variant="solid"
                position="absolute"
                right="1"
                top="1"
                leftIcon={
                  <Icon as={MaterialCommunityIcons} name="cart-off" size="sm" />
                }
              >
                Out of Stock
              </Badge>
            ) : item?.featured ? (
              <Badge
                colorScheme="success"
                alignSelf="center"
                variant="subtle"
                position="absolute"
                right="1"
                top="1"
                leftIcon={
                  <Icon
                    as={FontAwesome5}
                    name="medal"
                    size="sm"
                    color="green.500"
                  />
                }
              >
                Featured
              </Badge>
            ) : null}
          </Box>
          <Box p="2">
            <Text color="gray.400" fontSize={14}>
              {item?.name}
            </Text>
            <Text fontSize={16} bold>
              {formatPrice(item?.price)}
            </Text>
          </Box>
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

export default Products;
