import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: null,
  bg: false,
  secondModal: null,
};

// Срез (slice)
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setBg: (state, action) => {
      state.bg = action.payload;
    },
    setSecondModal: (state, action) => {
      state.secondModal = action.payload;
    },
  },
});

// Экспорт экшенов
export const { setModal, setBg, setSecondModal } = modalSlice.actions;

// Экспорт редьюсера
export default modalSlice.reducer;
