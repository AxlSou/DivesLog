import React from "react";
import { Stack } from "@mui/material";
import TextField from '@mui/material/TextField'

const ThirdStep = () => {

    return (
        <>
            <h4>Experience</h4>
                <Stack spacing={3}>
                    <TextField id="dive-title" label="Dive Title" variant="outlined" size="small" placeholder="What do you want to call your dive?" required/>
                    <TextField id="dive-site" label="Dive Site" variant="outlined" size="small" placeholder="Where did you dive?" required/>
                </Stack>
        </>
    )
}

export default ThirdStep