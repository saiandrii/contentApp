import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { ContentContext } from "../AppContext";
import { filterItem, getData, storeData } from "../AyncStorage";
import { colors, formattedToday } from "../misc";

import BooksItem from "../components/BooksComponents/BooksItem";
import Popup from "../components/Popup";

import BookModalAdditem from "../components/BooksComponents/BookModal/BookModalAdditem";

import FilterComponent from "../components/FilterComponent";
import { MotiView } from "moti";

const Books = ({ navigation }) => {
  const { sorted, setSorted } = useContext(ContentContext);
  const { bookItem, setBookItem } = useContext(ContentContext);
  const { filtered, setFiltered } = useContext(ContentContext);
  const { editModal, setEditModal } = useContext(ContentContext);
  const [refreshing, setRefreshing] = useState(false);

  const [filteredArray, setFilteredArray] = useState([]);

  const scrollRef = useRef();

  const handleAsync = async () => {
    try {
      const bookItemData = await getData("bookItem");

      if (bookItemData === null) {
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
        setBookItem(parsed);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleAsync();
  }, []);

  const filteredBooks = bookItem.filter((element) => {
    const stringElement = element?.name.toLowerCase().replaceAll(" ", "");

    const stringElementAuthor = element?.author
      .toLowerCase()
      .replaceAll(" ", "");

    const filterElement = filtered?.toLowerCase().replaceAll(" ", "");

    const newItems =
      stringElement?.includes(filterElement) ||
      stringElementAuthor?.includes(filterElement);

    return newItems;
  });

  useEffect(() => {
    if (filtered.length === 0) {
      setFilteredArray([]);
    } else {
      setFilteredArray(filteredBooks);
    }
  }, [filtered]);

  return (
    <View style={{ flex: 1 }}>
      {sorted ? <Popup /> : null}

      <FlatList
        bounces={false}
        ListHeaderComponent={
          <MotiView>
            <FilterComponent />
          </MotiView>
        }
        contentContainerStyle={{ backgroundColor: "#eeeeee", paddingTop: 95 }}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        data={filteredArray.length > 0 ? filteredArray : bookItem}
        renderItem={({ item }) => {
          return <BooksItem item={item} />;
        }}
      />
      {editModal === true ? <BookModalAdditem /> : null}
    </View>
  );
};

export default Books;

const styles = StyleSheet.create({});
