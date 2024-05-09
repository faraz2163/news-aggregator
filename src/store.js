import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

// import newsReducer from "./slices/newsSlice";
import sourceReducer from "./slices/sourcesSlice";
import userPreferencesReducer from "./slices/userPreferencesSlice";
import editorsPickReducer from "./slices/editorsPickSlice";
import newsFeedReducer from "./slices/newsFeedSlice";

const rootReducer = combineReducers({
  editorsPick: editorsPickReducer,
  sources: sourceReducer,
  userPreferences: userPreferencesReducer,
  newsFeed: newsFeedReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
