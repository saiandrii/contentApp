import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getData } from "../../../AyncStorage";
import { colors } from "../../../misc";

import { MotiView } from "moti";
import toggleStore from "../../../store/toggleStore";
import itemStore from "../../../store/itemStore";

const MusicList = ({ item, index }) => {
  const { sorted, toggleSorted } = toggleStore();
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
      from={{ height: itemPressed ? 120 : 95 }}
      animate={{ height: itemPressed ? 120 : 95 }}
      transition={{ type: "timing", duration: 100 }}
      style={{
        backgroundColor: colors.itembg,

        elevation: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: colors.additionalOne,
        borderWidth: 2,
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
            alignItems: itemPressed ? "stretch" : "center",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              padding: 10,
              paddingHorizontal: 20,
              backgroundColor: colors.outline,
              width: "75%",
              borderRadius: 5,
              elevation: 10,
              shadowColor: colors.add,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              shadowRadius: 2,
            }}
          >
            <Text
              style={{
                paddingBottom: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: "#eeeeee",
              }}
            >
              {item?.name}
            </Text>
            <Text style={{ paddingBottom: 5, color: "#eeeeee", fontSize: 15 }}>
              {item?.author}
            </Text>
            <Text
              style={{ fontStyle: "italic", color: "#eeeeee", fontSize: 12 }}
            >
              {item?.length}
            </Text>
            {itemPressed ? (
              <Text style={{ fontSize: 12, color: "#eeeeee", paddingTop: 10 }}>
                {item?.finish}
              </Text>
            ) : null}
          </View>
          <View
            style={{ paddingTop: itemPressed ? 10 : 0, alignItems: "center" }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.outline,
                height: 60,
                width: 60,
                borderRadius: 15,
                marginHorizontal: 10,
                borderWidth: 2,
                borderColor: colors.additionalOne,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 30, color: "#eeeeee" }}
              >
                {item?.number}
              </Text>
            </View>
            {itemPressed ? (
              <TouchableOpacity
                style={{ paddingTop: 10 }}
                activeOpacity={0.5}
                onPress={() => {
                  deleteData();
                }}
              >
                <Ionicons name="trash" size={28} color="#eeeeee" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

export default MusicList;

const styles = StyleSheet.create({});
