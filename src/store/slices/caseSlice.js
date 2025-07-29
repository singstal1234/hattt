import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cases: [],
  prizes: [],
};

// Срез (slice)
const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    setCases: (state, action) => {
      state.cases = action.payload.slice();
    },
    setPrizes: (state, action) => {
      state.prizes = action.payload.slice();
    },
  },
});

// Экспорт экшенов
export const { setCases, setPrizes } = caseSlice.actions;

// Экспорт редьюсера
export default caseSlice.reducer;
