import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import toggleStore from "../../store/toggleStore";
import FilmsModalCard from "./FilmsModalCard";
import itemStore from "../../store/itemStore";

const FilmsGrid = ({ item }) => {
  const { cardToggle } = toggleStore();
  const { pickedFilmItemState, filmItem } = itemStore();

  return (
    <TouchableOpacity
      onPress={() => {
        cardToggle(true);
        pickedFilmItemState(item);
      }}
      activeOpacity={0.7}
      style={{
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 10,
      }}
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
        <View style={{ width: 150, height: 250, backgroundColor: "red" }}>
          <Text>{item?.name}</Text>
          <Text>{item?.author}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FilmsGrid;

const styles = StyleSheet.create({});
