import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getData } from "../../../AyncStorage";
import { colors } from "../../../misc";
import { ContentContext } from "../../../AppContext";

const MusicGrid = ({ item }) => {
  const [itemPressed, setItemPressed] = useState(false);
  const { musicItem, setMusicItem } = useContext(ContentContext);

  const deleteData = async () => {
    try {
      const newItems = [...musicItem].filter((data) => data != item);
      const jsonValue = JSON.stringify(newItems);
      await AsyncStorage.setItem("musicItem", jsonValue);
      const musicItemData = await getData("musicItem");
      const parsed = JSON.parse(musicItemData);
      setMusicItem(parsed);
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
        elevation: 2,
        height: !itemPressed ? 200 : 200,
        width: itemPressed ? 160 : 160,

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.itembg,
        marginTop: 8,
        marginBottom: 4,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.additionalOne,
        marginBlockEnd: 16,

        marginInline: 8,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.outline,
          width: "90%",
          height: "90%",
          paddingHorizontal: 5,

          borderRadius: 5,
          elevation: 2,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 3,
            paddingTop: 10,
            color: "#eeeeee",
            fontSize: 18,
            fontWeight: "bold",
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
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MusicGrid;

const styles = StyleSheet.create({});
