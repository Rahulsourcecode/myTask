// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlices';

function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

const Store = configureStore({
  reducer: rootReducer,
});

Store.subscribe(() => saveToLocalStorage(Store.getState()))
export default Store;
