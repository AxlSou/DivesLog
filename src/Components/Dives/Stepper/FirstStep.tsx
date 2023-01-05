import React from 'react'
import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const FirstStep = () => {
  const today = new Date()
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(today))
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue)
  }

  return (
    <>
      <h4>General</h4>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <TextField
            id="dive-title"
            label="Dive Title"
            variant="outlined"
            size="small"
            placeholder="What do you want to call your dive?"
            required
          />
          <TextField
            id="dive-site"
            label="Dive Site"
            variant="outlined"
            size="small"
            placeholder="Where did you dive?"
            required
          />
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} size="small" required />
            )}
          />
        </Stack>
      </LocalizationProvider>
      <h6>Type of Dive</h6>
      <FormControl fullWidth size="small">
        <InputLabel id="Dive-type">How did you get in the water?</InputLabel>
        <Select
          labelId="Dive-type"
          id="Dive-type"
          label="How did you get in the water?"
        >
          <MenuItem value="Shore">Shore</MenuItem>
          <MenuItem value="Boat">Boat</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <h6>Depth/Time</h6>
      <Stack spacing={3}>
        <TextField
          id="max-depth"
          label="Max Depth"
          variant="outlined"
          size="small"
          placeholder="How deep did you go? (meters)"
          required
        />
        <TextField
          id="bottom-time"
          label="Bottom Time"
          variant="outlined"
          size="small"
          placeholder="How long was your dive? (mins)"
          required
        />
      </Stack>
    </>
  )
}

export default FirstStep
