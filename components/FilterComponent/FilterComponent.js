import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../misc";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

import { MotiView } from "moti";
import toggleStore from "../../store/toggleStore";
import itemStore from "../../store/itemStore";
import { useState } from "react";

const FilterComponent = ({ display }) => {
  const { toggleSorted, searchFocused, toggleSearchFocused } = toggleStore();
  const { filtered, filteredString } = itemStore();

  return (
    <MotiView
      animate={{ width: searchFocused ? "92%" : "70%" }}
      transition={{ type: "timing", duration: 200 }}
      style={{
        borderRadius: 20,
        borderTopLeftRadius: 20,
        height: 50,
        backgroundColor: colors.placeholder,
        justifyContent: "center",

        marginHorizontal: 15,

        marginTop: 10,
        marginBottom: 5,
        zIndex: 100,
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
        <TextInput
          onBlur={() => {
            toggleSearchFocused(false);
            Keyboard.dismiss();
          }}
          onFocus={() => {
            toggleSorted(false);
            toggleSearchFocused(true);
          }}
          value={filtered}
          onChangeText={(text) => {
            filteredString(text);
          }}
          placeholder="search..."
          style={{
            left: 10,
            borderRadius: 10,
            fontSize: 15,
            paddingHorizontal: 5,
            width: "85%",
          }}
        />

        {filtered.length <= 0 ? null : (
          <Ionicons
            style={{ padding: 0 }}
            name="close-outline"
            size={30}
            color={colors.additionalOne}
            onPress={() => (filteredString(""), Keyboard.dismiss())}
          />
        )}
      </View>
      {/* <TouchableOpacity
          style={{
            padding: 10,
          }}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="sort-variant"
            size={28}
            color="dark-grey"
            onPress={() => toggleSorted(true)}
          />
        </TouchableOpacity> */}
    </MotiView>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({});
