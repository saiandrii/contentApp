import { SafeAreaView, StatusBar, View } from "react-native";
import { AppProvider, ContentContext } from "./AppContext";
import AddItemButton from "./components/AddItemButton";
import StackNavigator from "./StackNavigator";
import { colors } from "./misc";
import { useContext } from "react";
import * as NavigationBar from "expo-navigation-bar";
import AddItemModal from "../contentapp/components/AddItemModal";
import AnimatedModalButtom from "../contentapp/components/AnimatedModalButton";
import ActionMenu from "./components/ActionMenu";

export default function App() {
  return (
    <>
      <AppProvider>
        <StatusBar
          backgroundColor="transparent"
          barStyle={"dark-content"}
          translucent={true}
        />

        <StackNavigator />
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",

            position: "absolute",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            padding: 20,
          }}
        >
          {/* <AddItemButton /> */}
          {/* <AnimatedModalButtom /> */}
          <AddItemModal />
          <ActionMenu />
        </View>
      </AppProvider>
    </>
  );
}
