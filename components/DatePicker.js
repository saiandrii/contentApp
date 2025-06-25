import { StyleSheet, Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import ModalButton from "./ModalButton";

const DatePicker = ({
  onPress,
  item,
  dateformat,
  text,
  style,
  wrapperStyle,
  textStyle,
}) => {
  return (
    <View>
      <ModalButton
        wrapperStyle={{ ...wrapperStyle }}
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
          ...style,
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
                  ...textStyle,
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
