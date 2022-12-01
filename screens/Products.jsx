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
  Text,
  View,
} from "native-base";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import categories from "../utils/categories";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  setCategoryFilter,
  setFreeShippingFilter,
  setSearchFilter,
} from "../features/products/productsSlice";
import { formatPrice } from "../utils/formatPrice";

const windowWidth = Dimensions.get("window").width;

const listHeaderComponent = () => {
  const dispatch = useDispatch();
  const { searchFilter, categoryFilter, freeShippingFilter } = useSelector(
    (state) => state.products
  );

  console.log("search: " + searchFilter);
  console.log("category: " + categoryFilter);
  console.log("freeShipping: " + freeShippingFilter);

  return (
    <View px="1" pt="2">
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
        <Button
          variant="outline"
          marginRight="2"
          flex="1"
          leftIcon={
            <Icon as={FontAwesome} name="sort" size="sm" color="gray.400" />
          }
        >
          <Text>Alphabet</Text>
        </Button>
        <Button
          variant="outline"
          marginRight="2"
          flex="1"
          leftIcon={
            <Icon as={FontAwesome} name="sort" size="sm" color="gray.400" />
          }
        >
          <Text>Price</Text>
        </Button>
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

const Products = () => {
  const dispatch = useDispatch();

  const { products, freeShippingFilter, categoryFilter, loading } = useSelector(
    (state) => state.products
  );

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    let filteredProducts = products.filter(
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

    setFilteredProducts(filteredProducts);
  }, [products, freeShippingFilter, categoryFilter]);

  if (loading) {
    return <Text>Loading...</Text>;
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
          onPress={() => console.log("hello")}
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
