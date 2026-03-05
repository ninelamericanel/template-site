import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  modalID: "",
};

//todo

const modalSlice = createSlice({
  initialState,
  name: "modalSlice",
  reducers: {
    toggleModal: (state, action) => {
      state.modalOpen = !state.modalOpen;
      state.modalID = action.payload ? action.payload : "";
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
