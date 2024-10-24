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
  error: string;
}

const initialState: IInitialState = {
  isIngredientsLoading: false,
  ingredients: [],
  error: ''
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
      .addCase(
        getIngredientsApiThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.isIngredientsLoading = false;
          state.error = 'Oшибка загрузки ингредиентов';
        }
      )
      .addCase(getIngredientsApiThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      });
  }
});
export default ingredientsSlice.reducer;
export const { selectIsIngredientsLoading, selectIngredients } =
  ingredientsSlice.selectors;
