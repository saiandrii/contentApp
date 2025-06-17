import {
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

const MusicModalItem = ({}) => {
  const { musicItem, musicState } = itemStore();

  const [pressed, setPressed] = useState();

  const [itemName, setItemName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [itemLength, setitemLength] = useState("");
  const [itemFinishDate, setItemFinishDate] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  const { toggleModal } = toggleStore();

  const numbers = [1, 2, 3, 4, 5];

  var s = new Date(itemFinishDate).toLocaleDateString("en-GB");

  useEffect(() => {
    setPressed(numbers[2]);
  }, []);

  const handleMusicItem = async () => {
    try {
      const jsonValue = JSON.stringify([
        {
          name: itemName,
          author: authorName,
          length: itemLength,
          finish: new Date(itemFinishDate).toLocaleDateString("en-GB"),
          number: pressed,
          id: new Date() + Math.random(),
        },
        ...musicItem,
      ]);
      storeData("musicItem", jsonValue);
      toggleModal();

      const musicItemData = await getData("musicItem");
      const parsed = JSON.parse(musicItemData);
      musicState(parsed);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.outline,
          height: 370,

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
                flexDirection: "row",
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
                  marginTop: 10,
                }}
              >
                <TextInput
                  value={itemLength}
                  onChangeText={(text) => {
                    if (text.length === 2) {
                      (text += ":"), setitemLength(text);
                    } else if (text.endsWith("::")) {
                      text.replace(/:+/g, ":");
                      setitemLength(text);
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
              <View style={{ marginTop: 15, paddingLeft: 10 }}>
                <ModalButton
                  fontstyle={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "white",
                  }}
                  style={{
                    width: 195,
                    height: 60,
                    elevation: 0,
                    borderRadius: 10,
                  }}
                  name={
                    itemFinishDate ? (
                      s
                    ) : (
                      <Ionicons
                        name="calendar-outline"
                        size={28}
                        color={colors.placeholder}
                      />
                    )
                  }
                  onPress={() => {
                    setShowPicker(!showPicker);
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
                      setItemFinishDate(text.nativeEvent.timestamp),
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
                top: 80,
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
          name="add item"
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
