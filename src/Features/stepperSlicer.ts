import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Steps {
    activeStep: number
    skipped: Set<number>
}

const initialState: Steps = {
    activeStep: 0,
    skipped: new Set<number>()
}

export const stepperSlice = createSlice({
    name: 'stepper',
    initialState,
    reducers: {
        nextStep: (state) => {
            state.activeStep += 1
        },
        previousStep: (state) => {
            state.activeStep -= 1
        },
        skipStep: (state, action: PayloadAction<Set<number>>) => {
            state.skipped = action.payload
        },
        newStepper: () => initialState
    }
})

export const { nextStep, previousStep, skipStep, newStepper } = stepperSlice.actions

export default stepperSlice.reducer