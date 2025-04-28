import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../misc";
import Ionicons from "@expo/vector-icons/Ionicons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import ModalButton from "./ModalButton";

const DatePicker = ({ onChange, onPress, item, dateformat, text }) => {
  return (
    <View>
      <ModalButton
        fontstyle={{
          fontWeight: "bold",
          fontSize: 18,
          color: "white",
        }}
        style={{
          width: 148,
          height: 70,
          elevation: 0,
          borderRadius: 10,
          margin: 5,
        }}
        name={
          item ? (
            dateformat
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="calendar-outline" size={28} color="#eeeeee" />
              <Text
                style={{
                  paddingHorizontal: 20,
                  fontSize: 12,
                  paddingTop: 5,
                  paddingBottom: 5,
                  color: "white",
                }}
              >
                {text}
              </Text>
            </View>
          )
        }
        onPress={onPress}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
