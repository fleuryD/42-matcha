/* eslint-disable import/no-extraneous-dependencies */
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import authSlice from "./authSlice"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

const reducer = combineReducers({
	auth: authSlice,
})

const store = configureStore({ reducer })

// Infer the `RootState` and `AppDispatch` types from the store itself

export default store

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
