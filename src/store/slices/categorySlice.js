import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
};

// Срез (slice)
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Экспорт экшенов
export const { setCategory } = categorySlice.actions;

// Экспорт редьюсера
export default categorySlice.reducer;
