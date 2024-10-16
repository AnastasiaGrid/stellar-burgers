import { getUserApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface IInitialState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserRequest: boolean;
  user: TUser;
}

const initialState: IInitialState = {
  isAuthChecked: false,
  isAuthenticated: false,

  loginUserRequest: false,
  user: {
    email: '',
    name: ''
  }
};

//проверяем, есть ли токен
export const getUserApiThunk = createAsyncThunk('user/getUserApi', getUserApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    deleteUserData: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthenticated = false;
    }
  },
  selectors: {
    selectIsAuthChecked: (sliceState) => sliceState.isAuthChecked,
    selectIsAuthenticated: (sliceState) => sliceState.isAuthenticated,
    selectLoginUserRequest: (sliceState) => sliceState.loginUserRequest,
    selectUser: (sliceState) => sliceState.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserApiThunk.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(getUserApiThunk.rejected, (state) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(getUserApiThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      });
  }
});

export default userSlice.reducer;
export const {
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectLoginUserRequest,
  selectUser
} = userSlice.selectors;

export const { addUserData, deleteUserData } = userSlice.actions;
