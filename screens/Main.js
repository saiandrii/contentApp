import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext } from "react";
import Books from "./Books";
import Music from "./Music";
import Films from "./Films";
import { colors } from "../misc";
import { ContentContext } from "../AppContext";
import { useNavigationState } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
const Main = ({ navigation }) => {
  const { sorted, setSorted } = useContext(ContentContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 40,
          backgroundColor: " rgba(238, 238, 238, 0.97)",
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        tabBarActiveTintColor: colors.additionalOne,

        tabBarIndicatorStyle: {
          display: "none",
          backgroundColor: colors.additionalOne,
          height: 5,
        },
        tabBarPressOpacity: 0,
        tabBarPressColor: "#eeeeee",
      }}
    >
      <Tab.Screen name="music">
        {(navigation) => <Music navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="books">
        {(navigation) => <Books navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="films">
        {(navigation) => <Films navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
