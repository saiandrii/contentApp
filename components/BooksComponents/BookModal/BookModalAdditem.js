import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../../misc";
import BookEditModal from "./BookEditModal";
import toggleStore from "../../../store/toggleStore";

const BookModalAdditem = ({ item }) => {
  const { editModal, toggleEditModal } = toggleStore();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      backdropOpacity={0.3}
      visible={editModal ? true : false}
    >
      <Pressable
        onPressOut={() => {
          toggleEditModal(false);
        }}
        activeOpacity={0.7}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
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
