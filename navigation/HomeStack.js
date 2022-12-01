import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Products, SingleProduct } from "../screens";

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Lux Woodwork"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Products List" component={Products} />
      <HomeStack.Screen name="Product" component={SingleProduct} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
