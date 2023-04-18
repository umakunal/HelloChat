import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userData: null,
    setDidTryAutoLogin: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const {payload} = action;
      state.token = payload.token;
      state.userData = payload.userData;
      state.setDidTryAutoLogin = true;
      // console.log('AuthState====>', state);
    },
    setDidTryAutoLogin: (state, action) => {
      state.setDidTryAutoLogin = true;
    },
    logout: (state, action) => {
      state.token = null;
      state.userData = null;
      state.setDidTryAutoLogin = false;
    },
  },
});

export const logout = authSlice.actions.logout;
export const authenticate = authSlice.actions.authenticate;
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin;
export default authSlice.reducer;
