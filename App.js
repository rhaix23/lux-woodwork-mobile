import "react-native-gesture-handler";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigation from "./navigation/TabNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Provider store={store}>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
