import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  telegramId: 0,
  balance: 0,
};

// Срез (slice)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.telegramId = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

// Экспорт экшенов
export const { setId, setBalance } = userSlice.actions;

// Экспорт редьюсера
export default userSlice.reducer;
