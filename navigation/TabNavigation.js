import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import { Cart } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import AccountStackScreen from "./AccountStack";
import HomeStackScreen from "./HomeStack";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Icon as={<Ionicons name={iconName} />} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={AccountStackScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
