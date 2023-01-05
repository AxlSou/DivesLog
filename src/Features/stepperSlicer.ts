import { createSlice } from '@reduxjs/toolkit'

interface Steps {
  activeStep: number
  skipped: Set<number>
}

const initialState: Steps = {
  activeStep: 0,
  skipped: new Set(),
}

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {},
})

export default stepperSlice.reducer
