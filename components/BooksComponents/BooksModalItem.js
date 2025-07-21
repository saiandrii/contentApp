import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ModalButton from "../ModalButton";
import { getData, storeData } from "../../AyncStorage";
import { colors, screenWidth } from "../../misc";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "../DatePicker";
import { MotiView } from "moti";
import PicturePicker from "../PicturePicker/PicturePicker";

import itemStore from "../../store/itemStore";
import toggleStore from "../../store/toggleStore";

const BooksModalItem = ({}) => {
  const { bookItem, bookItemArray, image, imageState } = itemStore();
  const { toggleModal, toggleBooks } = toggleStore();

  const [pressed, setPressed] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [animatedPressIsbn, setAnimatedPressIsbn] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [itemName, setItemName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [itemFinishDate, setItemFinishDate] = useState("");
  const [itemStartDate, setItemStartDate] = useState("");
  const [itemPages, setItemPages] = useState("");
  const [itemIsbn, setitemIsbn] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const numbers = [1, 2, 3, 4, 5];

  var s = new Date(itemStartDate).toLocaleDateString("en-GB");
  var f = new Date(itemFinishDate).toLocaleDateString("en-GB");

  const handleBookItem = async () => {
    try {
      setIsLoading(true);
      async function getBookCover() {
        const url = `https://bookcover.longitood.com/bookcover/${itemIsbn}`;
        try {
          const response = await fetch(url);
          if (response.ok || itemIsbn.length === 0) {
            const json = await response.json();

            const jsonValue = JSON.stringify([
              {
                name: itemName,
                author: authorName,
                start: new Date(itemStartDate).toLocaleDateString("en-GB"),
                finish: new Date(itemFinishDate).toLocaleDateString("en-GB"),

                number: pressed ? pressed : undefined,
                id: new Date() + Math.random(),
                pages: itemPages,
                isbn: itemIsbn,
                image: json.url,
                picture: image,
                type: "book",
              },
              ...bookItem,
            ]);

            storeData("bookItem", jsonValue);

            toggleModal(), toggleBooks(false);

            const bookItemData = await getData("bookItem");
            const parsed = JSON.parse(bookItemData);
            bookItemArray(parsed);

            // imageState(json.url);
            setWrongInput(false);
            imageState(null);
          } else {
            imageState(null);

            setWrongInput(true);
            setIsLoading(false);
          }
        } catch (error) {
          imageState(null);

          setIsLoading(false);

          console.error(error.message);
        }
      }
      getBookCover();
    } catch (e) {
      setIsLoading(false);

      console.log(e);
    }
  };

  // async function getBookCover() {
  //   const url = `https://bookcover.longitood.com/bookcover/${itemIsbn}`;
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       setWrongInput(true);
  //     } else if (response.ok) {
  //       const json = await response.json();
  //       imageState(json.url);
  //       setWrongInput(false);
  //       console.log(json);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);

  //     console.error(error.message);
  //   }
  // }

  return (
    <View>
      <MotiView
        animate={{ height: isFinished ? 450 : 360 }}
        transition={{
          duration: 300,
          type: "timing",
        }}
        style={{
          backgroundColor: colors.outline,

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
                onChangeText={(text) => setItemName(text)}
                placeholder="item name..."
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
                placeholder="author..."
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
                text={"start date"}
                onPress={() => {
                  setShowPicker(!showPicker);
                  setStart(!start);
                }}
              />
              <DatePicker
                style={styles.dateWidth}
                item={itemFinishDate}
                dateformat={f}
                text={"finish date"}
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
                    start && text.type == "set"
                      ? (setItemStartDate(text.nativeEvent.timestamp),
                        setStart(!start))
                      : finish && text.type == "set"
                      ? (setItemFinishDate(text.nativeEvent.timestamp),
                        setFinish(!finish),
                        setIsFinished(true))
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
                  placeholder="pages"
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
                animate={{ width: animatedPressIsbn ? "40%" : "30%" }}
                style={{
                  backgroundColor: colors.itembg,

                  width: "26.25%",
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
                  keyboardType="numeric"
                  placeholder="ISBN..."
                  placeholderTextColor={colors.placeholder}
                  maxLength={17}
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    fontSize: 15,
                  }}
                />
              </MotiView>

              <MotiView
                animate={{ width: animatedPressIsbn ? "20%" : "30%" }}
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

            {
              // <View
              //   style={{
              //     flexDirection: "row",
              //     justifyContent: "space-around",
              //     width: "90%",
              //     height: 80,
              //     borderRadius: 10,
              //     top: 10,
              //     marginBottom: 10,
              //   }}
              // >
              //   <CheckBoxComponent
              //     onPress={() => (
              //       setCheckBoxReading(!checkBoxReading),
              //       setCheckBoxFinished(false)
              //     )}
              //     text={"reading"}
              //   />
              //   <CheckBoxComponent
              //     onPress={() => (
              //       setCheckBoxFinished(!checkBoxFinished),
              //       setCheckBoxReading(false)
              //     )}
              //     text={"finished"}
              //   />
              // </View>
            }

            {isFinished ? (
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
            ) : null}
          </View>
        </View>
      </MotiView>
      {(itemName, authorName, itemStartDate).length !== 0 &&
      itemPages.length >= 1 ? (
        <ModalButton
          onPress={() => handleBookItem()}
          name={
            isLoading ? (
              <ActivityIndicator size={"large"} color={colors.additionalOne} />
            ) : (
              "add item"
            )
          }
          fontstyle={{ fontSize: 20 }}
          style={{
            marginBottom: 10,
            backgroundColor: colors.outline,
            width: "95%",
            marginTop: -15,
            height: 60,
          }}
        />
      ) : null}
    </View>
  );
};

export default BooksModalItem;

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
