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
    user_search: "",
    user_search_sources: [],
    user_search_categories: [],
    user_search_countries: [],
    user_search_start_date: "",
    user_search_end_date: "",
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
    updateSearchWord(state, action) {
      state.user_search = action.payload;
    },
    updateSearchSources(state, action) {
      state.user_search_sources = action.payload;
    },
    updateSearchCategories(state, action) {
      state.user_search_categories = action.payload;
    },
    updateSearchCountries(state, action) {
      state.user_search_countries = action.payload;
    },
    updateSearchStartDate(state, action) {
      state.user_search_start_date = action.payload;
    },
    updateSearchEndDate(state, action) {
      state.user_search_end_date = action.payload;
    },
  },
});

export const selectUserPreferences = (state) => state.userPreferences;
export const {
  updateSources,
  updateCategories,
  updateCountries,
  updateSearchWord,
  updateSearchSources,
  updateSearchCategories,
  updateSearchCountries,
  updateSearchStartDate,
  updateSearchEndDate,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
