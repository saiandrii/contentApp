import { FlatList, StyleSheet, Text, View } from "react-native";
import itemStore from "../store/itemStore";
import { useEffect } from "react";
import { getData, storeData } from "../AyncStorage";
import FilmsList from "../components/FilmsComponent/FilmsList";
import FilmsGrid from "../components/FilmsComponent/FilmsGrid";
import FilmsModalCard from "../components/FilmsComponent/FilmsModalCard";
import { formattedToday } from "../misc";

const Films = () => {
  const { filmItem, filmState } = itemStore();

  const handleAsync = async () => {
    try {
      const filmItemData = await getData("filmItem");

      if (filmItemData === null || filmItemData === undefined) {
        try {
          const jsonValue = JSON.stringify([
            {
              name: "This is your first film item",
              author: "Tap on me to delete",
              length: "00:00",
              finish: formattedToday,
              number: "5",
              year: "1993",
              id: new Date() + Math.random(),
            },
            ...filmItem,
          ]);
          await storeData("filmItem", jsonValue);
          const filmItemData = await getData("filmItem");
          const parsed = JSON.parse(filmItemData);
          filmState(parsed);
        } catch (e) {
          console.log(e);
        }
      } else {
        const filmItemData = await getData("filmItem");
        const parsed = JSON.parse(filmItemData);
        filmState(parsed);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleAsync();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          paddingTop: 95,
          paddingBottom: 35,
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
        data={filmItem}
        renderItem={({ item }) => <FilmsGrid item={item} />}
        ListFooterComponent={<FilmsModalCard />}
      />
    </View>
  );
};

export default Films;

const styles = StyleSheet.create({});
