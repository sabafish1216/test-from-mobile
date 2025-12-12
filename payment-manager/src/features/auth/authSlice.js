import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // 仮：ログイン中ユーザー
  login_user: {
    id: 'u_001',
    name: 'Taro Yamada',
    email: 'taro@example.com',
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginUser(state, action) {
      state.login_user = action.payload
    },
    logout(state) {
      state.login_user = null
    },
  },
})

export const { setLoginUser, logout } = authSlice.actions

export const selectLoginUser = (state) => state.auth.login_user
export const selectIsLoggedIn = (state) => Boolean(state.auth.login_user)

export default authSlice.reducer
