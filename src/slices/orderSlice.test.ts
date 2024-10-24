import reducer, { orderBurgerApiThunk } from './orderSlice';

describe('тестирование extraReducer', () => {
  test('[pending] меняется orderRequest во время ожидания ответа', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: null
    };
    const action = { type: orderBurgerApiThunk.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.orderRequest).toBe(true);
  });
  test('[rejected] меняется orderRequest после отклоненного ответа', () => {
    const initialState = {
      orderRequest: true,
      orderModalData: null
    };
    const action = { type: orderBurgerApiThunk.rejected.type };
    const newState = reducer(initialState, action);
    expect(newState.orderRequest).toBe(false);
  });
  test('[fulfilled] добавляются данные заказа после успешного ответа', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: null
    };
    const action = {
      type: orderBurgerApiThunk.fulfilled.type,
      payload: {
        name: 'Флюоресцентный бургер',
        order: {
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093d',
              name: 'Флюоресцентная булка R2-D3',
              type: 'bun',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/bun-01.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-01-large.png',
              __v: 0
            }
          ],
          _id: '671a436bd829be001c77863d',
          status: 'done',
          name: 'Флюоресцентный бургер',
          createdAt: '2024-10-24T12:54:03.297Z',
          updatedAt: '2024-10-24T12:54:04.110Z',
          number: 57375
        }
      }
    };
    const newState = reducer(initialState, action);
    expect(newState.orderModalData).toEqual({
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        }
      ],
      _id: '671a436bd829be001c77863d',
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-10-24T12:54:03.297Z',
      updatedAt: '2024-10-24T12:54:04.110Z',
      number: 57375
    });
  });
});
