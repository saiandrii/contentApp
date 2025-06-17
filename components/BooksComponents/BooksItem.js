import { StyleSheet, Text, View } from "react-native";
import BooksList from "./BookSorted/BooksList";

const BooksItem = ({ item }) => {
  return <BooksList item={item} />;
};

export default BooksItem;

const styles = StyleSheet.create({});
