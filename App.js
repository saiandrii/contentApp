import { StatusBar, View } from "react-native";
import StackNavigator from "./StackNavigator";
import AddItemModal from "../contentapp/components/AddItemModal";
import ActionMenu from "./components/ActionMenu";
import BookModalAdditem from "./components/BooksComponents/BookModal/BookModalAdditem";

export default function App() {
  return (
    <>
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
        <AddItemModal />
        <BookModalAdditem />
        <ActionMenu />
      </View>
    </>
  );
}
