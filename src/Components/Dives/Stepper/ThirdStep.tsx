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

const ThirdStep = () => {
  return (
    <>
      <h4>Equipment</h4>
      <FormControl fullWidth size="small">
        <InputLabel id="Suit">What suit did you wear?</InputLabel>
        <Select labelId="Suit" id="Suit" label="What suit did you wear">
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="3MM">Full Suit 3MM</MenuItem>
          <MenuItem value="5MM">Full Suit 5MM</MenuItem>
          <MenuItem value="7MM">Full Suit 7MM</MenuItem>
          <MenuItem value="Shorty">Shorty</MenuItem>
          <MenuItem value="Semi">Semi Dry</MenuItem>
          <MenuItem value="Dry">Dry Suit</MenuItem>
        </Select>
      </FormControl>
      <h6>Weight</h6>
      <Stack spacing={3}>
        <TextField
          id="weight"
          label="How was the amount of weight you used?"
          variant="outlined"
          size="small"
        />
      </Stack>
      <h6>Cylinder</h6>
      <Stack spacing={1}>
        <FormControl>
          <FormLabel id="water-type">What type of water was it?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="water-type"
            defaultValue="salt"
            name="radio-buttons-group"
          >
            <FormControlLabel value="steel" control={<Radio />} label="Steel" />
            <FormControlLabel
              value="aluminum"
              control={<Radio />}
              label="Aluminum"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <TextField
          id="weight"
          label="What was the cylinder size"
          variant="outlined"
          size="small"
        />
      </Stack>
      <h6>Gas Mixture</h6>
      <FormControl fullWidth size="small">
        <InputLabel id="gas">What kind of gas did you use?</InputLabel>
        <Select labelId="gas" id="gas" label="What kind of gas did you use?">
          <MenuItem value="Air">Air</MenuItem>
          <MenuItem value="EANX32">EANX32</MenuItem>
          <MenuItem value="EANX36">EANX36</MenuItem>
          <MenuItem value="EANX40">EANX40</MenuItem>
          <MenuItem value="Enriched">Enriched</MenuItem>
          <MenuItem value="Trimex">Trimex</MenuItem>
          <MenuItem value="Rebreather">Rebreather</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

export default ThirdStep
