import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ContentContext } from "../../../AppContext";
import ModalButton from "../../ModalButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getData, storeData } from "../../../AyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, formattedToday } from "../../../misc";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "../../DatePicker";

const BookEditModal = ({ item }) => {
  const [pressed, setPressed] = useState();

  const { bookItem, setBookItem } = useContext(ContentContext);
  const { modalVisible, setModalVisible } = useContext(ContentContext);
  const { editModal, setEditModal } = useContext(ContentContext);
  const { bookItemData, setBookItemData } = useContext(ContentContext);

  const [showPicker, setShowPicker] = useState(false);
  const [itemName, setItemName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [itemLength, setitemLength] = useState("");
  const [itemFinishDate, setItemFinishDate] = useState("");
  const [itemStartDate, setItemStartDate] = useState("");
  const [itemPages, setItemPages] = useState("");
  const [itemIsbn, setitemIsbn] = useState("");
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [sendReady, setSendReady] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);

  const [imageItem, setImageItem] = useState("");

  const numbers = [1, 2, 3, 4, 5];

  var s = new Date(itemStartDate).toLocaleDateString("en-GB");
  var f = new Date(itemFinishDate).toLocaleDateString("en-GB");

  useEffect(() => {
    setPressed(numbers[2]);
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
        itemLength.length <= 0 ? itemToUpdate.pages : itemLength;

      itemToUpdate.start = itemStartDate.length <= 0 ? itemToUpdate.start : s;

      itemToUpdate.finish =
        itemFinishDate.length <= 0 ? itemToUpdate.finish : f;
      itemToUpdate.number = pressed;

      const jsonValue = JSON.stringify(bookItem);
      await AsyncStorage.setItem("bookItem", jsonValue);
      const bookItemDataParse = await getData("bookItem");
      const parsed = JSON.parse(bookItemDataParse);

      setBookItem(parsed);
      setEditModal(false);
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
        setImageItem(json.url);
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
                item={itemStartDate}
                dateformat={s}
                text={bookItemData?.start}
                onPress={() => {
                  setShowPicker(!showPicker);
                  setStart(!start);
                }}
              />
              <DatePicker
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

                  width: "32%",
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
                  placeholder={bookItemData?.pages}
                  placeholderTextColor={colors.placeholder}
                  maxLength={5}
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    fontSize: 15,
                  }}
                />
              </View>

              <View
                style={{
                  backgroundColor: colors.itembg,

                  width: "55%",
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
                    setitemIsbn("978-");
                  }}
                  onChangeText={(text) => {
                    setitemIsbn(text);
                  }}
                  keyboardType="numeric"
                  placeholder={bookItemData?.isbn}
                  placeholderTextColor={colors.placeholder}
                  maxLength={17}
                  multiline
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    fontSize: 15,
                  }}
                />
              </View>
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
});
