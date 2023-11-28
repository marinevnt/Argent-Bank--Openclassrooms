import { configureStore } from '@reduxjs/toolkit'
//import { reducer } from './rootReducer';
//import {useDispatch as useReduxDispatch} from 'react-redux'
import userReducer from "./Slices/userSlice"
import accountReducer from "./Slices/accountSlice"
import transactionReducer from "./Slices/transactionSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        account: accountReducer,
        transaction: transactionReducer
    }
});

export default store;