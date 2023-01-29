import { createSlice } from '@reduxjs/toolkit'

interface User {
  user: {
    email?: string
    uid?: string
    displayName?: string
  }
}

const initialState: User = {
  user: {
    email: "",
    uid: "",
    displayName: "",
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = {}
    }
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
