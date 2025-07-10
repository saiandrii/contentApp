import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MotiView } from "moti";
import { colors } from "../../misc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

const FilterItem = ({ item }) => {
  const [itemPressed, setItemPressed] = useState();

  return (
    <MotiView
      animate={{ height: itemPressed ? 90 : 65 }}
      transition={{ type: "timing", duration: 300 }}
      style={{}}
    >
      <TouchableOpacity
        onPress={() => {
          setItemPressed(!itemPressed);
        }}
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 25,
          paddingRight: 50,
          alignItems: "center",
        }}
        activeOpacity={0.7}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "70%",
          }}
        >
          {item?.length && !item?.year ? (
            <MaterialIcons
              name="audiotrack"
              size={24}
              color={colors.additionalOne}
            />
          ) : item?.pages ? (
            <Entypo name="book" size={24} color={colors.additionalOne} />
          ) : item?.year ? (
            <Feather name="film" size={24} color={colors.additionalOne} />
          ) : null}
          <View style={{ paddingLeft: 20 }}>
            <Text
              style={{
                fontSize: item?.name.length >= 25 ? 13 : 15,
                fontWeight: "bold",
                paddingBottom: 3,
              }}
            >
              {item?.name}
            </Text>
            <Text style={{ fontSize: 14 }}>{item?.author}</Text>
          </View>
        </View>
        <View style={{}}>
          {item?.number ? (
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item?.number}
            </Text>
          ) : (
            <Entypo
              name="infinity"
              size={20}
              color="black"
              style={{ left: 3 }}
            />
          )}
        </View>
      </TouchableOpacity>
      {itemPressed && (
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
            translateY: 0,
          }}
          style={{
            paddingTop: 5,
            flexDirection: "row",
            width: "100%",
            justifyContent:
              !item?.start || item?.finish === "Invalid Date"
                ? "center"
                : "space-evenly",
          }}
        >
          {item?.start && (
            <Text style={{ fontSize: 13 }}>start date: {item?.start}</Text>
          )}

          {item?.finish === "Invalid Date" ? null : (
            <Text style={{ fontSize: 13 }}>finish date: {item?.finish}</Text>
          )}
        </MotiView>
      )}
    </MotiView>
  );
};

export default FilterItem;

const styles = StyleSheet.create({});
