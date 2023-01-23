import React from 'react'
import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  handleAirTemp,
  handleBottomTemp,
  handleSurfaceTemp,
  handleVisibility,
  selectCurrent,
  selectWaterType,
  selectWeather,
} from '../../../Features/formSlicer'

const SecondStep = () => {
  const { weather, current } = useAppSelector((store) => store.form)
  const dispatch = useAppDispatch()

  const handleWeatherChange = (event: SelectChangeEvent) => {
    dispatch(selectWeather(event.target.value))
  }

  const handleWaterTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(selectWaterType(event.target.value))
  }

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id = event.target.id
    switch (id) {
      case 'air-temp':
        return dispatch(handleAirTemp(event.target.value))
      case 'surface-temp':
        return dispatch(handleSurfaceTemp(event.target.value))
      case 'bottom-temp':
        return dispatch(handleBottomTemp(event.target.value))
      case 'visibility':
        return dispatch(handleVisibility(event.target.value))
      default:
        console.error('Wrong input')
    }
  }

  const handleCurrentChange = (event: SelectChangeEvent) => {
    dispatch(selectCurrent(event.target.value))
  }

  return (
    <>
      <h4>Conditions</h4>
      <h6>Weahter</h6>
      <FormControl fullWidth size="small">
        <InputLabel id="weather">How was the weather?</InputLabel>
        <Select
          labelId="weather"
          id="weather"
          label="How was the weather?"
          value={weather}
          onChange={handleWeatherChange}
        >
          <MenuItem value="Sunny">Sunny</MenuItem>
          <MenuItem value="Partly Cloudy">Partly Cloudy</MenuItem>
          <MenuItem value="Cloudy">Cloudy</MenuItem>
          <MenuItem value="Rainy">Rainy</MenuItem>
          <MenuItem value="Windy">Windy</MenuItem>
          <MenuItem value="Foggy">Foggy</MenuItem>
        </Select>
      </FormControl>
      <h6>Temperature</h6>
      <Stack spacing={3}>
        <TextField
          id="air-temp"
          label="Air Temperature"
          variant="outlined"
          size="small"
          placeholder="What was the air temperature?"
          onChange={handleTextChange}
        />
        <TextField
          id="surface-temp"
          label="Surface Temperature"
          variant="outlined"
          size="small"
          placeholder="What was the surface temperature?"
          onChange={handleTextChange}
        />
        <TextField
          id="bottom-temp"
          label="Bottom Temperature"
          variant="outlined"
          size="small"
          placeholder="What was the bottom temperature?"
          onChange={handleTextChange}
        />
      </Stack>
      <h6>Water Type</h6>
      <FormControl>
        <FormLabel id="water-type">What type of water was it?</FormLabel>
        <RadioGroup
          row
          aria-labelledby="water-type"
          defaultValue="salt"
          name="radio-buttons-group"
          onChange={handleWaterTypeChange}
        >
          <FormControlLabel value="salt" control={<Radio />} label="Salt" />
          <FormControlLabel value="fresh" control={<Radio />} label="Fresh" />
        </RadioGroup>
      </FormControl>
      <h6>Visibility</h6>
      <TextField
        id="visibility"
        label="Visibility"
        variant="outlined"
        size="small"
        placeholder="How far could you see? (meters)"
        onChange={handleTextChange}
      />
      <h6>Current</h6>
      <FormControl fullWidth size="small">
        <InputLabel id="weather">How was the current?</InputLabel>
        <Select
          labelId="current"
          id="current"
          label="How was the current?"
          value={current}
          onChange={handleCurrentChange}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Light">Light</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Strong">Strong</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

export default SecondStep
