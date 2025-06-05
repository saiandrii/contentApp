import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";
const ContentContext = createContext();
const AppProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filled, setFilled] = useState(false);
  const [firstAdd, setFirstAdd] = useState(true);
  const [firstAddMusic, setFirstAddMusic] = useState(false);
  const [firstAddBooks, setFirstAddBooks] = useState(false);
  const [firstAddFilms, setFirstAddFilms] = useState(false);
  const [buttonVisible, setButtonVisible] = useState("flex");
  const [musicItem, setMusicItem] = useState([]);
  const [bookItem, setBookItem] = useState([]);
  const [bookItemData, setBookItemData] = useState([]);
  const [handleSend, setHandleSend] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [activeState, setActiveState] = useState();
  const [filtered, setFiltered] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState();
  const [searchPressed, setSearchPressed] = useState(false);

  return (
    <ContentContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        buttonVisible,
        setButtonVisible,
        firstAdd,
        setFirstAdd,
        musicItem,
        setMusicItem,
        sorted,
        setSorted,
        bookItem,
        setBookItem,
        firstAddMusic,
        setFirstAddMusic,
        firstAddBooks,
        setFirstAddBooks,
        firstAddFilms,
        setFirstAddFilms,
        activeState,
        setActiveState,
        filtered,
        setFiltered,
        editModal,
        setEditModal,
        bookItemData,
        setBookItemData,
        expanded,
        setExpanded,
        image,
        setImage,
        searchPressed,
        setSearchPressed,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContext, AppProvider };

const styles = StyleSheet.create({});
