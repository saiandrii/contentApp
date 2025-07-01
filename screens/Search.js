import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FilterComponent from "../components/FilterComponent/FilterComponent";
import FilterItem from "../components/FilterComponent/FilterItem";
import itemStore from "../store/itemStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../misc";
import { useNavigation } from "@react-navigation/native";
import toggleStore from "../store/toggleStore";
import { MotiView } from "moti";

const Search = () => {
  const navigation = useNavigation();

  const { bookItem, musicItem, filtered } = itemStore();
  const { searchFocused } = toggleStore();

  const [filteredArray, setFilteredArray] = useState([]);

  const allItemsArray = [...bookItem, ...musicItem];

  const filteredBooks = allItemsArray.filter((element) => {
    const stringElement = element?.name.toLowerCase().replaceAll(" ", "");

    const stringElementAuthor = element?.author
      .toLowerCase()
      .replaceAll(" ", "");

    const filterElement = filtered?.toLowerCase().replaceAll(" ", "");

    const newItems =
      stringElement?.includes(filterElement) ||
      stringElementAuthor?.includes(filterElement);

    return newItems;
  });

  useEffect(() => {
    if (filtered.length === 0) {
      setFilteredArray([]);
    } else {
      setFilteredArray(filteredBooks);
    }
  }, [filtered]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#eeeeee",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          top: 0,
          left: 0,

          right: 0,
          elevation: 0,
          backgroundColor: " rgba(238, 238, 238, 0.91)",
          position: "absolute",
          zIndex: 100,
          paddingTop: 40,
        }}
      >
        <MotiView
          animate={{
            width: searchFocused ? 0 : 50,
          }}
          transition={{ type: "timing", duration: 200 }}
        >
          {!searchFocused && (
            <TouchableOpacity
              style={{ paddingLeft: 20 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={colors.additionalOne}
              />
            </TouchableOpacity>
          )}
        </MotiView>

        <FilterComponent />
      </View>
      <FlatList
        contentContainerStyle={{ paddingTop: 110, paddingBottom: 25 }}
        showsVerticalScrollIndicator={false}
        data={filteredArray?.length <= 0 ? allItemsArray : filteredArray}
        renderItem={({ item }) => {
          return <FilterItem item={item} />;
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
