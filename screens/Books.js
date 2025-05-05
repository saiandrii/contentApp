import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useAnimatedValue,
  useWindowDimensions,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import AddItemModal from "../components/AddItemModal";
import AddItemButton from "../components/AddItemButton";
import { ContentContext } from "../AppContext";
import { filterItem, getData, storeData } from "../AyncStorage";
import { colors, formattedToday } from "../misc";
import MusicItem from "../components/MusicComponents/MusicItem";
import BooksItem from "../components/BooksComponents/BooksItem";
import Popup from "../components/Popup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { debounce, filter } from "lodash";
import BookEditModal from "../components/BooksComponents/BookModal/BookEditModal";
import BookModalAdditem from "../components/BooksComponents/BookModal/BookModalAdditem";

const Books = ({ navigation }) => {
  const { buttonVisible, setButtonVisible } = useContext(ContentContext);

  const { sorted, setSorted } = useContext(ContentContext);
  const { bookItem, setBookItem } = useContext(ContentContext);
  const { filtered, setFiltered } = useContext(ContentContext);
  const { editModal, setEditModal } = useContext(ContentContext);

  const [scrolled, setScrolled] = useState(true);
  const [itemData, setItemData] = useState();
  const [filteredArray, setFilteredArray] = useState([]);
  const [searchPressed, setSearchPressed] = useState(false);

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

  const fadeAnim = useAnimatedValue(scrolled ? 50 : 0);

  const animation = () => {
    Animated.timing(fadeAnim, {
      toValue: scrolled ? 50 : 0,
      duration: scrolled ? 30 : 30,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          borderRadius: 5,
          height: fadeAnim,
          backgroundColor: colors.placeholder,
          justifyContent: "center",

          marginHorizontal: 10,
          marginTop: scrolled ? 10 : 0,
          marginBottom: scrolled ? 5 : 0,
          elevation: 1,
        }}
      >
        {scrolled ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.additionalOne,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                }}
                activeOpacity={0.8}
              >
                {filtered.length <= 0 ? (
                  <Fontisto
                    name="search"
                    size={20}
                    color="#eeeeee"
                    onPress={() => ""}
                  />
                ) : (
                  <Ionicons
                    name="close-outline"
                    size={30}
                    color="#eeeeee"
                    onPress={() => (setFiltered(""), Keyboard.dismiss())}
                  />
                )}
              </TouchableOpacity>

              <View>
                <TextInput
                  onFocus={() => {
                    setSorted(false);
                  }}
                  value={filtered}
                  onChangeText={(text) => {
                    setFiltered(text);
                  }}
                  placeholder="book name or author..."
                  style={{
                    left: 10,
                    borderRadius: 10,
                    fontSize: 15,
                    paddingHorizontal: 5,
                    width: 235,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="sort-variant"
                size={28}
                color="black"
                onPress={() => setSorted(!sorted)}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </Animated.View>
      {sorted ? <Popup /> : null}
      <FlatList
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        data={filteredArray.length > 0 ? filteredArray : bookItem}
        renderItem={({ item }) => {
          return <BooksItem item={item} />;
        }}
        onScroll={(e) => {
          let offset = 0;
          const currentOffset = e.nativeEvent.contentOffset.y;

          const direction = currentOffset > offset ? "down" : "up";

          if (currentOffset > 200) {
            setSorted(false);
            setButtonVisible("none");
            setScrolled(false);
            animation();
          } else if (currentOffset <= 300) {
            setSorted(false);

            setButtonVisible();
            setScrolled(true);
            animation();
          }
        }}
        scrollEventThrottle={1}
      />
      {editModal === true ? <BookModalAdditem /> : null}
    </View>
  );
};

export default Books;

const styles = StyleSheet.create({});
