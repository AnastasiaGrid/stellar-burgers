import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { deflate } from 'zlib';

interface IInitialState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
}
const initialState: IInitialState = {
  orderRequest: false,
  orderModalData: null
};

export const orderBurgerApiThunk = createAsyncThunk(
  'order/orderBurgerApi',
  orderBurgerApi
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderRequest: (sliceState) => sliceState.orderRequest,
    selectOrderModalData: (sliceState) => sliceState.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerApiThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurgerApiThunk.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurgerApiThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export default orderSlice.reducer;

export const { selectOrderRequest, selectOrderModalData } =
  orderSlice.selectors;

export const { deleteOrderModal } = orderSlice.actions;
