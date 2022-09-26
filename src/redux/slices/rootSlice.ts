import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    name: "Iron Man",
    description: "Playboy, Genius, Philanthropist, Hero",
    comics_appeared_in: 450,
    super_power: "body armor, advanced technology, ",
  },
  reducers: {
    chooseName: (state, action) => {
      state.name = action.payload;
    },
    chooseDescription: (state, action) => {
      state.description = action.payload;
    },
    chooseComicsAppearedIn: (state, action) => {
      state.comics_appeared_in = action.payload;
    },
    chooseSuperPower: (state, action) => {
      state.super_power = action.payload;
    },
  },
});

// Export Reducer
export const reducer = rootSlice.reducer;
export const {
  chooseName,
  chooseDescription,
  chooseComicsAppearedIn,
  chooseSuperPower,
} = rootSlice.actions;
