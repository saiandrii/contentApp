import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ContentContext } from "../../../AppContext";
import { colors } from "../../../misc";
import BookEditModal from "./BookEditModal";

const BookModalAdditem = ({ item }) => {
  const { modalVisible, setModalVisible } = useContext(ContentContext);
  const { firstAddMusic, setFirstAddMusic } = useContext(ContentContext);
  const { firstAddBooks, setFirstAddBooks } = useContext(ContentContext);
  const { firstAddFilms, setFirstAddFilms } = useContext(ContentContext);
  const { firstAdd, setFirstAdd } = useContext(ContentContext);
  const { editModal, setEditModal } = useContext(ContentContext);

  const windowHeight = Dimensions.get("screen").height;

  return (
    <Modal animationType="fade" transparent={true} backdropOpacity={0.3}>
      <Pressable
        onPressOut={() => setEditModal(false)}
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
                <BookEditModal item={item} />
              </View>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default BookModalAdditem;

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
