import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import NewDiveForm from '../Stepper/newDive'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { handleDialogState } from '../../../Features/dialogSlicer'
import { handleNewDive } from '../../../Features/formSlicer'
import { newStepper } from '../../../Features/stepperSlicer'

const FormDialog = () => {
  const { dialogState } = useAppSelector((store) => store.dialog)
  const dispatch = useAppDispatch()

  const openNewDive = () => {
    dispatch(handleNewDive())
    dispatch(newStepper())
    dispatch(handleDialogState())
  }

  return (
    <div className="dialog-container">
      <Button
        variant="outlined"
        onClick={() => openNewDive()}
        className="newDive-btn"
      >
        + New Dive
      </Button>
      <Dialog
        open={dialogState}
        onClose={() => dispatch(handleDialogState())}
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
