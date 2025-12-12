import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [
    { id: 'u_001', name: 'Taro Yamada', email: 'taro@example.com' },
    { id: 'u_002', name: 'Hanako Suzuki', email: 'hanako@example.com' },
    { id: 'u_003', name: 'Ken Tanaka', email: 'ken@example.com' },
    { id: 'u_004', name: 'Aoi Sato', email: 'aoi@example.com' },
  ],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const selectUsers = (state) => state.users.users
export const selectUserById = (state, userId) =>
  state.users.users.find((u) => u.id === userId)

export default usersSlice.reducer
