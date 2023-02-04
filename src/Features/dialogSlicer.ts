import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dialogState: false
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        handleDialogState: (state) => {
            state.dialogState = !state.dialogState
        }
    }
})

export const { handleDialogState } = dialogSlice.actions

export default dialogSlice.reducer