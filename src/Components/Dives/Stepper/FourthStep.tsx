import React from 'react'
import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const FourthStep = () => {
  return (
    <>
      <h4>Experience</h4>
      <h6>Feeling</h6>
      <FormControl fullWidth size="small">
        <InputLabel id="feeling">How did you feel about this dive?</InputLabel>
        <Select labelId="feeling" id="feeling" label="How did you feel about this dive?">
          <MenuItem value="Amazing">Amazing</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Average">Average</MenuItem>
          <MenuItem value="Poor">Poor</MenuItem>
        </Select>
      </FormControl>
      <h6>Comments</h6>
      <Stack spacing={3}>
      <TextField
          id="Notes"
          label="Write down the memmories of your dive"
          multiline
          rows={4}
        />
        <TextField
          id="buddy"
          label="Buddy"
          variant="outlined"
          size="small"
          placeholder="Who did you dive with?"
          required
        />
      </Stack>
    </>
  )
}

export default FourthStep
