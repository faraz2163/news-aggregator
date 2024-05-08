import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import services from "../services/services";
import { fetchEditorsPick } from "./editorsPickSlice";

const { NewsAPI } = services;

// Async thunk to fetch data from APIs
export const fetchSources = createAsyncThunk(
  "news/sources",
  async (_, { dispatch }) => {
    try {
      const response = await NewsAPI.getSources();
      const data = response.data;
      if (data.status === "ok") {
        const sources = data.sources.map((s) => {
          return { id: s.id, name: s.name };
        });
        dispatch(fetchEditorsPick(sources));
        return sources;
      }
      return null;
    } catch (error) {
      throw new Error("Failed to fetch news data");
    }
  }
);

const sourceSlice = createSlice({
  name: "sources",
  initialState: {
    sources: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.loading = false;
        state.sources = action.payload;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectSources = (state) => state.sources;

export default sourceSlice.reducer;
