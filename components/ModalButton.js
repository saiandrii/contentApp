import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../misc";

const ModalButton = ({
  name,
  icon,
  onPress,
  style,
  fontstyle,
  wrapperStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25,
        ...wrapperStyle,
      }}
      onPress={onPress}
    >
      <View
        style={{
          elevation: 2,

          backgroundColor: colors.itembg,
          borderRadius: 10,

          justifyContent: "center",
          alignItems: "center",
          ...style,
        }}
      >
        <View style={{ paddingBottom: 4 }}>{icon}</View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#eeeeee",
            ...fontstyle,
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ModalButton;

const styles = StyleSheet.create({});
