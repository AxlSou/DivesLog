import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './Features/userSlice'
import formReducer from './Features/formSlicer'
import stepperReducer from './Features/stepperSlicer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    form: formReducer,
    stepper: stepperReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
