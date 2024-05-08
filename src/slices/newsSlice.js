// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { normalize, schema } from "normalizr";

// // Define news schema for normalization
// const newsSchema = new schema.Entity("news");

// // Async thunk to fetch data from APIs
// export const fetchNewsData = createAsyncThunk("news/fetchData", async () => {
//   try {
//     const response1 = await fetch("https://api.news1.com");
//     const data1 = await response1.json();

//     const response2 = await fetch("https://api.news2.com");
//     const data2 = await response2.json();

//     const response3 = await fetch("https://api.news3.com");
//     const data3 = await response3.json();

//     // Combine data from all APIs
//     const combinedData = [
//       ...data1.articles,
//       ...data2.articles,
//       ...data3.articles,
//     ];

//     // Normalize data
//     const normalizedData = normalize(combinedData, [newsSchema]);
//     return normalizedData.entities.news;
//   } catch (error) {
//     throw new Error("Failed to fetch news data");
//   }
// });

// // News slice
// const newsSlice = createSlice({
//   name: "news",
//   initialState: {
//     entities: {},
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNewsData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchNewsData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.entities = action.payload;
//       })
//       .addCase(fetchNewsData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default newsSlice.reducer;
