import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { ContentContext } from "./AppContext";
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(console.log(e));
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(console.log(e));
  }
};

export const sortByRating = async (array, asyncStorage, setParsed) => {
  try {
    const newItems = [...array].sort((a, b) => {
      if (a.number < b.number) {
        return 1;
      }
      if (a.number > b.number) {
        return -1;
      }
      return 0;
    });

    const jsonValue = JSON.stringify(newItems);
    await AsyncStorage.setItem(asyncStorage, jsonValue);
    const itemData = await getData(asyncStorage);
    const parsed = JSON.parse(itemData);
    setParsed(parsed);
  } catch (e) {
    console.log(e);
  }
};
export const sortByName = async (array, asyncStorage, setParsed) => {
  try {
    const newItems = [...array].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const jsonValue = JSON.stringify(newItems);
    await AsyncStorage.setItem(asyncStorage, jsonValue);
    const itemData = await getData(asyncStorage);
    const parsed = JSON.parse(itemData);
    setParsed(parsed);
  } catch (e) {
    console.log(e);
  }
};
export const sortByFinish = async (array, asyncStorage, setParsed) => {
  try {
    const newItems = [...array].sort((a, b) => {
      a = a.finish.slice(-4);

      b = b.finish.slice(-4);
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      if (a || b === "Invalid Date") {
        return -1;
      }
      return 0;
    });

    const jsonValue = JSON.stringify(newItems);
    await AsyncStorage.setItem(asyncStorage, jsonValue);
    const itemData = await getData(asyncStorage);
    const parsed = JSON.parse(itemData);
    setParsed(parsed);
  } catch (e) {
    console.log(e);
  }
};
export const sortByStart = async (array, asyncStorage, setParsed) => {
  try {
    const newItems = [...array].sort((a, b) => {
      a = a.start.slice(-4);

      b = b.start.slice(-4);
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      if (a || b === "Invalid Date") {
        return -1;
      }
      return 0;
    });

    const jsonValue = JSON.stringify(newItems);
    await AsyncStorage.setItem(asyncStorage, jsonValue);
    const itemData = await getData(asyncStorage);
    const parsed = JSON.parse(itemData);
    setParsed(parsed);
  } catch (e) {
    console.log(e);
  }
};
export const sortByPages = async (array, asyncStorage, setParsed) => {
  try {
    const newItems = [...array].sort((a, b) => {
      if (a.pages < b.pages) {
        return 1;
      }
      if (a.pages > b.pages) {
        return -1;
      }
      return 0;
    });

    const jsonValue = JSON.stringify(newItems);
    await AsyncStorage.setItem(asyncStorage, jsonValue);
    const itemData = await getData(asyncStorage);
    const parsed = JSON.parse(itemData);
    setParsed(parsed);
  } catch (e) {
    console.log(e);
  }
};
export const filterItem = async (array, setParsed, textInput) => {
  try {
    const newItems = [...array].filter((item) => item.name === textInput);

    setParsed(newItems);
  } catch (e) {
    console.log(e);
  }
};
