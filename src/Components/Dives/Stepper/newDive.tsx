import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import FourthStep from './FourthStep'
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { nextStep, previousStep, skipStep } from '../../../Features/stepperSlicer'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';


const steps = ['General Information', 'Conditions', 'Equipment', 'Experience']

export interface State extends SnackbarOrigin {
  open: boolean;
}

const NewDiveForm = () => {
  const { activeStep, skipped } = useAppSelector((store) => store.stepper)
  const { user } = useAppSelector((store) => store.user)
  const { diveTitle, diveSite, date, diveType, maxDepth, bottomTime, weather, airTemp, surfaceTemp, bottomTemp, visibility, waterType, current, suit, weight, cylinder, cylinderSize, gasMixture, feeling, notes, buddy } = useAppSelector((store) => store.form)
  const dispatch = useAppDispatch()
  const [alert, setAlert] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = alert;

  const isStepOptional = (step: number) => {
    return [1, 2, 3].includes(step);
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    dispatch(nextStep())
    dispatch(skipStep(newSkipped));
  };

  const handleBack = () => {
    dispatch(previousStep())
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    dispatch(nextStep());

    const newSkipped = new Set(skipped.values());
    newSkipped.add(activeStep);
    dispatch(skipStep(newSkipped))

  };

  const handleStep = () => {
    switch (activeStep) {
      case 0:
        return <FirstStep />
      case 1:
        return <SecondStep />
      case 2:
        return <ThirdStep />
      case 3:
        return <FourthStep />
      default:
        console.error('Invalid step')
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const handleSubmit = async () => {
    if (diveTitle && diveSite && maxDepth && bottomTime) {
      if (user.uid) {
        await setDoc(doc(db, "DivesLogs", user.uid, "Dives", diveTitle), {
          diveTitle: diveTitle,
          diveSite: diveSite,
          date: date,
          diveType: diveType,
          bottomTime: bottomTime,
          maxDepth: maxDepth,
          weather: weather,
          airTemp: airTemp,
          surfaceTemp: surfaceTemp,
          bottomTemp: bottomTemp,
          visibility: visibility,
          waterType: waterType,
          current: current,
          suit: suit,
          weight: weight,
          cylinder: cylinder,
          cylinderSize: cylinderSize,
          gasMixture: gasMixture,
          feeling: feeling,
          notes: notes,
          buddy: buddy
        });
        window.location.reload()
      }
    } else {
      return setAlert({ ...alert, open: true })
    }
  }

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <form>{handleStep()}</form>
      <React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {(isStepOptional(activeStep) && activeStep !== 3) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          {activeStep === steps.length - 1 ?
            <Button onClick={handleSubmit}>
              Submit
            </Button> :
            <Button onClick={handleNext}>
              Next
            </Button>}
        </Box>
      </React.Fragment>
      <Snackbar
        className='form-alert'
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose}>
            Please fill out all required items '*'
          </Alert>
        </Snackbar>
    </div>
  )
}

export default NewDiveForm
