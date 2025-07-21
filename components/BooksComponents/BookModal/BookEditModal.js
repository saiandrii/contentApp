import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModalButton from "../../ModalButton";
import { getData } from "../../../AyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, screenWidth } from "../../../misc";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "../../DatePicker";
import { MotiView } from "moti";
import PicturePicker from "../../PicturePicker/PicturePicker";
import itemStore from "../../../store/itemStore";
import toggleStore from "../../../store/toggleStore";

const BookEditModal = ({ item }) => {
  const [pressed, setPressed] = useState();

  const { bookItem, bookItemArray, image, imageState, bookItemData } =
    itemStore();

  const { toggleEditModal } = toggleStore();

  const [itemName, setItemName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [itemFinishDate, setItemFinishDate] = useState("");
  const [itemStartDate, setItemStartDate] = useState("");
  const [itemPages, setItemPages] = useState("");
  const [itemIsbn, setitemIsbn] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [animatedPressIsbn, setAnimatedPressIsbn] = useState(false);

  const numbers = [1, 2, 3, 4, 5];

  var s = new Date(itemStartDate).toLocaleDateString("en-GB");
  var f = new Date(itemFinishDate).toLocaleDateString("en-GB");

  useEffect(() => {
    setPressed(bookItemData?.number);
  }, []);

  const handleBookItem = async () => {
    try {
      const newItems = [...bookItem].findIndex(
        (obj) => obj.id === bookItemData?.id
      );

      const itemToUpdate = bookItem[newItems];

      itemToUpdate.name = itemName.length <= 0 ? itemToUpdate.name : itemName;

      itemToUpdate.author =
        authorName.length <= 0 ? itemToUpdate.author : authorName;

      itemToUpdate.isbn = itemIsbn.length <= 0 ? itemToUpdate.isbn : itemIsbn;

      itemToUpdate.pages =
        itemPages.length == 0 ? itemToUpdate.pages : itemPages;

      itemToUpdate.start = itemStartDate.length <= 0 ? itemToUpdate.start : s;

      itemToUpdate.finish =
        itemFinishDate.length <= 0 ? itemToUpdate.finish : f;
      itemToUpdate.number = pressed;

      itemToUpdate.number =
        itemToUpdate.number === pressed ? itemToUpdate.number : pressed;

      itemToUpdate?.image
        ? itemToUpdate?.image
        : itemToUpdate?.picture && imageState(itemToUpdate?.picture);

      itemToUpdate.picture = image;

      const jsonValue = JSON.stringify(bookItem);
      await AsyncStorage.setItem("bookItem", jsonValue);
      const bookItemDataParse = await getData("bookItem");
      const parsed = JSON.parse(bookItemDataParse);

      bookItemArray(parsed);
      toggleEditModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  async function getBookCover() {
    const url = `https://bookcover.longitood.com/bookcover/${itemIsbn}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setWrongInput(true);
      } else if (response.ok) {
        const json = await response.json();
        imageState(json.url);
        setWrongInput(false);
        console.log(json);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  if (itemIsbn.length === 17) {
    getBookCover();
  }

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.outline,
          height: 450,

          marginHorizontal: 10,
          borderRadius: 10,
          elevation: 2,
        }}
      >
        <View style={{ paddingTop: 20 }}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.itembg,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",

                width: "90%",
                height: 80,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 20,
                  fontSize: 12,
                  paddingTop: 5,
                  color: "white",
                }}
              >
                name
              </Text>
              <TextInput
                value={itemName}
                onChangeText={(text) => setItemName(text)}
                placeholder={bookItemData?.name}
                placeholderTextColor={colors.placeholder}
                maxLength={60}
                numberOfLines={1}
                style={{
                  width: "100%",
                  paddingHorizontal: 20,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: colors.itembg,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: 10,
                width: "90%",
                height: 80,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 20,
                  fontSize: 12,
                  paddingTop: 5,
                  color: "white",
                }}
              >
                author
              </Text>
              <TextInput
                value={authorName}
                onChangeText={(text) => setAuthorName(text)}
                placeholder={bookItemData?.author}
                placeholderTextColor={colors.placeholder}
                maxLength={60}
                numberOfLines={2}
                multiline
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  color: "white",
                  paddingHorizontal: 20,
                  fontSize: 18,
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                marginTop: 20,
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <DatePicker
                style={styles.dateWidth}
                item={itemStartDate}
                dateformat={s}
                text={bookItemData?.start ? bookItemData?.start : "start date"}
                onPress={() => {
                  setShowPicker(!showPicker);
                  setStart(!start);
                }}
              />
              <DatePicker
                style={styles.dateWidth}
                item={itemFinishDate}
                dateformat={f}
                text={
                  bookItemData?.finish == "Invalid Date"
                    ? "finish date"
                    : bookItemData?.finish
                }
                onPress={() => {
                  setShowPicker(!showPicker);
                  setFinish(!finish);
                }}
              />
              {showPicker && (
                <RNDateTimePicker
                  display="spinner"
                  style={{ display: "none" }}
                  mode="date"
                  value={new Date()}
                  onChange={(text) => (
                    start
                      ? (setItemStartDate(text.nativeEvent.timestamp),
                        setStart(!start))
                      : finish
                      ? (setItemFinishDate(text.nativeEvent.timestamp),
                        setFinish(!finish))
                      : null,
                    setShowPicker(!showPicker)
                  )}
                />
              )}
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: colors.itembg,

                  width: "25%",
                  height: 60,
                  borderRadius: 10,
                  marginTop: 70,
                  paddingHorizontal: 10,

                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 5,
                }}
              >
                <TextInput
                  value={itemPages}
                  onChangeText={(text) => {
                    setItemPages(text);
                  }}
                  keyboardType="numeric"
                  placeholder={
                    bookItemData?.pages ? bookItemData?.pages : "pages..."
                  }
                  placeholderTextColor={colors.placeholder}
                  maxLength={5}
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    fontSize: 15,
                  }}
                />
              </View>

              <MotiView
                animate={{
                  width: animatedPressIsbn ? "40%" : "30%",
                }}
                style={{
                  backgroundColor: colors.itembg,

                  height: 60,
                  borderRadius: 10,
                  marginTop: 70,
                  borderWidth: wrongInput ? 1 : 0,
                  borderColor: wrongInput ? "red" : null,

                  justifyContent: "center",

                  alignItems: "center",
                  paddingHorizontal: 10,
                  marginHorizontal: 4,
                }}
              >
                <TextInput
                  value={itemIsbn}
                  onFocus={() => {
                    setAnimatedPressIsbn(true);
                    if (itemIsbn.length <= 4) {
                      setitemIsbn("978-");
                    }
                  }}
                  onBlur={() => {
                    if (itemIsbn.length <= 4) {
                      setAnimatedPressIsbn(false);

                      setitemIsbn("");
                    }
                  }}
                  onChangeText={(text) => {
                    setitemIsbn(text);
                  }}
                  placeholder={
                    bookItemData?.isbn ? bookItemData?.isbn : "ISBN..."
                  }
                  placeholderTextColor={colors.placeholder}
                  keyboardType="numeric"
                  maxLength={17}
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    fontSize: 15,
                  }}
                />
              </MotiView>

              <MotiView
                animate={{
                  width: animatedPressIsbn ? "20%" : "30%",
                }}
                style={{
                  backgroundColor: colors.itembg,

                  width: "26.25%",
                  height: 60,
                  borderRadius: 10,
                  marginTop: 70,

                  justifyContent: "center",

                  alignItems: "center",
                  paddingHorizontal: 10,
                  marginHorizontal: 4,
                }}
              >
                <PicturePicker />
              </MotiView>
            </View>
            <View
              style={{
                height: 80,
                width: "90%",
                flexDirection: "row",
                borderRadius: 10,
                top: 10,
                backgroundColor: colors.itembg,

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {numbers.map((item) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={Math.random()}
                  onPress={() => {
                    setPressed(item);
                  }}
                >
                  <View style={pressed === item ? styles.viewSelected : null}>
                    <Text
                      style={
                        pressed === item
                          ? styles.numberSelected
                          : styles.numberStyle
                      }
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      <ModalButton
        onPress={() => handleBookItem()}
        name="edit item"
        fontstyle={{ fontSize: 20 }}
        style={{
          marginBottom: 10,
          backgroundColor: colors.outline,
          width: "95%",
          marginTop: -15,
          height: 60,
        }}
      />
    </View>
  );
};

export default BookEditModal;

const styles = StyleSheet.create({
  numberStyle: {
    fontSize: 20,
    color: "#eeeeee",
  },
  numberSelected: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#eeeeee",
  },
  viewSelected: {
    height: 60,
    width: 60,
    borderRadius: 15,
    elevation: 2,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.outline,
  },
  dateWidth: {
    width:
      screenWidth > 360 && screenWidth != 448
        ? 170
        : screenWidth == 448
        ? 185
        : 148,
  },
});
