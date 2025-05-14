import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "../misc";
import { ContentContext } from "../AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getData,
  sortByFinish,
  sortByName,
  sortByPages,
  sortByRating,
  sortByStart,
} from "../AyncStorage";

const Popup = () => {
  const { sorted, setSorted } = useContext(ContentContext);
  const { bookItem, setBookItem } = useContext(ContentContext);
  const { musicItem, setMusicItem } = useContext(ContentContext);

  return (
    <View>
      <View
        style={{
          position: "absolute",
          flex: 1,
          right: 10,
          justifyContent: "center",
          bottom: -230,
          zIndex: 500,
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
            onPress={() => (
              sortByName(bookItem, setBookItem), setSorted(false)
            )}
            style={{ flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#eeeeee",
                paddingLeft: 10,
                paddingBottom: 20,
              }}
            >
              By Name
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => (
              sortByRating(bookItem, setBookItem), setSorted(false)
            )}
            style={{ flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#eeeeee",
                paddingLeft: 10,
                paddingBottom: 20,
              }}
            >
              By Rating
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => (
              sortByFinish(bookItem, setBookItem), setSorted(false)
            )}
            style={{ flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#eeeeee",
                paddingLeft: 10,
                paddingBottom: 20,
              }}
            >
              By Finish Year
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (
              sortByStart(bookItem, setBookItem), setSorted(false)
            )}
            style={{ flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#eeeeee",
                paddingLeft: 10,
                paddingBottom: 20,
              }}
            >
              By Start Year
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (
              sortByPages(bookItem, setBookItem), setSorted(false)
            )}
            style={{ flexDirection: "row" }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#eeeeee",
                paddingLeft: 10,
              }}
            >
              By Length
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Popup;

const styles = StyleSheet.create({});
