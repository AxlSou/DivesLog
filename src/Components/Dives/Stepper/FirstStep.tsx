import * as React from 'react'
import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  handleBottomTime,
  handleDate,
  handleDiveSite,
  handleDiveTitle,
  handleMaxDepth,
  selectDiveType,
} from '../../../Features/formSlicer'

const FirstStep = () => {
  const { diveTitle, diveSite, diveType, date, bottomTime, maxDepth } = useAppSelector((store) => store.form)
  const dispatch = useAppDispatch()

  const handleDateChange = (newValue: Dayjs | null) => {
    dispatch(handleDate(dayjs(newValue).format('MM/DD/YYYY')))
  }

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id = event.target.id
    switch (id) {
      case 'dive-title':
        return dispatch(handleDiveTitle(event.target.value))
      case 'dive-site':
        return dispatch(handleDiveSite(event.target.value))
      case 'max-depth':
        return dispatch(handleMaxDepth(event.target.value))
      case 'bottom-time':
        return dispatch(handleBottomTime(event.target.value))
      default:
        console.error('Wrong input')
    }
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    dispatch(selectDiveType(event.target.value))
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
            value={diveTitle}
            required
            onChange={handleTextChange}
          />
          <TextField
            id="dive-site"
            label="Dive Site"
            variant="outlined"
            size="small"
            placeholder="Where did you dive?"
            value={diveSite}
            required
            onChange={handleTextChange}
          />
          <DesktopDatePicker
            label="Date desktop"
            value={date}
            onChange={handleDateChange}
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
          value={diveType}
          onChange={handleSelectChange}
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
          value={maxDepth}
          required
          onChange={handleTextChange}
        />
        <TextField
          id="bottom-time"
          label="Bottom Time"
          variant="outlined"
          size="small"
          placeholder="How long was your dive? (mins)"
          value={bottomTime}
          required
          onChange={handleTextChange}
        />
      </Stack>
    </>
  )
}

export default FirstStep
