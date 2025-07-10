import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import itemStore from "../../store/itemStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../../misc";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../../AyncStorage";
import toggleStore from "../../store/toggleStore";

const FilmsItem = () => {
  const { pickedFilmItem, filmItem, filmState } = itemStore();
  const { cardToggle } = toggleStore();

  const deleteData = async () => {
    try {
      const newItems = [...filmItem].filter((data) => data != pickedFilmItem);
      const jsonValue = JSON.stringify(newItems);
      await AsyncStorage.setItem("filmItem", jsonValue);
      const filmItemData = await getData("filmItem");
      const parsed = JSON.parse(filmItemData);
      filmState(parsed);
      cardToggle(false);
    } catch (e) {
      console.log(e);
    }
  };

  const stars = () => {
    const starsArray = [];
    for (let i = 1; i <= 5; i++) {
      starsArray.push(
        <View
          key={i}
          style={{
            paddingHorizontal: 8,
          }}
        >
          {i <= pickedFilmItem?.number ? (
            <FontAwesome name="star" size={28} color={colors.additionalOne} />
          ) : (
            <FontAwesome name="star-o" size={28} color={colors.additionalOne} />
          )}
        </View>
      );
    }
    return starsArray;
  };

  return (
    <View>
      <View style={{ width: "100%", alignItems: "center", paddingTop: 15 }}>
        <TouchableOpacity
          style={{
            right: 0,
            padding: 10,
            position: "absolute",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          onPress={deleteData}
        >
          <Feather name="trash" size={26} color={colors.additionalOne} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 5 }}>
            {pickedFilmItem?.name}
          </Text>
          <Text style={{ paddingBottom: 3 }}>{pickedFilmItem?.author}</Text>
          <Text style={{ fontStyle: "italic", paddingBottom: 10 }}>
            {pickedFilmItem?.year}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 13 }}>length: {pickedFilmItem?.length}</Text>

          <Text style={{ fontSize: 13 }}>finish: {pickedFilmItem?.finish}</Text>
        </View>
      </View>
      <View
        style={{
          padding: 15,
        }}
      >
        <Text
          android_hyphenationFrequency="full"
          style={{ fontSize: 16, fontStyle: "italic", alignSelf: "flex-start" }}
        >
          {pickedFilmItem?.description}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {stars()}
        </View>
      </View>
    </View>
  );
};

export default FilmsItem;

const styles = StyleSheet.create({});
