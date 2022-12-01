import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { Loader } from "../components";
import { Account, Address, Login, Profile, Wishlist } from "../screens";

const AccountStack = createNativeStackNavigator();

function AccountStackScreen() {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  console.log("user", user);

  return (
    <AccountStack.Navigator>
      {user ? (
        <>
          <AccountStack.Screen name="My Account" component={Account} />
          <AccountStack.Screen name="Profile" component={Profile} />
          <AccountStack.Screen name="Address" component={Address} />
          <AccountStack.Screen name="Wishlist" component={Wishlist} />
        </>
      ) : (
        <AccountStack.Screen name="Login" component={Login} />
      )}
    </AccountStack.Navigator>
  );
}

export default AccountStackScreen;
