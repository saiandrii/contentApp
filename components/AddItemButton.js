import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";

import { FontAwesome6 } from "@expo/vector-icons";
import { ContentContext } from "../AppContext";
import { colors } from "../misc";

const AddItemButton = () => {
  const { modalVisible, setModalVisible } = useContext(ContentContext);
  const { buttonVisible, setButtonVisible } = useContext(ContentContext);
  const { sorted, setSorted } = useContext(ContentContext);

  const windowHeight = Dimensions.get("screen").height;

  return (
    <TouchableOpacity
      onPress={() => (setModalVisible(true), setSorted(false))}
      activeOpacity={0.9}
      style={{}}
    >
      <View
        style={{
          display: buttonVisible,
          borderRadius: 30,

          elevation: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.additionalOne,
          width: 60,
          height: 60,
        }}
      >
        <View>
          <FontAwesome6 name="add" size={43} color="#EEEEEE" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddItemButton;

const styles = StyleSheet.create({
  // addbuttonLowScreen: { top: 640, left: 340 },
  // addbuttonHighScreen: { top: 700, left: 310 },
});
