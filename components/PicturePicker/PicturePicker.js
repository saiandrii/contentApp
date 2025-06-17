import { StyleSheet, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../../misc";
import itemStore from "../../store/itemStore";

const PicturePicker = () => {
  const { image, imageState } = itemStore();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [10, 16],
      quality: 1,
    });

    if (!result.canceled) {
      imageState(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
      {typeof image != "undefined" ? (
        <FontAwesome name="check" size={24} color={colors.additionalOne} />
      ) : (
        <FontAwesome name="photo" size={20} color="#eeeeee" />
      )}
    </TouchableOpacity>
  );
};

export default PicturePicker;

const styles = StyleSheet.create({});
