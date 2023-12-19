import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import UserSlice from './Slice/StateManagement/UserSlice'
import LoginSlice from "./Slice/ApiSlice/LoginUserApi";
import SearchFlightAirportSlice from "./Slice/ApiSlice/SearchFlightAirport";
import SearchFlightAirport from "./Slice/StateManagement/SearchFlightAirport";
import SearchFlightSlice from './Slice/ApiSlice/SearchFlightApi';
import searchFlightListSlice from './Slice/StateManagement/SearchFlightListData';
import CartHandler from "./Slice/StateManagement/CartHandler";
const reducers = combineReducers({
  users:UserSlice,
  signIn: LoginSlice,
  searchFlightAirportApi:SearchFlightAirportSlice,
  searchFlight:SearchFlightAirport,
  searchFlightApi:SearchFlightSlice,
  searchflightlist:searchFlightListSlice,
  carthandler:CartHandler
});

const userPersistConfig = {
  key: "flightBook",
  storage,
  whitelist: ["users"], // Specify the reducers you want to persist
};

const persistedUserReducer = persistReducer(userPersistConfig, reducers);

const store = configureStore({
  reducer: persistedUserReducer,
  middleware: [thunk],
});

export default store;
