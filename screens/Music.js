import { FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";

import { getData, storeData } from "../AyncStorage";
import { formattedToday } from "../misc";
import MusicList from "../components/MusicComponents/MusicSorted/MusicList";
import itemStore from "../store/itemStore";

const Music = ({ navigation }) => {
  const { musicItem, musicState } = itemStore();

  const handleAsync = async () => {
    try {
      const musicItemData = await getData("musicItem");

      if (musicItemData === null || musicItemData === undefined) {
        try {
          const jsonValue = JSON.stringify([
            {
              name: "This is your first music item",
              author: "Tap on me to delete",
              length: "00:00",
              finish: formattedToday,
              number: "5",
              id: new Date() + Math.random(),
            },
            ...musicItem,
          ]);
          await storeData("musicItem", jsonValue);
        } catch (e) {
          console.log(e);
        }
      } else {
        const musicItemData = await getData("musicItem");
        const parsed = JSON.parse(musicItemData);
        musicState(parsed);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleAsync();
  }, []);

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: "#eeeeee",
        paddingTop: 95,
      }}
      showsVerticalScrollIndicator={false}
      data={musicItem}
      renderItem={({ item }) => <MusicList item={item} />}
    />
  );
};

export default Music;

const styles = StyleSheet.create({});
