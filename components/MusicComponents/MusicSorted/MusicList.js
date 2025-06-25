import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import albumArt from "album-art";

import { getData } from "../../../AyncStorage";
import { colors } from "../../../misc";

import { AnimatePresence, MotiImage, MotiView } from "moti";
import toggleStore from "../../../store/toggleStore";
import itemStore from "../../../store/itemStore";

const MusicList = ({ item, index }) => {
  const { toggleSorted } = toggleStore();
  const { musicItem, musicState } = itemStore();

  const [itemPressed, setItemPressed] = useState(false);

  const deleteData = async () => {
    try {
      const newItems = [...musicItem].filter((data) => data != item);
      const jsonValue = JSON.stringify(newItems);
      await AsyncStorage.setItem("musicItem", jsonValue);
      const musicItemData = await getData("musicItem");
      const parsed = JSON.parse(musicItemData);
      musicState(parsed);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MotiView
      animate={{ height: itemPressed ? 135 : 95 }}
      transition={{ type: "timing", duration: 100 }}
      style={{
        // backgroundColor: " rgba(255, 255, 255, 0.5)",
        flex: 1,

        marginTop: 8,
        marginHorizontal: 16,
        borderRadius: 8,
      }}
    >
      <TouchableOpacity
        key={item?.id}
        onPress={() => {
          setItemPressed(!itemPressed);
          toggleSorted(false);
        }}
        activeOpacity={0.9}
        style={{}}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: itemPressed ? "flex-start" : "center",
            justifyContent: "flex-start",
          }}
        >
          <MotiView
            animate={{ marginTop: itemPressed ? 15 : 0 }}
            transition={{ type: "timing", duration: 200 }}
          >
            <ImageBackground
              source={{ uri: item?.image ? item?.image : null }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 5,
                marginLeft: 9,
              }}
              imageStyle={{ borderRadius: 5 }}
            >
              {itemPressed ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: " rgba(255, 255, 255, 0.5)",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  activeOpacity={0.5}
                >
                  <Ionicons
                    name="trash"
                    size={35}
                    color="black"
                    onPress={() => {
                      deleteData();
                    }}
                  />
                </TouchableOpacity>
              ) : null}
            </ImageBackground>
          </MotiView>

          <View
            style={{
              padding: 10,
              paddingHorizontal: 20,

              borderRadius: 5,

              alignItems: "flex-start",
              shadowRadius: 2,
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                paddingBottom: item?.name.length >= 20 ? 2 : 5,
                fontSize: item?.name.length >= 20 ? 15 : 20,
                fontWeight: "bold",
                color: "black",
                maxWidth: 250,
              }}
            >
              {item?.name}
            </Text>
            <Text style={{ paddingBottom: 5, color: "black", fontSize: 15 }}>
              {item?.author}
            </Text>

            <Text style={{ fontStyle: "italic", color: "black", fontSize: 12 }}>
              {item?.length}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {itemPressed ? (
        <MotiView
          transition={{ delay: 0, damping: 25, mass: 1 }}
          from={{
            opacity: 0,
            translateX: 20,
          }}
          animate={{
            opacity: 1,
            translateX: 0,
          }}
          exit={{
            opacity: 0,
            translateX: 0,
          }}
          style={{
            flex: 1,
            flexDirection: "row",

            justifyContent: "space-between",
            paddingTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text>length: {item?.length}</Text>
          <Text style={{ fontWeight: "bold" }}>rating: {item?.number}</Text>
          <Text>finish date: {item?.finish}</Text>
        </MotiView>
      ) : null}
    </MotiView>
  );
};

export default MusicList;

const styles = StyleSheet.create({});
