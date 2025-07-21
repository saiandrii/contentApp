import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModalButton from "../ModalButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getData, storeData } from "../../AyncStorage";
import { colors, screenWidth } from "../../misc";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import itemStore from "../../store/itemStore";
import toggleStore from "../../store/toggleStore";
import movieInfo from "movie-info";
import movieArt from "movie-art";
import DatePicker from "../DatePicker";

const FilmsModalItem = ({}) => {
  const { filmItem, filmState } = itemStore();
  const { toggleModal } = toggleStore();

  const [pressed, setPressed] = useState();

  const [showPicker, setShowPicker] = useState(false);
  const [itemName, setItemName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [itemLength, setitemLength] = useState("");
  const [itemFinishDate, setItemFinishDate] = useState("");
  const [itemYear, setItemYear] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [finish, setFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const numbers = [1, 2, 3, 4, 5];

  var s = new Date(itemFinishDate).toLocaleDateString("en-GB");

  useEffect(() => {
    setPressed(numbers[2]);
  }, []);

  const handleFilmItem = async () => {
    try {
      setIsLoading(true);

      await movieInfo(itemName, itemYear).then(function (response) {
        if (Object.keys(response).length != 0) {
          const handleItem = async () => {
            const resImage = await movieArt(itemName, itemYear);

            const jsonValue = JSON.stringify([
              {
                name: itemName,
                author: authorName,
                length: itemLength,
                finish: new Date(itemFinishDate).toLocaleDateString("en-GB"),
                number: pressed,
                id: new Date() + Math.random(),
                year: itemYear,
                image: resImage,
                description: response?.overview,
                type: "film",
              },
              ...filmItem,
            ]);
            storeData("filmItem", jsonValue);
            toggleModal(false);

            const filmItemData = await getData("filmItem");
            const parsed = JSON.parse(filmItemData);
            filmState(parsed);
            setIsLoading(false);
          };
          handleItem();
        } else {
          Alert.alert(
            "There is a problem!",
            "Check if the name of movie is correct, or check your internet conneciton."
          );
          setIsLoading(false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.outline,
          height: 370,

          marginHorizontal: 10,
          borderRadius: 10,
          elevation: 2,
        }}
      >
        <View style={{ paddingTop: 20 }}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.itembg,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",

                width: "90%",
                height: 80,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 20,
                  fontSize: 12,
                  paddingTop: 5,
                  color: "white",
                }}
              >
                name
              </Text>
              <TextInput
                value={itemName}
                onChangeText={(text) => setItemName(text)}
                placeholder="film name..."
                placeholderTextColor={colors.placeholder}
                maxLength={60}
                numberOfLines={1}
                style={{
                  paddingHorizontal: 20,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                  width: "100%",
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: colors.itembg,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: 10,
                width: "90%",
                height: 80,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 20,
                  fontSize: 12,
                  paddingTop: 5,
                  color: "white",
                }}
              >
                author
              </Text>
              <TextInput
                value={authorName}
                onChangeText={(text) => setAuthorName(text)}
                placeholder="author..."
                placeholderTextColor={colors.placeholder}
                maxLength={60}
                numberOfLines={2}
                multiline
                style={{
                  fontWeight: "bold",
                  color: "white",
                  paddingHorizontal: 20,
                  fontSize: 18,
                  width: "100%",
                }}
              />
            </View>
            <View
              style={{
                width: "96%",

                flexDirection: "row",

                paddingTop: 10,
                paddingBottom: 10,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  backgroundColor: colors.itembg,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30%",
                  height: 60,
                  borderRadius: 10,
                }}
              >
                <TextInput
                  value={itemLength}
                  onChangeText={(text) => {
                    if (text.length === 2) {
                      (text += ":"), setitemLength(text);
                    }
                    if (text.endsWith("::")) {
                      (text = text.replace(/:+/g, ":")), setitemLength(text);
                    } else {
                      setitemLength(text);
                    }
                  }}
                  keyboardType="numeric"
                  placeholder="00:00"
                  placeholderTextColor={colors.placeholder}
                  maxLength={5}
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    fontSize: 18,
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: colors.itembg,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "28%",
                  height: 60,
                  borderRadius: 10,
                }}
              >
                <TextInput
                  value={itemYear}
                  onChangeText={(text) => {
                    setItemYear(text);
                  }}
                  keyboardType="numeric"
                  placeholder="year"
                  placeholderTextColor={colors.placeholder}
                  maxLength={5}
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    fontSize: 18,
                  }}
                />
              </View>
              <View>
                <DatePicker
                  style={styles.dateStyle}
                  textStyle={{
                    display: "none",
                  }}
                  fontStyle={{ fonstSize: 10 }}
                  wrapperStyle={{ paddingTop: 0 }}
                  item={itemFinishDate}
                  dateformat={s}
                  onPress={() => {
                    setShowPicker(!showPicker);
                    setFinish(!finish);
                  }}
                />
                {/* DATEPICKER//////////////////////////////////////////////////////// */}
                {showPicker && (
                  <RNDateTimePicker
                    display="calendar"
                    style={{ display: "none" }}
                    mode="date"
                    value={new Date()}
                    onChange={(text) => (
                      finish && text.type == "set"
                        ? (setItemFinishDate(text.nativeEvent.timestamp),
                          setFinish(!finish),
                          setIsFinished(true))
                        : null,
                      setShowPicker(!showPicker)
                    )}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                height: 80,
                width: "90%",
                flexDirection: "row",
                borderRadius: 10,

                backgroundColor: colors.itembg,

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {numbers.map((item) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={Math.random()}
                  onPress={() => {
                    setPressed(item);
                  }}
                >
                  <View style={pressed === item ? styles.viewSelected : null}>
                    <Text
                      style={
                        pressed === item
                          ? styles.numberSelected
                          : styles.numberStyle
                      }
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
      {(itemName, authorName, itemFinishDate).length !== 0 &&
      itemLength.length === 5 ? (
        <ModalButton
          onPress={() => handleFilmItem()}
          name={
            isLoading ? (
              <ActivityIndicator size={"large"} color={colors.additionalOne} />
            ) : (
              "add item"
            )
          }
          fontstyle={{ fontSize: 20 }}
          style={{
            marginBottom: 10,
            backgroundColor: colors.outline,
            width: "95%",
            marginTop: -15,
            height: 60,
          }}
        />
      ) : null}
    </View>
  );
};

export default FilmsModalItem;

const styles = StyleSheet.create({
  numberStyle: {
    fontSize: 20,
    color: "#eeeeee",
  },
  numberSelected: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#eeeeee",
  },
  viewSelected: {
    height: 60,
    width: 60,
    borderRadius: 15,
    elevation: 2,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.outline,
  },
  dateStyle: {
    height: 60,
    width: screenWidth == 448 ? 120 : 100,
    margin: 0,
  },
});
