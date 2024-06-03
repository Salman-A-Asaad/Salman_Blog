import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import sessionStorage from "redux-persist/lib/storage/session"; // sessionStorage

// Persist configurations
const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
  version: 1,
};

const themePersistConfig = {
  key: "theme",
  storage: storage, // This uses localStorage
  version: 1,
};

// Persisted reducers
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

// Root reducer
const rootReducer = combineReducers({
  user: persistedUserReducer,
  theme: persistedThemeReducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
