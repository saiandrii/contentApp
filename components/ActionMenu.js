import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import AddItemButton from "./AddItemButton";
import { ContentContext } from "../AppContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";

import { MotiView } from "moti";

const ActionMenu = () => {
  const { modalVisible, setModalVisible } = useContext(ContentContext);
  const { buttonVisible, setButtonVisible } = useContext(ContentContext);
  const { sorted, setSorted } = useContext(ContentContext);
  const { searchPressed, setSearchPressed } = useContext(ContentContext);
  const { firstAddMusic, setFirstAddMusic } = useContext(ContentContext);
  const { firstAddBooks, setFirstAddBooks } = useContext(ContentContext);
  const { firstAddFilms, setFirstAddFilms } = useContext(ContentContext);
  const { expanded, setExpanded } = useContext(ContentContext);

  const [dialOpen, setDialOpen] = useState(false);

  return modalVisible ? null : (
    <View>
      <MotiView style={{ flexDirection: "row-reverse", alignItems: "center" }}>
        <AddItemButton
          animateIcon={{ scale: expanded ? 0.7 : 1 }}
          transitionIcon={{
            duration: 150,
            type: "timing",
          }}
          icon={<FontAwesome6 name="add" size={43} color="#EEEEEE" />}
          style={{
            marginLeft: 10,
          }}
          onPress={() => {
            setExpanded(!expanded), setDialOpen(!dialOpen);
          }}
        />
        {dialOpen ? (
          <MotiView style={{ flexDirection: "row" }}>
            <AddItemButton
              transition={{ delay: 0, damping: 10, mass: 1 }}
              from={{
                opacity: 0,
                translateX: 20,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              exit={{
                opacity: 0,
                translateX: 0,
              }}
              style={styles.buttonstyle}
              icon={<FontAwesome name="film" size={24} color="#eeeeee" />}
            />
            <AddItemButton
              transition={{ delay: 0, damping: 10, mass: 1 }}
              from={{
                opacity: 0,
                translateX: 40,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              exit={{
                opacity: 0,
                translateX: 0,
              }}
              onPress={() => (
                setModalVisible(true), setSorted(false), setFirstAddBooks(true)
              )}
              style={styles.buttonstyle}
              icon={<FontAwesome name="book" size={24} color="#eeeeee" />}
            />
            <AddItemButton
              transition={{ delay: 0, damping: 10, mass: 1 }}
              from={{
                opacity: 0,
                translateX: 60,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              exit={{
                opacity: 0,
                translateX: 0,
              }}
              onPress={() => (
                setModalVisible(true), setSorted(false), setFirstAddMusic(true)
              )}
              style={styles.buttonstyle}
              icon={<FontAwesome name="music" size={24} color="#eeeeee" />}
            />
          </MotiView>
        ) : null}
        {dialOpen ? (
          <View
            style={{
              flex: 1,

              position: "absolute",
              bottom: 80,
            }}
          >
            <AddItemButton
              onPress={() => {
                setSearchPressed(!searchPressed);
              }}
              icon={<Fontisto name="search" size={20} color={"#eeeeee"} />}
              transition={{ delay: 0, damping: 10, mass: 1 }}
              from={{
                opacity: 0,
                translateY: 60,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              exit={{
                opacity: 0,
                translateY: 0,
              }}
            />
          </View>
        ) : null}
      </MotiView>
    </View>
  );
};

export default ActionMenu;

const styles = StyleSheet.create({
  buttonstyle: { marginHorizontal: 10 },
});
