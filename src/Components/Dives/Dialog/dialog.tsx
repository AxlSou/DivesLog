import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import NewDiveForm from '../Stepper/newDive'

const FormDialog = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="dialog-container">
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="newDive-btn"
      >
        + New Dive
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle>Add a new dive</DialogTitle>
        <DialogContent>
          <NewDiveForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FormDialog
