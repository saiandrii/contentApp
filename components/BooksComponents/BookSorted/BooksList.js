import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useAnimatedValue,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { filterItem, getData } from "../../../AyncStorage";
import { colors } from "../../../misc";
import { ContentContext } from "../../../AppContext";

const BooksList = ({ item, index }) => {
  const [itemPressed, setItemPressed] = useState(false);
  const [dots, setDots] = useState(false);
  const [imageItem, setImageItem] = useState("");
  const { editModal, setEditModal } = useContext(ContentContext);
  const { bookItem, setBookItem } = useContext(ContentContext);
  const { bookItemData, setBookItemData } = useContext(ContentContext);
  const { sorted, setSorted } = useContext(ContentContext);
  const { filtered, setFiltered } = useContext(ContentContext);
  const { image, setImage } = useContext(ContentContext);

  const fadeAnim = useAnimatedValue(itemPressed ? 120 : 95);

  const animation = () => {
    Animated.timing(fadeAnim, {
      toValue: itemPressed ? 95 : 120,
      duration: 110,
      useNativeDriver: false,
    }).start();
  };

  const deleteData = async () => {
    try {
      const newItems = [...bookItem].filter((data) => data != item);
      const jsonValue = JSON.stringify(newItems);
      await AsyncStorage.setItem("bookItem", jsonValue);
      const bookItemData = await getData("bookItem");
      const parsed = JSON.parse(bookItemData);
      setBookItem(parsed);
      setDots(!dots);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable
      onPressOut={() => (setDots(false), setSorted(false))}
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 5,
        marginBottom: 8,
        paddingVertical: 10,
        marginHorizontal: 10,

        borderRadius: 5,
        width: "94.5%",
      }}
    >
      <TouchableOpacity
        onPress={() => (setDots(!dots), setSorted(false))}
        style={{
          position: "absolute",

          left: "93%",
          top: 5,
        }}
      >
        <View style={{}}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={28}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {dots ? (
        <View
          style={{
            position: "absolute",
            flex: 1,
            left: "55%",
            top: "2%",
            zIndex: 100,
            elevation: 5,
          }}
        >
          <View
            style={{
              backgroundColor: colors.itembg,
              width: 150,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setEditModal(true), setDots(false), setBookItemData(item);
              }}
              style={{ flexDirection: "row" }}
            >
              <Feather name="edit" size={22} color="#eeeeee" />
              <Text
                onPress={() => {
                  setEditModal(true);
                }}
                style={{
                  fontSize: 18,
                  color: "#eeeeee",
                  paddingLeft: 10,
                  paddingBottom: 20,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={deleteData}
            >
              <Feather name="trash" size={22} color="#eeeeee" />
              <Text
                style={{
                  fontSize: 18,
                  color: "#eeeeee",
                  paddingLeft: 10,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <TouchableOpacity
        key={item?.id}
        onPressOut={() => setDots(false)}
        onPress={() => {
          setItemPressed(!itemPressed), setSorted(false);
        }}
        activeOpacity={0.9}
        style={{
          height: item?.finish !== "Invalid Date" ? "100%" : 190,
          width: 120,
          backgroundColor: colors.placeholder,
          // borderBottomWidth: 0.5,
          // borderBottomStartRadius: 25,
          // borderBottomEndRadius: 25,
          elevation: 5,

          marginHorizontal: 14,
          borderRadius: 5,
          borderColor: colors.additionalOne,

          borderWidth: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {item?.image || item?.picture ? (
          <Image
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "stretch",
              borderRadius: 3,
            }}
            // source={{ uri: item?.image ? item?.image : "123" }}
            source={{ uri: item?.picture || item?.image }}
            // source={{
            //   uri:
            //     item?.image ==
            //       "https://dryofg8nmyqjw.cloudfront.net/images/no-cover.png" &&
            //     item?.picture
            //       ? item?.picture
            //       : item?.image,
            // }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              margin: 10,
              marginVertical: 15,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontWeight: "bold", textAlign: "center", fontSize: 18 }}
            >
              {item?.author}
            </Text>
            <Ionicons name="book-outline" size={30} color="black" />
            <Text
              style={{ fontWeight: "bold", textAlign: "center", fontSize: 16 }}
            >
              {item?.name}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={{ maxWidth: "55%" }}>
        <View
          style={{
            paddingTop: 0,
            paddingBottom: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: item?.name.length >= 20 ? 16 : 18,
              maxWidth: "90%",
              fontWeight: "bold",
              paddingBottom: 3,
              textAlign: "center",
              flexWrap: "wrap",
            }}
          >
            {item?.name}
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            {item?.author}
          </Text>
          <View
            style={{
              backgroundColor: colors.additionalOne,
              width: 175,
              height: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ justifyContent: "center" }}>
          <View style={styles.textView}>
            <Feather name="book-open" size={15} color="black" />
            <Text style={{ paddingLeft: 5 }}>{item?.pages}</Text>
          </View>
          <View style={styles.textView}>
            <Feather name="calendar" size={15} color="black" />
            <Text style={{ paddingLeft: 5 }}>{item?.start} </Text>
          </View>
          {item?.finish !== "Invalid Date" ? (
            <View style={styles.textView}>
              <Feather name="check" size={17} color="black" />
              <Text style={{ paddingLeft: 3 }}>{item?.finish}</Text>
            </View>
          ) : null}
          {item?.number != undefined ? (
            <View style={styles.textView}>
              <Feather name="star" size={15} color="black" />
              <Text style={{ paddingLeft: 3, fontWeight: "bold" }}>
                {item?.number}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default BooksList;

const styles = StyleSheet.create({
  textView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
  },
});
