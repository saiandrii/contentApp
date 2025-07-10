import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import MusicModalItem from "./MusicComponents/MusicModalItem";
import { colors } from "../misc";
import BooksModalItem from "./BooksComponents/BooksModalItem";
import FilmsModalItem from "./FilmsComponent/FilmsModalItem";

import toggleStore from "../store/toggleStore";
import itemStore from "../store/itemStore";
import { StatusBar } from "expo-status-bar";

const ModalComponent = () => {
  const { image, imageState } = itemStore();

  const {
    modalVisible,
    toggleModal,
    firstAddBooks,
    toggleBooks,
    firstAddMusic,
    toggleMusic,
    firstAddFilms,
    toggleFilms,
  } = toggleStore();

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      backdropOpacity={0.3}
      // navigationBarTranslucent={true}
    >
      <Pressable
        onPressOut={() => (
          toggleModal(),
          toggleBooks(false),
          toggleMusic(false),
          toggleFilms(false),
          imageState()
        )}
        activeOpacity={0.7}
        style={{
          justifyContent: "flex-end",

          backgroundColor: "rgba(0, 0, 0, 0.8)",

          flex: 1,
        }}
      >
        <TouchableWithoutFeedback>
          <KeyboardAvoidingView>
            <SafeAreaView>
              <View
                style={{
                  justifyContent: "center",

                  paddingTop: 10,
                }}
              >
                {firstAddMusic ? (
                  <MusicModalItem />
                ) : firstAddBooks ? (
                  <BooksModalItem />
                ) : firstAddFilms ? (
                  <FilmsModalItem />
                ) : null}
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
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
