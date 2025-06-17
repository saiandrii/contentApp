import { create } from "zustand";

const toggleStore = create((set) => ({
  modalVisible: false,
  editModal: false,
  sorted: false,
  firstAddBooks: false,
  firstAddMusic: false,
  firstAddFilms: false,
  searchPressed: false,

  toggleEditModal: (text) =>
    set((state) => ({
      editModal: (state.editModal = text),
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
