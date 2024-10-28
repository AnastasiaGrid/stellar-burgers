import burgerConstructorReducer, {
  addConstructorItem,
  changeIndexDown,
  changeIndexUp,
  deleteConstructorItems,
  deleteIngredients
} from './burgerConstuctorSlice';
import {
  bunIngredient,
  mainIngredientCutlet,
  mainIngredientFillet,
  sauceIngredient
} from './constantsTest';

describe('[addConstructorItem] тестирование экшена добавления в конструктор', () => {
  const InitialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };
  test('добавляется булка в конструктор', () => {
    const newState = burgerConstructorReducer(
      InitialState,
      addConstructorItem(bunIngredient)
    );
    const { bun } = newState.constructorItems;
    expect(bun).toEqual(bunIngredient);
  });
  test('добавляется ингредиент в конструктор', () => {
    const newState = burgerConstructorReducer(
      InitialState,
      addConstructorItem(mainIngredientCutlet)
    );
    const { ingredients } = newState.constructorItems;
    expect(ingredients).toEqual([mainIngredientCutlet]);
  });
});
describe('[deleteIngredients & deleteConstructorItems]тестирование экшенов удаления из конструктора', () => {
  const InitialState = {
    constructorItems: {
      bun: bunIngredient,
      ingredients: [mainIngredientCutlet]
    }
  };
  test('[deleteIngredients] удаляется начинки из конструктора', () => {
    const newState = burgerConstructorReducer(
      InitialState,
      deleteIngredients(mainIngredientCutlet)
    );
    const { ingredients } = newState.constructorItems;
    expect(ingredients).toEqual([]);
  });
  test('[deleteConstructorItems] очищается конструктор', () => {
    const newState = burgerConstructorReducer(
      InitialState,
      deleteConstructorItems()
    );
    expect(newState).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      }
    });
  });
});
describe('[changeIndexUp & changeIndexDown] тестирование экшена изменения порядка ингредиента в конструкторе', () => {
  const InitialState = {
    constructorItems: {
      bun: bunIngredient,
      ingredients: [mainIngredientCutlet, mainIngredientFillet, sauceIngredient]
    }
  };
  test('[changeIndexUp] ингредиент в конструкторе должен переместиться выше на 1 строку', () => {
    const newState = burgerConstructorReducer(InitialState, changeIndexUp(1));
    expect(newState.constructorItems.ingredients).toEqual([
      mainIngredientFillet,
      mainIngredientCutlet,
      sauceIngredient
    ]);
  });
  test('[changeIndexDown] ингредиент в конструкторе должен переместиться ниже на 1 строку', () => {
    const newState = burgerConstructorReducer(InitialState, changeIndexDown(1));
    expect(newState.constructorItems.ingredients).toEqual([
      mainIngredientCutlet,
      sauceIngredient,
      mainIngredientFillet
    ]);
  });
});
