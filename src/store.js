import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

// import newsReducer from "./slices/newsSlice";
import sourceReducer from "./slices/sourcesSlice";
import userPreferencesReducer from "./slices/userPreferencesSlice";

const rootReducer = combineReducers({
  // news: newsReducer,
  sources: sourceReducer,
  userPreferences: userPreferencesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
