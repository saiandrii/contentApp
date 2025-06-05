import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";

import { ContentContext } from "../AppContext";
import { colors } from "../misc";
import { MotiView } from "moti";

const AddItemButton = ({
  onPress,
  style,
  icon,
  animate,
  animateIcon,
  transition,
  transitionIcon,
  from,
  exit,
}) => {
  const { modalVisible, setModalVisible } = useContext(ContentContext);
  const { buttonVisible, setButtonVisible } = useContext(ContentContext);
  const { sorted, setSorted } = useContext(ContentContext);
  const { expanded, setExpanded } = useContext(ContentContext);

  const windowHeight = Dimensions.get("screen").height;

  return (
    <TouchableOpacity
      // onPress={() => (setModalVisible(true), setSorted(false))}
      onPress={onPress}
      activeOpacity={0.9}
      style={{}}
    >
      <MotiView
        transition={transition}
        animate={animate}
        from={from}
        exit={exit}
        style={{
          display: buttonVisible,
          borderRadius: 30,

          elevation: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.additionalOne,
          width: 60,
          height: 60,
          ...style,
        }}
      >
        <MotiView transition={transitionIcon} animate={animateIcon}>
          {icon}
        </MotiView>
      </MotiView>
    </TouchableOpacity>
  );
};

export default AddItemButton;

const styles = StyleSheet.create({
  // addbuttonLowScreen: { top: 640, left: 340 },
  // addbuttonHighScreen: { top: 700, left: 310 },
});
