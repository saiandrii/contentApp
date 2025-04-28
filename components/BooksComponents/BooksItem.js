import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import BooksList from "./BookSorted/BooksList";
import { ContentContext } from "../../AppContext";

const BooksItem = ({ item, index }) => {
  return <BooksList item={item} />;
};

export default BooksItem;

const styles = StyleSheet.create({});
