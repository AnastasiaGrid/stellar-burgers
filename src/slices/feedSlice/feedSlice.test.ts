import reducer from './feedSlice';
import { getFeedsApiThunk } from './feedSlice';

describe('тестирование extraReducer', () => {
  test('в state добавляются все заказы при успешном запросе', () => {
    const initialState = {
      orderData: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    };
    const action = {
      type: getFeedsApiThunk.fulfilled.type,
      payload: {
        orders: [
          {
            _id: '671a229ed829be001c7785b7',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2024-10-24T10:34:06.944Z',
            updatedAt: '2024-10-24T10:34:07.742Z',
            number: 57372
          }
        ],
        total: 56998,
        totalToday: 97
      }
    };
    const newState = reducer(initialState, action);
    expect(newState.orderData).toEqual({
      orders: [
        {
          _id: '671a229ed829be001c7785b7',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-10-24T10:34:06.944Z',
          updatedAt: '2024-10-24T10:34:07.742Z',
          number: 57372
        }
      ],
      total: 56998,
      totalToday: 97
    });
  });
});
