import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { useContext, useState } from "react";
import { colors } from "../misc";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome6 } from "@expo/vector-icons";
import { ContentContext } from "../AppContext";

export default function ActionMenu() {
  const { modalVisible, setModalVisible } = useContext(ContentContext);
  const { firstAddMusic, setFirstAddMusic } = useContext(ContentContext);
  const { firstAddBooks, setFirstAddBooks } = useContext(ContentContext);
  const { firstAddFilms, setFirstAddFilms } = useContext(ContentContext);
  const { sorted, setSorted } = useContext(ContentContext);

  const { expanded, setExpanded } = useContext(ContentContext);
  console.log(modalVisible);
  const actions = [
    {
      type: "Music",
      color: colors.additionalOne,
      emoji: <FontAwesome name="music" size={24} color="#eeeeee" />,
      onPress: () => (
        setModalVisible(true),
        setSorted(false),
        setExpanded(!expanded),
        setFirstAddMusic(true)
      ),
    },
    {
      type: "Book",
      color: colors.additionalOne,
      emoji: <FontAwesome name="book" size={24} color="#eeeeee" />,
      onPress: () => (
        setModalVisible(true),
        setSorted(false),
        setExpanded(!expanded),
        setFirstAddBooks(true)
      ),
    },

    {
      type: "Film",
      color: colors.additionalOne,
      emoji: <FontAwesome name="film" size={24} color="#eeeeee" />,
      onPress: () => console.log("film"),
    },
  ];

  {
    return modalVisible ? null : (
      <View style={{ justifyContent: "center" }}>
        <Pressable
          onPress={() => setExpanded(!expanded)}
          style={[
            styles.button,
            {
              backgroundColor: colors.additionalOne,
            },
          ]}
        >
          <MotiView
            style={{}}
            animate={{ scale: expanded ? 0.7 : 1 }}
            transition={{
              duration: 150,
              type: "timing",
            }}
          >
            <FontAwesome6 name="add" size={43} color="#EEEEEE" />
          </MotiView>
        </Pressable>
        <AnimatePresence>
          {expanded && (
            <View style={{ bottom: 0, right: 0 }}>
              {actions.map((item, i) => (
                <ActionButton key={i.toString()} item={item} index={i} />
              ))}
            </View>
          )}
        </AnimatePresence>
      </View>
    );
  }
}

const ActionButton = ({ item, index }) => {
  return (
    <MotiView
      style={{
        flex: 1,

        position: "absolute",
        flexDirection: "row",
        bottom: 0,
        right: 0,
      }}
      transition={{ delay: index * 100, damping: 10, mass: 1 }}
      from={{
        opacity: 0,
        translateX: 0,
      }}
      animate={{
        opacity: 1,
        translateX: -65 * (index + 1),
      }}
      exit={{
        opacity: 0,
        translateX: 0,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={
          () => item?.onPress()
          //   item.type === "Music"
          //     ? console.log("msuica")
          //     : item.type === "Book"
          //     ? console.log("boiikia")
          //     : item.type === "Film"
          //     ? console.log("filmia")
          //     : null
        }
        style={[
          styles.button,
          {
            backgroundColor: item.color,
            shadowColor: item.color,
            borderColor: item.border,
          },
        ]}
      >
        {item?.emoji}
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.additionalOne,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
