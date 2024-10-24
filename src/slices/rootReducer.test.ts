import { rootReducer } from '../services/store';

test('инициализация rootReducer', () => {
  expect(rootReducer(undefined, { type: 'unknown' })).toEqual({
    feed: {
      orderData: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    },
    ingredients: {
      isIngredientsLoading: false,
      ingredients: [],
      error: ''
    },
    user: {
      isAuthChecked: false,
      isAuthenticated: false,
      loginUserRequest: false,
      user: {
        email: '',
        name: ''
      }
    },
    order: {
      orderRequest: false,
      orderModalData: null
    },
    burgerConstructor: {
      constructorItems: {
        bun: null,
        ingredients: []
      }
    }
  });
});
