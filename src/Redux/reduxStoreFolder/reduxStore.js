import rootReducer from '../reducers/reducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  });

let store=configureStore({reducer:rootReducer,middleware});
export default store