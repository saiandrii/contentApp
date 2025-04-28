import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useAnimatedValue,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";

import AddItemModal from "../components/AddItemModal";
import AddItemButton from "../components/AddItemButton";
import { ContentContext } from "../AppContext";
import { getData, storeData } from "../AyncStorage";
import { formattedToday } from "../misc";
import MusicItem from "../components/MusicComponents/MusicItem";
import { useNavigationState } from "@react-navigation/native";

const Music = ({ navigation }) => {
  const { buttonVisible, setButtonVisible } = useContext(ContentContext);
  const { musicItem, setMusicItem } = useContext(ContentContext);
  const { sorted, setSorted } = useContext(ContentContext);
  const { activeState, setActiveState } = useContext(ContentContext);

  const size = Dimensions.get("window").width / numColumns;
  const scrollRef = useRef();
  const numColumns = 2;
  const scrollX = useAnimatedValue(0);
  const { width: windowWidth } = useWindowDimensions();

  const state = useNavigationState((state) => state);
  useEffect(() => {
    setActiveState(state.index);
  }, [state]);

  const handleAsync = async () => {
    try {
      const musicItemData = await getData("musicItem");

      if (musicItemData === null) {
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
        setMusicItem(parsed);
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
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      ref={scrollRef}
      data={musicItem}
      renderItem={({ item }) => <MusicItem item={item} />}
      onScroll={(e) => {
        let offset = 0;
        const currentOffset = e.nativeEvent.contentOffset.y;

        const direction = currentOffset > offset ? "down" : "up";

        if (direction === "down") {
          setButtonVisible("none");
        } else if (direction === "up") {
          setButtonVisible("flex");
        }
      }}
      scrollEventThrottle={1}
    />
  );
};

export default Music;

const styles = StyleSheet.create({});
