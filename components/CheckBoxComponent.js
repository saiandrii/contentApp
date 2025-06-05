import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import React from "react";
import { colors } from "../misc";

const CheckBoxComponent = ({ onPress, text }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BouncyCheckbox
        textStyle={{ textDecorationLine: "none" }}
        size={25}
        fillColor={colors.additionalOne}
        unFillColor="#eeeeee"
        disableText
        innerIconStyle={{ borderWidth: 2 }}
        onPress={onPress}
      />
      <Text
        style={{
          color: "#eeeeee",
          paddingTop: 10,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default CheckBoxComponent;

const styles = StyleSheet.create({});
