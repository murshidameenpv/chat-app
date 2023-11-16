import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './themeSlice'
import  storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk'

const rootReducers = combineReducers({themeKey:themeSlice})
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
export const persistor = persistStore(store)



{/*
On the other hand, Redux state is global and can be accessed from any component in your application. When you use redux-persist, it saves this global state to a storage engine (like localStorage), and when your application reloads, it rehydrates the state from the storage engine.

However, redux-persist doesn’t automatically persist the local state of your React components. If you have local state that you want to persist across page reloads, you’ll need to move that state to Redux.

As for the asynchronous nature of redux-persist, it means that there might be a slight delay between when your application loads and when the state is rehydrated from storage. During this time, your application might not have access to the persisted state. To handle this, you might want to show a loading screen or some other indication to the user that the application is loading. Once the state is rehydrated, you can remove the loading screen and render your application as normal.

I hope this helps! Let me know if you have any other questions. 😊
*/}