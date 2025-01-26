import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./Slices/Index";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "combinedReducers",
  storage: storage,
  whitelist: [
    "authReducer",
    "auth",
    "layout",
    //"twoFactor",
    "formWizardTwo",
    "numberingWizard",
    //"studentWizard",
    "verticalWizard",
    "pastReturn",
    // "product",
    // "chat",
    // "contact",
    // "tasks",
    // "bookmarkTab",
    // "filterData",
    //"cartData",
    // "todo",
    // "project",
    // "addProduct",
    // "themeCustomizer",
    "letterBox",
    //"bookmarkHeader",
  ],
};
const persistedReducer = persistReducer(persistConfig, combinedReducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
const persistor = persistStore(store);
export { persistor, store };
