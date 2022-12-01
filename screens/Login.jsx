import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Box, Button } from 'native-base';
import { TextInput } from 'react-native';
import styles from '../styles/loginStyles';

const Login = () => {
  const [isMember, setIsMember] = useState(false);
  const [values, setValues] = useState({
    username: '',
    password: '',
    email: '',
  });

  return (
    <Box style={styles.container}>
      <View>
        <TextInput
          style={styles.inputField}
          placeholder="Enter your username"
          onChangeText={(text) => setValues({ ...values, username: text })}
        />

        {isMember && (
          <TextInput
            style={styles.inputField}
            placeholder="Enter your email"
            onChangeText={(text) => setValues({ ...values, email: text })}
          />
        )}

        <TextInput
          passwordRules={
            'required: lower; required: upper; required: digit; required: [-]; minlength: 8;'
          }
          secureTextEntry
          style={styles.inputField}
          placeholder="Enter your Password"
          onChangeText={(text) => setValues({ ...values, password: text })}
        />

        <Button
          style={styles.button}
          onPress={() => console.log('hello world')}
          colorScheme="secondary"
        >
          <Text style={styles.buttonText}>
            {isMember ? 'Sign Up' : 'Login'}
          </Text>
        </Button>
      </View>

      {!isMember ? (
        <View style={styles.signup}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <Button
            style={styles.signUpButton}
            onPress={() => setIsMember(true)}
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
            onPress={() => setIsMember(false)}
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
