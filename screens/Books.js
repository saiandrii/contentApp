import { BackHandler, FlatList, StyleSheet, View } from "react-native";

import React, { useEffect, useRef, useState } from "react";

import { filterItem, getData, storeData } from "../AyncStorage";
import { colors, formattedToday } from "../misc";

import BooksItem from "../components/BooksComponents/BooksItem";
import Popup from "../components/Popup";

import BookModalAdditem from "../components/BooksComponents/BookModal/BookModalAdditem";

import FilterComponent from "../components/FilterComponent/FilterComponent";

import toggleStore from "../store/toggleStore";
import itemStore from "../store/itemStore";

const Books = ({ navigation }) => {
  const { bookItem, bookItemArray } = itemStore();
  const { sorted } = toggleStore();

  const scrollRef = useRef();

  const handleAsync = async () => {
    try {
      const bookItemData = await getData("bookItem");

      if (bookItemData === null || bookItemData === undefined) {
        try {
          const jsonValue = JSON.stringify([
            {
              name: "This is your first book item",
              author: "Tap on me to delete",
              length: "00:00",
              finish: formattedToday,
              number: "5",
              id: new Date() + Math.random(),
            },
            ...bookItem,
          ]);
          await storeData("bookItem", jsonValue);
        } catch (e) {
          console.log(e);
        }
      } else {
        const bookItemData = await getData("bookItem");
        const parsed = JSON.parse(bookItemData);
        bookItemArray(parsed);
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
      {sorted ? <Popup /> : null}

      <FlatList
        bounces={false}
        // ListHeaderComponent={<FilterComponent />}
        contentContainerStyle={{ paddingTop: 95, paddingBottom: 25 }}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        data={bookItem}
        renderItem={({ item }) => {
          return <BooksItem item={item} />;
        }}
      />
    </View>
  );
};

export default Books;

const styles = StyleSheet.create({});
