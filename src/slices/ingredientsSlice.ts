import {
  getFeedsApi,
  getIngredientsApi,
  refreshToken
} from '../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';

interface IInitialState {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
}

const initialState: IInitialState = {
  isIngredientsLoading: false,
  ingredients: []
};

export const getIngredientsApiThunk = createAsyncThunk(
  'ingredients/getIngredientsApi',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIsIngredientsLoading: (sliceState) => sliceState.isIngredientsLoading,
    selectIngredients: (sliceState) => sliceState.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsApiThunk.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredientsApiThunk.rejected, (state) => {
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredientsApiThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      });
  }
});
export default ingredientsSlice.reducer;
export const { selectIsIngredientsLoading, selectIngredients } =
  ingredientsSlice.selectors;
