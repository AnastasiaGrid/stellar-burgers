import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IInitialState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IInitialState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    selectConstructorItem: (sliceState) => sliceState.constructorItems
  },
  reducers: {
    addConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      switch (action.payload.type) {
        case 'bun': {
          state.constructorItems.bun = action.payload;
          break;
        }
        case 'main':
        case 'sauce':
          state.constructorItems.ingredients.push(action.payload);
          break;
      }
    },
    deleteIngredients: (state, action: PayloadAction<TIngredient>) => {
      const newConstuctorIngredients =
        state.constructorItems.ingredients.filter(
          (item) => item._id !== action.payload._id
        );
      state.constructorItems.ingredients = newConstuctorIngredients;
    },
    deleteConstructorItems: (state) => {
      state.constructorItems = initialState.constructorItems;
    }
  }
});

export default burgerConstructorSlice.reducer;
export const { selectConstructorItem } = burgerConstructorSlice.selectors;
export const { addConstructorItem, deleteIngredients, deleteConstructorItems } =
  burgerConstructorSlice.actions;
