import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "../services/services";
import {
  normalizeGuardianData,
  normalizeNYTimesSearchData,
  normalizeNewsData,
} from "../utils";

const { NewsAPI, GuardianAPI, NYTIMESAPI } = services;

export const fetchSearchResults = createAsyncThunk(
  "news/fetchSearchResults",
  async (_, { getState }) => {
    try {
      let newsAPIData = [];
      let guardianAPIData = [];
      let NYTimesAPIData = [];

      const {
        userPreferences: {
          user_search,
          user_search_sources,
          user_search_categories,
          user_search_countries,
          user_search_start_date,
          user_search_end_date,
        },
      } = getState();

      if (user_search_sources.length !== 0) {
        const newsAPIResponse = await NewsAPI.getSearchResults(
          user_search,
          user_search_sources,
          user_search_start_date,
          user_search_end_date
        );
        newsAPIData = normalizeNewsData(newsAPIResponse.data.articles);
      }

      // if (user_categories.length && user_countries.length) {
      const guardianAPIResponse = await GuardianAPI.getSearchResults(
        user_search,
        user_search_categories,
        user_search_countries,
        user_search_start_date,
        user_search_end_date
      );
      guardianAPIData = normalizeGuardianData(
        guardianAPIResponse.data.response.results
      );

      const NYTimesAPIResponse = await NYTIMESAPI.getSearchResults(
        user_search,
        user_search_categories,
        user_search_countries,
        user_search_start_date,
        user_search_end_date
      );
      NYTimesAPIData = normalizeNYTimesSearchData(
        NYTimesAPIResponse.data.response.docs
      );
      // }

      const combinedData = [
        ...newsAPIData,
        ...guardianAPIData,
        ...NYTimesAPIData,
      ];

      combinedData.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.pub_date) - new Date(a.pub_date);
      });

      return combinedData;
    } catch (error) {
      throw new Error("Failed to fetch news data");
    }
  }
);

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    articles: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectSearchResults = (state) => state.searchResults;

export default searchResultsSlice.reducer;
