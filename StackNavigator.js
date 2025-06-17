import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./screens/Main";
import Search from "./screens/Search";
import ActionMenu from "./components/ActionMenu";

const Stack = createStackNavigator();
const StackNavigator = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            title: "",
            headerShown: false,
          }}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          options={{
            title: "",
            headerShown: false,
          }}
          name="Search"
          component={Search}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
