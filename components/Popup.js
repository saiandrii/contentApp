import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../misc";
import {
  sortByFinish,
  sortByName,
  sortByPages,
  sortByRating,
  sortByStart,
} from "../AyncStorage";
import toggleStore from "../store/toggleStore";
import itemStore from "../store/itemStore";

const Popup = () => {
  const { toggleSorted } = toggleStore();
  const { bookItem, bookItemArray } = itemStore();

  return (
    <View>
      <View
        style={{
          position: "absolute",
          flex: 1,
          right: 11,
          justifyContent: "center",
          bottom: -326,
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
              sortByName(bookItem, bookItemArray), toggleSorted(false)
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
              sortByRating(bookItem, bookItemArray), toggleSorted(false)
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
              sortByFinish(bookItem, bookItemArray), toggleSorted(false)
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
              sortByStart(bookItem, bookItemArray), toggleSorted(false)
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
              sortByPages(bookItem, bookItemArray), toggleSorted(false)
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
