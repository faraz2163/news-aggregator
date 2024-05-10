import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

// import newsReducer from "./slices/newsSlice";
import sourceReducer from "./slices/sourcesSlice";
import userPreferencesReducer from "./slices/userPreferencesSlice";
import editorsPickReducer from "./slices/editorsPickSlice";
import newsFeedReducer from "./slices/newsFeedSlice";
import searchResultsReducer from "./slices/searchResultsSlice";

const rootReducer = combineReducers({
  editorsPick: editorsPickReducer,
  sources: sourceReducer,
  userPreferences: userPreferencesReducer,
  newsFeed: newsFeedReducer,
  searchResults: searchResultsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
