import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./screens/Main";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { ContentContext } from "./AppContext";
import { colors } from "./misc";
import Popup from "./components/Popup";

const Stack = createStackNavigator();
const StackNavigator = ({ navigation }) => {
  const { modalVisible, setModalVisible } = useContext(ContentContext);
  const { sorted, setSorted } = useContext(ContentContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          options={{
            title: "",
            headerTintColor: "#EEEEEE",
            headerTitleAlign: "center",

            headerStyle: {
              // backgroundColor: "#222831",
              backgroundColor: colors.outline,
              elevation: 0,
            },
          }}
          name="Main"
          component={Main}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
