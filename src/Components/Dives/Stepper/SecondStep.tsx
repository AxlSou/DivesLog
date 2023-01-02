import React from 'react'
import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'

const SecondStep = () => {
  return (
    <>
      <h4>Conditions</h4>
      <h6>Weahter</h6>
      <FormControl fullWidth size="small">
        <InputLabel id="weather">How was the weather?</InputLabel>
        <Select labelId="weather" id="weather" label="How was the weather?">
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
        />
        <TextField
          id="surface-temp"
          label="Surface Temperature"
          variant="outlined"
          size="small"
          placeholder="What was the surface temperature?"
        />
        <TextField
          id="bottom-temp"
          label="Bottom Temperature"
          variant="outlined"
          size="small"
          placeholder="What was the bottom temperature?"
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
        />
        <h6>Current</h6>
        <FormControl fullWidth size="small">
        <InputLabel id="weather">How was the current?</InputLabel>
        <Select labelId="current" id="current" label="How was the current?">
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
