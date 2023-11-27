import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './themeSlice'
import userSlice from './userSlice';
import refreshSideBarSlice from './refreshSideBarSlice';
import  storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk'

const rootReducers = combineReducers({themeKey:themeSlice,userKey:userSlice,sideBarKey:refreshSideBarSlice})
const persistConfig = {
  key: 'root',
  version:1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
   reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
  
})
export const persister = persistStore(store)

