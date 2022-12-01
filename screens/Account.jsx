import { Button, View, Text } from "native-base";

const Account = ({ navigation }) => {
  return (
    <View p={4}>
      <Text>Account</Text>
      <Button mb={8} onPress={() => navigation.navigate("Profile")}>
        Profile Page
      </Button>
      <Button mb={8} onPress={() => navigation.navigate("Address")}>
        Addresses Page
      </Button>
      <Button mb={8} onPress={() => navigation.navigate("Wishlist")}>
        Wishlist Page
      </Button>
    </View>
  );
};

export default Account;
