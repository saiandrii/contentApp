import { create } from "zustand";

const itemStore = create((set) => ({
  filtered: "",
  image: null,
  bookItem: [],
  bookItemData: [],
  musicItem: [],

  musicState: (text) =>
    set((state) => ({
      musicItem: (state.musicItem = text),
    })),
  imageState: (text) =>
    set((state) => ({
      image: (state.image = text),
    })),
  bookItemDataArray: (text) =>
    set((state) => ({
      bookItemData: (state.bookItemData = text),
    })),
  bookItemArray: (text) =>
    set((state) => ({
      bookItem: (state.bookItem = text),
    })),
  filteredString: (text) =>
    set((state) => ({
      filtered: (state.filtered = text),
    })),
}));
export default itemStore;
