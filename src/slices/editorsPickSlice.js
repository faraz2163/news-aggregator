import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "../services/services";
import {
  generateTimestampId,
  normalizeGuardianData,
  normalizeNYTimesData,
  normalizeNewsData,
} from "../utils";

const { NewsAPI, GuardianAPI, NYTIMESAPI } = services;

export const fetchEditorsPick = createAsyncThunk(
  "news/fetchEditorsPick",
  async (sourcesState) => {
    try {
      // excluding google news because the data is badly formatted and approx everything is null
      // const { sources: sourcesState } = getState();
      const sources = sourcesState
        .filter((s) => s.id.indexOf("google") === -1)
        .map((s) => s.id)
        .slice(0, 5);
      const newsAPIResponse = await NewsAPI.getEditorsPick(sources.join(","));
      const newsAPIData = newsAPIResponse.data.articles;

      const guardianAPIResponse = await GuardianAPI.getEditorsPick();
      const guardianAPIData = await guardianAPIResponse.data.response.results;

      const NYTimesAPIResponse = await NYTIMESAPI.getEditorsPick();
      const NYTimesAPIData = await NYTimesAPIResponse.data.results;

      const combinedData = [
        ...normalizeNewsData(newsAPIData),
        ...normalizeGuardianData(guardianAPIData),
        ...normalizeNYTimesData(NYTimesAPIData),
      ];

      return combinedData;
    } catch (error) {
      throw new Error("Failed to fetch news data");
    }
  }
);

const editorsPickSlice = createSlice({
  name: "editorsPick",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditorsPick.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEditorsPick.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchEditorsPick.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectEditorsPick = (state) => state.editorsPick;

export default editorsPickSlice.reducer;
