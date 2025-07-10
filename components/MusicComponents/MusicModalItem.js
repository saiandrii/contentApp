import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import ModalButton from "../ModalButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getData, storeData } from "../../AyncStorage";
import { colors } from "../../misc";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import toggleStore from "../../store/toggleStore";
import itemStore from "../../store/itemStore";
import DatePicker from "../DatePicker";
import albumArt from "album-art";

const MusicModalItem = ({}) => {
  const { musicItem, musicState } = itemStore();
  const { toggleModal } = toggleStore();

  const [pressed, setPressed] = useState();

  const [itemName, setItemName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [itemLength, setitemLength] = useState("");

  const [finish, setFinish] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [itemFinishDate, setItemFinishDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const numbers = [1, 2, 3, 4, 5];

  var s = new Date(itemFinishDate).toLocaleDateString("en-GB");

  useEffect(() => {
    setPressed(numbers[2]);
  }, []);
  const handleMusicItem = async () => {
    setIsLoading(true);
    try {
      const res = await albumArt(authorName, {
        album: itemName,
        size: "medium",
      });
      const jsonValue = JSON.stringify([
        {
          name: itemName,
          author: authorName,
          length: itemLength,
          finish: new Date(itemFinishDate).toLocaleDateString("en-GB"),
          number: pressed,
          id: new Date() + Math.random(),
          image: res,
        },
        ...musicItem,
      ]);

      storeData("musicItem", jsonValue);

      const musicItemData = await getData("musicItem");
      const parsed = JSON.parse(musicItemData);
      musicState(parsed);
      toggleModal();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View
        style={{
          height: 370,
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
                value={itemName}
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
                flexDirection: "row",
                paddingVertical: 5,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: colors.itembg,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30%",
                  height: 60,
                  borderRadius: 10,
                }}
              >
                <TextInput
                  value={itemLength}
                  onChangeText={(text) => {
                    if (text.length === 2) {
                      (text += ":"), setitemLength(text);
                    }
                    if (text.endsWith("::")) {
                      (text = text.replace(/:+/g, ":")), setitemLength(text);
                    } else {
                      setitemLength(text);
                    }
                  }}
                  keyboardType="numeric"
                  placeholder="00:00"
                  placeholderTextColor={colors.placeholder}
                  maxLength={5}
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    fontSize: 18,
                  }}
                />
              </View>
              <View style={{ left: 4 }}>
                <DatePicker
                  style={{ height: 60, width: 195 }}
                  textStyle={{
                    display: "none",
                  }}
                  wrapperStyle={{ paddingTop: 0 }}
                  item={itemFinishDate}
                  dateformat={s}
                  onPress={() => {
                    setShowPicker(!showPicker);
                    setFinish(!finish);
                  }}
                />
                {/* DATEPICKER//////////////////////////////////////////////////////// */}
                {showPicker && (
                  <RNDateTimePicker
                    display="calendar"
                    style={{ display: "none" }}
                    mode="date"
                    value={new Date()}
                    onChange={(text) => (
                      finish && text.type == "set"
                        ? (setItemFinishDate(text.nativeEvent.timestamp),
                          setFinish(!finish),
                          setIsFinished(true))
                        : null,
                      setShowPicker(!showPicker)
                    )}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                height: 80,
                width: "90%",
                flexDirection: "row",
                borderRadius: 10,

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
      {(itemName, authorName, itemFinishDate).length !== 0 &&
      itemLength.length === 5 ? (
        <ModalButton
          onPress={() => handleMusicItem()}
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

export default MusicModalItem;

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
