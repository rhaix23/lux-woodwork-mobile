import { Image, View, Text, Button } from "react-native";
import React, { useEffect, useRef } from "react";
import { Box, Container } from "native-base";
import { ImageBackground } from "react-native";
import { Animated } from "react-native";
import styles from "../styles/homeStyles";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/users/userSlice";
import { Loader } from "../components";

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const Home = ({ navigation }) => {
  return (
    <Box>
      <View>
        <ImageBackground
          source={{
            uri: "https://res.cloudinary.com/teascript/image/upload/v1663866947/Lux-Woodwork/steph-wilson-G4fICun7Q48-unsplash_f2equq.jpg",
          }}
          style={styles.hero}
        >
          <FadeInView style={styles.heroContent}>
            <Text style={styles.heroText}>Find Your</Text>
            <Text style={styles.heroText}>Dream Furniture</Text>
            <View style={styles.btnContainer}>
              <Button
                style={styles.button}
                title="Shop Now"
                onPress={() => navigation.navigate("Products List")}
              />
            </View>
          </FadeInView>
        </ImageBackground>
      </View>
      <View>
        <Text>Every Furniture We Build</Text>
        <Text>Is Unique And Personal.</Text>
      </View>

      <Box style={styles.tiles}>
        <View>
          <Text>50+</Text>
          <Text>Years of Experience</Text>
        </View>
        <View>
          <Text>50+</Text>
          <Text>Years of Experience</Text>
        </View>
        <View>
          <Text>50+</Text>
          <Text>Years of Experience</Text>
        </View>
      </Box>
    </Box>
  );
};

export default Home;
