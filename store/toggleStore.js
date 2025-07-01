import { create } from "zustand";

const toggleStore = create((set) => ({
  modalVisible: false,
  editModal: false,
  sorted: false,
  searchFocused: false,
  searchPressed: false,
  firstAddBooks: false,
  firstAddMusic: false,
  firstAddFilms: false,
  dialOpen: false,

  toggleDial: (text) =>
    set((state) => ({
      dialOpen: (state.dialOpen = text),
    })),
  toggleEditModal: (text) =>
    set((state) => ({
      editModal: (state.editModal = text),
    })),
  toggleSearchFocused: (text) =>
    set((state) => ({
      searchFocused: (state.searchFocused = text),
    })),
  toggleSearch: (text) =>
    set((state) => ({
      searchPressed: (state.searchPressed = text),
    })),
  toggleModal: () =>
    set((state) => ({
      modalVisible: !state.modalVisible,
    })),
  toggleSorted: (text) =>
    set((state) => ({
      sorted: (state.sorted = text),
    })),

  toggleBooks: (text) =>
    set((state) => ({
      firstAddBooks: (state.firstAddBooks = text),
    })),
  toggleMusic: (text) =>
    set((state) => ({
      firstAddMusic: (state.firstAddMusic = text),
    })),
  toggleFilms: (text) =>
    set((state) => ({
      firstAddFilms: (state.firstAddFilms = text),
    })),
}));
export default toggleStore;
