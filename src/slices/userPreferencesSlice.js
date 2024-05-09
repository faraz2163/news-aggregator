import { createSlice } from "@reduxjs/toolkit";
import { getItemLocal, setItemLocal } from "../utils";
import {
  CategoryFieldName,
  CountryFieldName,
  SourceFieldName,
} from "../constants";

const sources = getItemLocal(SourceFieldName);
const categories = getItemLocal(CategoryFieldName);
const countries = getItemLocal(CountryFieldName);

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState: {
    user_sources: sources ? sources : [],
    user_categories: categories ? categories : [],
    user_countries: countries ? countries : [],
  },
  reducers: {
    updateSources(state, action) {
      setItemLocal(SourceFieldName, action.payload);
      state.user_sources = action.payload;
    },
    updateCategories(state, action) {
      setItemLocal(CategoryFieldName, action.payload);
      state.user_categories = action.payload;
    },
    updateCountries(state, action) {
      setItemLocal(CountryFieldName, action.payload);
      state.user_countries = action.payload;
    },
  },
});

export const selectUserPreferences = (state) => state.userPreferences;
export const { updateSources, updateCategories, updateCountries } =
  userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
