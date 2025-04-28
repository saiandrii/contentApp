import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";

import MusicList from "../MusicComponents/MusicSorted/MusicList";
import { ContentContext } from "../../AppContext";
import MusicGrid from "./MusicSorted/MusicGrid";

const MusicItem = ({ item, index }) => {
  const { sorted, setSorted } = useContext(ContentContext);

  return <MusicList item={item} />;
};

export default MusicItem;

const styles = StyleSheet.create({});
