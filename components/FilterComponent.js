import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../misc";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { ContentContext } from "../AppContext";
import { MotiView } from "moti";

const FilterComponent = ({ display }) => {
  const { sorted, setSorted } = useContext(ContentContext);
  const { filtered, setFiltered } = useContext(ContentContext);
  const { searchPressed, setSearchPressed } = useContext(ContentContext);

  return (
    <MotiView
      animate={{ height: searchPressed ? 50 : 0 }}
      transition={{ type: "timing", duration: 50 }}
      style={{
        display: searchPressed ? "flex" : "none",
        borderRadius: 20,
        borderTopLeftRadius: 20,

        backgroundColor: colors.placeholder,
        justifyContent: "center",
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
            activeOpacity={0.8}
          >
            {filtered.length <= 0 ? (
              <Fontisto
                style={{ paddingLeft: 20 }}
                name="search"
                size={20}
                color={colors.additionalOne}
                onPress={() => ""}
              />
            ) : (
              <Ionicons
                style={{ paddingLeft: 18 }}
                name="close-outline"
                size={30}
                color={colors.additionalOne}
                onPress={() => (setFiltered(""), Keyboard.dismiss())}
              />
            )}
          </TouchableOpacity>
          <View>
            <TextInput
              onFocus={() => {
                setSorted(false);
              }}
              value={filtered}
              onChangeText={(text) => {
                setFiltered(text);
              }}
              placeholder="search..."
              style={{
                left: 10,
                borderRadius: 10,
                fontSize: 15,
                paddingHorizontal: 5,
                width: 235,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="sort-variant"
            size={28}
            color="dark-grey"
            onPress={() => setSorted(!sorted)}
          />
        </TouchableOpacity>
      </View>
    </MotiView>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({});
