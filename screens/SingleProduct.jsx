import { useIsFocused } from "@react-navigation/native";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
} from "native-base";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components";
import { fetchProduct } from "../features/products/productsSlice";
import { FontAwesome } from "@expo/vector-icons";
import { formatPrice } from "../utils/formatPrice";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleProduct = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { productId } = route.params;
  const { product, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [isFocused]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product?.images?.map((image) => (
          <Image
            source={{ uri: image }}
            key={image}
            alt={image}
            w={windowWidth}
            h={300}
          />
        ))}
      </ScrollView>
      <Flex
        px={4}
        mt={4}
        direction="row"
        align="center"
        justify="space-between"
      >
        <Text fontWeight="bold" fontSize={20}>
          {product?.name}
        </Text>
        <Flex direction="row" align="center" justify="space-between">
          <Icon as={<FontAwesome name="star" />} size="md" color="yellow.400" />
          <Text mb={1} fontSize={18}>
            {product?.averageRating}
          </Text>
        </Flex>
      </Flex>

      <View p={4}>
        <Text color="gray.400">{product.description}</Text>
      </View>

      <View px={4} mt={2}>
        <Text color="gray.400" mb={2}>
          Availability: {product.inventory > 0 ? "In Stock" : "Out of Stock"}
        </Text>
        <Text color="gray.400" mb={2}>
          SKU: {product._id}
        </Text>
        <Text color="gray.400">Category: {product.category}</Text>
      </View>

      <View
        px={4}
        my={8}
        direction="row"
        align="center"
        justify="space-between"
      >
        <Button leftIcon={<Icon as={FontAwesome} name="cart-plus" size="lg" />}>
          {formatPrice(product.price)}
        </Button>
      </View>
    </ScrollView>
  );
};

export default SingleProduct;
