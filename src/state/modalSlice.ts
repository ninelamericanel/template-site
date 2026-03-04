import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

//todo

const modalSlice = createSlice({
  initialState,
  name: "modalSlice",
  reducers: {
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
