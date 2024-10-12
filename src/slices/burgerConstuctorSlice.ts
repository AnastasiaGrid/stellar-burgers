import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

interface IInitialState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
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
    addConstructorItem: (state, action: PayloadAction<TIngredient>) => {
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
