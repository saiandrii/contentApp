import { StyleSheet } from "react-native";
import MusicList from "../MusicComponents/MusicSorted/MusicList";

const MusicItem = ({ item, index }) => {
  return <MusicList item={item} />;
};

export default MusicItem;

const styles = StyleSheet.create({});
