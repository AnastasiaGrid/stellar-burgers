import { afterAll } from '@jest/globals';
import { getIngredientsApiThunk } from './ingredientsSlice';
import reducer from './ingredientsSlice';

describe('тестирование extraReducers', () => {
  beforeEach(() => {});
  test('меняется isIngredientsLoading во время ожидания ответа pending', () => {
    const initialState = {
      isIngredientsLoading: false,
      ingredients: [],
      error: ''
    };
    const action = { type: getIngredientsApiThunk.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.isIngredientsLoading).toBe(true);
  });
  test('меняется isIngredientsLoading после успешного ответа fulfilled и записываются ингредиенты', () => {
    const initialState = {
      isIngredientsLoading: true,
      ingredients: [],
      error: ''
    };
    const action = {
      type: getIngredientsApiThunk.fulfilled.type,
      payload: [
        {
          _id: '1',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ]
    };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({
      isIngredientsLoading: false,
      ingredients: [
        {
          _id: '1',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ],
      error: ''
    });
  });
  test('меняется isIngredientsLoading и error после отклоненного ответа reject', () => {
    const initialState = {
      isIngredientsLoading: true,
      ingredients: [],
      error: ''
    };
    const action = { type: getIngredientsApiThunk.rejected.type };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({
      isIngredientsLoading: false,
      ingredients: [],
      error: 'Oшибка загрузки ингредиентов'
    });
  });
});
