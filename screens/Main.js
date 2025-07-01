import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Books from "./Books";
import Music from "./Music";
import Films from "./Films";
import { colors } from "../misc";

import toggleStore from "../store/toggleStore";
import { View } from "moti";
import ActionMenu from "../components/ActionMenuCompnent/ActionMenu";

const Tab = createMaterialTopTabNavigator();
const Main = ({}) => {
  const { searchPressed, toggleDial } = toggleStore();

  // const navigation = useNavigation();

  // useEffect(() => {
  //   if (searchPressed) {
  //     navigation.navigate("Search");

  //     toggleDial(false);
  //   }
  //   if (!searchPressed) {
  //     navigation.navigate("Main");
  //   }
  // }, [searchPressed]);

  return (
    <View style={{ flex: 1 }}>
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

      <ActionMenu />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
