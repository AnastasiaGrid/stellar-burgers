import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import feedSliceReducer from '../slices/feedSlice';
import ingredientsSliceReducer from '../slices/ingredientsSlice';
import userReducer from '../slices/userSlice';
import burgerConstructorReducer from '../slices/burgerConstuctorSlice';
import orderReducer from '../slices/orderSlice';
// const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: {
    feed: feedSliceReducer,
    ingredients: ingredientsSliceReducer,
    user: userReducer,
    order: orderReducer,
    burgerConstructor: burgerConstructorReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
