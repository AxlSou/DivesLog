import React from 'react'
import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  handleBuddy,
  handleNotes,
  selectFeeling,
} from '../../../Features/formSlicer'

const FourthStep = () => {
  const { feeling } = useAppSelector((store) => store.form)
  const dispatch = useAppDispatch()

  const handleWeatherChange = (event: SelectChangeEvent) => {
    dispatch(selectFeeling(event.target.value))
  }

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id = event.target.id
    switch (id) {
      case 'notes':
        return dispatch(handleNotes(event.target.value))
      case 'buddy':
        return dispatch(handleBuddy(event.target.value))
      default:
        console.error('Wrong input')
    }
  }

  return (
    <>
      <h4>Experience</h4>
      <h6>Feeling</h6>
      <FormControl fullWidth size="small">
        <InputLabel id="feeling">How did you feel about this dive?</InputLabel>
        <Select
          labelId="feeling"
          id="feeling"
          label="How did you feel about this dive?"
          value={feeling}
          onChange={handleWeatherChange}
        >
          <MenuItem value="Amazing">Amazing</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Average">Average</MenuItem>
          <MenuItem value="Poor">Poor</MenuItem>
        </Select>
      </FormControl>
      <h6>Comments</h6>
      <Stack spacing={3}>
        <TextField
          id="notes"
          label="Write down the memmories of your dive"
          multiline
          rows={4}
          onChange={handleTextChange}
        />
        <TextField
          id="buddy"
          label="Buddy"
          variant="outlined"
          size="small"
          placeholder="Who did you dive with?"
          onChange={handleTextChange}
        />
      </Stack>
    </>
  )
}

export default FourthStep
