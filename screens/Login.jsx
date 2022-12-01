import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Icon,
  Input,
  PresenceTransition,
  Pressable,
  Stack,
} from "native-base";
import styles from "../styles/loginStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/users/userSlice";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isMember, setIsMember] = useState(true);
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async () => {
    if (isMember) {
      dispatch(
        loginUser({ username: values.username, password: values.password })
      );
      navigation.navigate("Home");
    }
  };

  return (
    <Box style={styles.container}>
      <Stack space={2}>
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Enter your username"
          onChangeText={(text) => setValues({ ...values, username: text })}
          isRequired
        />

        <PresenceTransition
          visible={!isMember}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 250,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 250,
            },
          }}
          style={{
            width: "100%",
          }}
        >
          {!isMember && (
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="mail" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="Enter your email"
              onChangeText={(text) => setValues({ ...values, email: text })}
              isRequired={!isMember}
            />
          )}
        </PresenceTransition>

        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="Password"
          onChangeText={(text) => setValues({ ...values, password: text })}
        />

        <Button
          style={styles.button}
          onPress={handleSubmit}
          colorScheme="secondary"
        >
          <Text style={styles.buttonText}>
            {!isMember ? "Sign Up" : "Login"}
          </Text>
        </Button>
      </Stack>

      {isMember ? (
        <View style={styles.signup}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <Button
            style={styles.signUpButton}
            onPress={() => setIsMember(!isMember)}
            colorScheme="secondary"
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Button>
        </View>
      ) : (
        <View style={styles.signup}>
          <Text style={styles.signUpText}>Already have an account?</Text>
          <Button
            style={styles.signUpButton}
            onPress={() => setIsMember(!isMember)}
            colorScheme="secondary"
          >
            <Text style={styles.signUpButtonText}>Login</Text>
          </Button>
        </View>
      )}
    </Box>
  );
};

export default Login;
