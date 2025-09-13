import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  telegramId: 0,
  balance: 0,
  stars: 0,
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
    setStars: (state, action) => {
      state.stars = action.payload;
    },
  },
});

// Экспорт экшенов
export const { setId, setBalance, setStars } = userSlice.actions;

// Экспорт редьюсера
export default userSlice.reducer;
