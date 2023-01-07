import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs'

const today = new Date()

interface Steps {
  activeStep: number
  skipped: Set<number>
  diveTitle: string
  diveSite: string
  date: Dayjs | null | string
  diveType: string
  maxDepth: string
  bottomTime: string
  weather: string
  airTemp: string
  surfaceTemp: string
  bottomTemp: string
  visibility: string
  waterType: string
  current: string
  suit: string
  weight: string
  cylinder: string
  cylinderSize: string
  gasMixture: string
  feeling: string
  notes: string
  buddy: string
}

const initialState: Steps = {
  activeStep: 0,
  skipped: new Set(),
  diveTitle: '',
  diveSite: '',
  date: dayjs(today).format('MM/DD/YYYY'),
  diveType: '',
  maxDepth: '',
  bottomTime: '',
  weather: '',
  airTemp: '',
  surfaceTemp: '',
  bottomTemp: '',
  visibility: '',
  waterType: '',
  current: '',
  suit: '',
  weight: '',
  cylinder: '',
  cylinderSize: '',
  gasMixture: '',
  feeling: '',
  notes: '',
  buddy: ''
}

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    handleDiveTitle: (state, action: PayloadAction<string>) => {
      state.diveTitle = action.payload
    },
    handleDiveSite: (state, action: PayloadAction<string>) => {
      state.diveSite = action.payload
    },
    handleDate: (state, action: PayloadAction<Dayjs | null | string>) => {
      state.date = action.payload
    },
    selectDiveType: (state, action: PayloadAction<string>) => {
      state.diveType = action.payload
    },
    handleMaxDepth: (state, action: PayloadAction<string>) => {
      state.maxDepth = action.payload
    },
    handleBottomTime: (state, action: PayloadAction<string>) => {
      state.bottomTime = action.payload
    },
    selectWeather: (state, action: PayloadAction<string>) => {
      state.weather = action.payload
    },
    handleAirTemp: (state, action: PayloadAction<string>) => {
      state.airTemp = action.payload
    },
    handleSurfaceTemp: (state, action: PayloadAction<string>) => {
      state.surfaceTemp = action.payload
    },
    handleBottomTemp: (state, action: PayloadAction<string>) => {
      state.bottomTemp = action.payload
    },
    handleVisibility: (state, action: PayloadAction<string>) => {
      state.visibility = action.payload
    },
    selectWaterType: (state, action: PayloadAction<string>) => {
      state.waterType = action.payload
    },
    selectCurrent: (state, action: PayloadAction<string>) => {
      state.current = action.payload
    },
    selectSuit: (state, action: PayloadAction<string>) => {
      state.suit = action.payload
    },
    handleWeight: (state, action: PayloadAction<string>) => {
      state.weight = action.payload
    },
    handleCylinderSize: (state, action: PayloadAction<string>) => {
      state.cylinderSize = action.payload
    },
    selectCylinder: (state, action: PayloadAction<string>) => {
      state.cylinder = action.payload
    },
    selectGasMixture: (state, action: PayloadAction<string>) => {
      state.gasMixture = action.payload
    },
    selectFeeling: (state, action: PayloadAction<string>) => {
      state.feeling = action.payload
    },
    handleNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload
    },
    handleBuddy: (state, action: PayloadAction<string>) => {
      state.buddy = action.payload
    }
  },
})

export const {
  handleDiveTitle,
  handleDiveSite,
  handleDate,
  selectDiveType,
  handleMaxDepth,
  handleBottomTime,
  selectWeather,
  handleAirTemp,
  handleSurfaceTemp,
  handleBottomTemp,
  handleVisibility,
  selectWaterType,
  selectCurrent,
  selectSuit,
  handleWeight,
  handleCylinderSize,
  selectCylinder,
  selectGasMixture,
  selectFeeling,
  handleNotes,
  handleBuddy
} = stepperSlice.actions

export default stepperSlice.reducer
