import reducer, { getUserApiThunk } from './userSlice';

describe('тестирование extraReducer', () => {
  test('[pending] меняется loginUserRequest во время ожидания ответа', () => {
    const initialState = {
      isAuthChecked: false,
      isAuthenticated: false,
      loginUserRequest: false,
      user: {
        email: '',
        name: ''
      }
    };
    const action = { type: getUserApiThunk.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.loginUserRequest).toBe(true);
  });
  test('[rejected] меняется state после отклоненного ответа', () => {
    const initialState = {
      isAuthChecked: false,
      isAuthenticated: false,
      loginUserRequest: true,
      user: {
        email: '',
        name: ''
      }
    };
    const action = { type: getUserApiThunk.rejected.type };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({
      isAuthChecked: true,
      isAuthenticated: false,
      loginUserRequest: false,
      user: {
        email: '',
        name: ''
      }
    });
  });
  test('[fulfilled] добавляются данные пользователя и подтверждается авторизация после успешного ответа', () => {
    const initialState = {
      isAuthChecked: false,
      isAuthenticated: false,
      loginUserRequest: true,
      user: {
        email: '',
        name: ''
      }
    };
    const action = {
      type: getUserApiThunk.fulfilled.type,
      payload: {
        user: {
          email: 'test@mail.ru',
          name: 'Test'
        }
      }
    };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({
      isAuthChecked: true,
      isAuthenticated: true,
      loginUserRequest: true,
      user: {
        email: 'test@mail.ru',
        name: 'Test'
      }
    });
  });
});
