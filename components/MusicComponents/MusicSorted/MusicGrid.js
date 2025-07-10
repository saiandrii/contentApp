import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getData } from "../../../AyncStorage";
import { colors } from "../../../misc";

import itemStore from "../../../store/itemStore";

const MusicGrid = ({ item }) => {
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
    <TouchableOpacity
      key={item?.id}
      onPress={() => {
        setItemPressed(!itemPressed);
      }}
      activeOpacity={0.9}
      style={{
        height: 200,
        width: 160,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",

        marginTop: 8,
        marginBottom: 4,
        borderRadius: 5,
        marginHorizontal: 5,
        borderColor: colors.additionalOne,
      }}
    >
      <ImageBackground
        source={{ uri: item?.image ? item?.image : null }}
        style={{
          justifyContent: "center",

          alignItems: "center",
          flex: 1,
          height: "100%",
          width: "100%",
        }}
        blurRadius={0}
        resizeMode="cover"
        imageStyle={{
          borderRadius: 4,
        }}
      >
        <ImageBackground
          source={{ uri: item?.image ? item?.image : null }}
          resizeMode="cover"
          style={{
            height: 180,
            width: 140,
            justifyContent: "center",
            alignItems: "center",
          }}
          blurRadius={5}
          imageStyle={{
            borderRadius: 5,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              paddingHorizontal: 5,
              backgroundColor: " rgba(0, 0, 0, 0)",
              borderRadius: 5,
              opacity: 1,
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                paddingBottom: 3,
                paddingTop: 10,
                color: colors.additionalOne,
                fontSize: item?.name.length > 9 ? 15 : 20,
                fontWeight: "900",
              }}
            >
              {item?.name}
            </Text>
            <Text
              style={{
                color: "#eeeeee",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {item?.author}
            </Text>

            {!itemPressed ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 15,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 40,
                      color: "#eeeeee",
                      bottom: 5,
                    }}
                  >
                    {item?.number}
                  </Text>
                </View>

                <Text
                  style={{
                    color: "#eeeeee",
                    fontSize: 10,
                    paddingTop: 10,
                  }}
                >
                  {item?.finish}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={{ paddingTop: 20 }}
                activeOpacity={0.5}
                onPress={() => {
                  deleteData();
                }}
              >
                <Ionicons name="trash" size={30} color="#eeeeee" />
                <Text style={{ paddingTop: 10, color: "#eeeeee" }}>
                  {item?.length}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MusicGrid;

const styles = StyleSheet.create({});
