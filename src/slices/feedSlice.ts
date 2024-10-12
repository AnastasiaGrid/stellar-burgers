import { getFeedsApi, getIngredientsApi, refreshToken } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

interface IInitialState {
  orderData: TOrdersData;
}

const initialState: IInitialState = {
  orderData: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const getFeedsApiThunk = createAsyncThunk(
  'feed/getFeedsApi',
  getFeedsApi
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState) => sliceState.orderData.orders,
    selectFeed: (sliceState) => sliceState.orderData
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedsApiThunk.pending, (state) => {});
    builder.addCase(getFeedsApiThunk.rejected, (state) => {});
    builder.addCase(getFeedsApiThunk.fulfilled, (state, action) => {
      state.orderData = action.payload;
    });
  }
});
export default feedSlice.reducer;
export const { selectOrders, selectFeed } = feedSlice.selectors;
