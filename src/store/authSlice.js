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
      // console.log('AuthState====>', state);
    },
    setDidTryAutoLogin: (state, action) => {
      state.setDidTryAutoLogin = true;
      console.log('AuthState====>', state);
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin;
export default authSlice.reducer;
