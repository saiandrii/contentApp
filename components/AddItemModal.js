import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ContentContext } from "../AppContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalButton from "./ModalButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MusicModalItem from "./MusicComponents/MusicModalItem";
import { colors } from "../misc";
import BooksModalItem from "./BooksComponents/BooksModalItem";
import FilmsModalItem from "./FilmsComponent/FilmsModalItem";

const ModalComponent = () => {
  const { modalVisible, setModalVisible } = useContext(ContentContext);
  const { firstAddMusic, setFirstAddMusic } = useContext(ContentContext);
  const { firstAddBooks, setFirstAddBooks } = useContext(ContentContext);
  const { firstAddFilms, setFirstAddFilms } = useContext(ContentContext);
  const { firstAdd, setFirstAdd } = useContext(ContentContext);

  const windowHeight = Dimensions.get("screen").height;

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      backdropOpacity={0.3}
    >
      <Pressable
        onPressOut={() => (
          setModalVisible(false),
          setFirstAdd(true),
          setFirstAddBooks(false),
          setFirstAddFilms(false),
          setFirstAddMusic(false)
        )}
        activeOpacity={0.7}
        style={{
          justifyContent: "flex-end",

          backgroundColor: "rgba(0, 0, 0, 0.8)",

          flex: 1,
        }}
      >
        <TouchableWithoutFeedback>
          <View>
            <SafeAreaView>
              <View
                style={{
                  justifyContent: "center",

                  paddingTop: 5,
                }}
              >
                {firstAdd === true ? (
                  <View
                    style={{
                      backgroundColor: colors.outline,
                      height: 340,

                      marginHorizontal: 10,
                      borderRadius: 10,
                      elevation: 2,
                    }}
                  >
                    <ModalButton
                      name={"music"}
                      icon={
                        <FontAwesome name="music" size={24} color="#eeeeee" />
                      }
                      onPress={() => (
                        setFirstAddMusic(true), setFirstAdd(false)
                      )}
                    />
                    <ModalButton
                      name={"books"}
                      icon={
                        <FontAwesome name="book" size={24} color="#eeeeee" />
                      }
                      onPress={() => (
                        setFirstAddBooks(true), setFirstAdd(false)
                      )}
                    />
                    <ModalButton
                      name={"films"}
                      icon={
                        <FontAwesome name="film" size={24} color="#eeeeee" />
                      }
                      onPress={() => (
                        setFirstAddFilms(true), setFirstAdd(false)
                      )}
                    />
                  </View>
                ) : firstAddMusic ? (
                  <MusicModalItem />
                ) : firstAddBooks ? (
                  <BooksModalItem />
                ) : firstAddFilms ? (
                  <FilmsModalItem />
                ) : null}
              </View>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalHigh: {
    backgroundColor: colors.outline,
    height: 420,

    marginHorizontal: 10,
    borderTopStartRadius: 10,
    borderTopRightRadius: 10,
    elevation: 2,
  },
  modalLow: {
    backgroundColor: "white",

    height: 300,

    marginHorizontal: 20,
    borderRadius: 10,
  },
});
