import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { MotiView } from "moti";
import { colors } from "../../misc";

const FilmsList = ({ item }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ paddingHorizontal: 20, paddingVertical: 10, flex: 1 }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {item?.image ? (
          <ImageBackground
            imageStyle={{ borderRadius: 5 }}
            style={{
              width: 120,
              height: 200,

              borderRadius: 5,
            }}
            source={{ uri: item?.image }}
          />
        ) : (
          <View style={{ width: 120, height: 200, backgroundColor: "red" }}>
            <Text>{item?.name}</Text>
            <Text>{item?.author}</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            paddingLeft: 10,
            flex: 1,
          }}
          onPress={() => setPressed(!pressed)}
        >
          {pressed ? (
            <MotiView animate={{}} style={{}}>
              <Text style={{ fontStyle: "italic" }}>
                {item?.description ? item?.description : "no description found"}
              </Text>
            </MotiView>
          ) : (
            <View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "500", paddingBottom: 3 }}
                >
                  {item?.name}
                </Text>
                <Text style={{ paddingBottom: 2 }}>{item?.author}</Text>
                <Text>{item?.year}</Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={{ paddingVertical: 3 }}>
                  length: {item?.length}
                </Text>
                <Text style={{ paddingVertical: 3 }}>
                  finish date: {item?.finish}
                </Text>
                <Text style={{ fontWeight: "bold", paddingVertical: 3 }}>
                  rating: {item?.number}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FilmsList;

const styles = StyleSheet.create({});
