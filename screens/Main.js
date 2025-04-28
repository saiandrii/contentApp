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
        tabBarPressOpacity: 1,
        tabBarStyle: {
          backgroundColor: colors.outline,
          elevation: 0,
        },
        tabBarLabelStyle: { color: "#EEEEEE", fontWeight: "bold" },
        tabBarIndicatorStyle: {
          backgroundColor: colors.additionalOne,
          height: 5,
        },
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
