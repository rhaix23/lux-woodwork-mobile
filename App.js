import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Account, Cart, Home, Products, Login } from './screens';
import { store } from './store';
import { Provider } from 'react-redux';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Products">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Products" component={Products} />
            <Drawer.Screen name="Cart" component={Cart} />
            <Drawer.Screen name="Account" component={Account} />
            <Drawer.Screen name="Login" component={Login} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
