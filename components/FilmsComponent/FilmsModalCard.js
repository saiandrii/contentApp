import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import toggleStore from "../../store/toggleStore";
import { SafeAreaView } from "react-native-safe-area-context";
import FilmsItem from "./FilmsItem";
const FilmsModalCard = ({ item }) => {
  const { card, cardToggle } = toggleStore();

  return (
    <Modal
      visible={card}
      animationType="slide"
      transparent={true}
      backdropOpacity={0.3}
    >
      <Pressable
        onPressOut={() => cardToggle(false)}
        activeOpacity={0.7}
        style={{
          justifyContent: "flex-end",

          // backgroundColor: "rgba(0, 0, 0, 0.8)",

          flex: 1,
        }}
      >
        <TouchableWithoutFeedback>
          <KeyboardAvoidingView>
            <SafeAreaView
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <View
                style={{
                  boxShadow: " 2px -2px 10px #7b7b7b,-2px 5px 10px #ffffff",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  width: "90%",
                  paddingBottom: 20,
                  backgroundColor: "#eeeeee",
                }}
              >
                <FilmsItem />
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default FilmsModalCard;

const styles = StyleSheet.create({});
