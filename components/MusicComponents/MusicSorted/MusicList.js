import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getData } from "../../../AyncStorage";
import { colors } from "../../../misc";
import { ContentContext } from "../../../AppContext";
import { MotiView } from "moti";

const MusicList = ({ item, index }) => {
  const [itemPressed, setItemPressed] = useState(false);
  const { musicItem, setMusicItem } = useContext(ContentContext);
  const { sorted, setSorted } = useContext(ContentContext);

  // const fadeAnim = useAnimatedValue(itemPressed ? 120 : 95);

  // const animation = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: itemPressed ? 95 : 120,
  //     duration: 110,
  //     useNativeDriver: false,
  //   }).start();
  // };

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
    <MotiView
      from={{ height: itemPressed ? 120 : 95 }}
      animate={{ height: itemPressed ? 120 : 95 }}
      transition={{ type: "timing", duration: 100 }}
      style={{
        backgroundColor: colors.itembg,
        // borderBottomWidth: 0.5,
        // borderBottomStartRadius: 25,
        // borderBottomEndRadius: 25,
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
          setSorted(false);
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
