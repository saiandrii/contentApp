import { Keyboard, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import AddItemButton from "./AddItemButton";

import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { AnimatePresence, MotiView } from "moti";
import toggleStore from "../store/toggleStore";
import itemStore from "../store/itemStore";

const ActionMenu = ({}) => {
  const [dialOpen, setDialOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const {
    searchPressed,
    editModal,
    modalVisible,
    toggleSearch,
    toggleModal,
    toggleSorted,
    toggleMusic,
    toggleBooks,
    toggleFilms,
  } = toggleStore();

  const { filtered, filteredString } = itemStore();

  return modalVisible || editModal ? null : (
    <View>
      <MotiView style={{ flexDirection: "row-reverse", alignItems: "center" }}>
        <AddItemButton
          animateIcon={{ scale: expanded ? 0.7 : 1 }}
          transitionIcon={{
            duration: 150,
            type: "timing",
          }}
          style={{
            marginLeft: 10,
          }}
          onPress={() => {
            setExpanded(!expanded), setDialOpen(!dialOpen);
          }}
          icon={<FontAwesome6 name="add" size={35} color="#EEEEEE" />}
        />
        <AnimatePresence>
          {dialOpen ? (
            <MotiView style={{ flexDirection: "row" }}>
              <AddItemButton
                onPress={() => (
                  toggleModal(), toggleFilms(true), toggleSorted(false)
                )}
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
                  toggleModal(), toggleBooks(true), toggleSorted(false)
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
                  toggleModal(), toggleMusic(true), toggleSorted(false)
                )}
                style={styles.buttonstyle}
                icon={<FontAwesome name="music" size={24} color="#eeeeee" />}
              />
            </MotiView>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
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
                  toggleSearch(), filteredString(""), Keyboard.dismiss();
                }}
                icon={
                  searchPressed ? (
                    <Ionicons
                      color={"#eeeeee"}
                      name="close-outline"
                      size={30}
                    />
                  ) : (
                    <Fontisto name="search" size={20} color={"#eeeeee"} />
                  )
                }
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
        </AnimatePresence>
      </MotiView>
    </View>
  );
};

export default ActionMenu;

const styles = StyleSheet.create({
  buttonstyle: { marginHorizontal: 10 },
});
