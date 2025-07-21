import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";

import toggleStore from "../../store/toggleStore";

import itemStore from "../../store/itemStore";
import { colors } from "../../misc";

const FilmsGrid = ({ item }) => {
  const { cardToggle } = toggleStore();
  const { pickedFilmItemState } = itemStore();

  return (
    <TouchableOpacity
      onPress={() => {
        cardToggle(true);
        pickedFilmItemState(item);
      }}
      activeOpacity={0.7}
      style={{ paddingHorizontal: 10, paddingTop: 15 }}
    >
      {item?.image ? (
        <Image
          style={{
            width: 150,
            height: 250,

            borderRadius: 5,
          }}
          source={{ uri: item?.image }}
        />
      ) : (
        <View
          style={{
            borderRadius: 5,
            width: 150,
            height: 250,
            backgroundColor: colors.placeholder,
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            {item?.name}
          </Text>
          <Text>{item?.author}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FilmsGrid;

const styles = StyleSheet.create({});
