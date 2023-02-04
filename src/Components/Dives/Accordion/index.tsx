import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionActions from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteDoc, doc, DocumentData } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { db } from '../../../firebaseConfig';
import { handleAirTemp, handleBottomTemp, handleBottomTime, handleBuddy, handleCylinderSize, handleDate, handleDiveSite, handleDiveTitle, handleMaxDepth, handleNotes, handleSurfaceTemp, handleVisibility, handleWeight, selectCurrent, selectCylinder, selectDiveType, selectFeeling, selectGasMixture, selectSuit, selectWaterType, selectWeather } from '../../../Features/formSlicer';
import { handleDialogState } from '../../../Features/dialogSlicer';

interface Props {
  diveTitle: string
  diveSite: string
  date: string
  diveType: [string, DocumentData]
  maxDepth: [string, DocumentData]
  bottomTime: [string, DocumentData]
  weather: [string, DocumentData]
  airTemp: [string, DocumentData]
  surfaceTemp: [string, DocumentData]
  bottomTemp: [string, DocumentData]
  visibility: [string, DocumentData]
  waterType: [string, DocumentData]
  current: [string, DocumentData]
  suit: [string, DocumentData]
  weight: [string, DocumentData]
  cylinder: [string, DocumentData]
  cylinderSize: [string, DocumentData]
  gasMixture: [string, DocumentData]
  feeling: [string, DocumentData]
  notes: [string, DocumentData]
  buddy: [string, DocumentData]
}

function ControlledAccordions({ ...props }: Props) {

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { user } = useAppSelector((store) => store.user)
  const dispatch = useAppDispatch()

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const deleteLog = async (diveTitle: string) => {
    if (user.uid){
      await deleteDoc(doc(db, "DivesLogs", user.uid, "Dives", diveTitle));
      window.location.reload()
    }
  }

  const editLog = (props: DocumentData) => {
    dispatch(handleDiveTitle(props.diveTitle))
    dispatch(handleDiveSite(props.diveSite))
    dispatch(handleDate(props.date))
    dispatch(selectDiveType(props.diveType[1]))
    dispatch(handleMaxDepth(props.maxDepth[1]))
    dispatch(handleBottomTime(props.bottomTime[1]))
    dispatch(selectWeather(props.weather[1]))
    dispatch(handleAirTemp(props.airTemp[1]))
    dispatch(handleSurfaceTemp(props.surfaceTemp[1]))
    dispatch(handleBottomTemp(props.bottomTemp[1]))
    dispatch(handleVisibility(props.visibility[1]))
    dispatch(selectWaterType(props.waterType[1]))
    dispatch(selectCurrent(props.current[1]))
    dispatch(selectSuit(props.suit[1]))
    dispatch(handleWeight(props.weight[1]))
    dispatch(handleCylinderSize(props.cylinderSize[1]))
    dispatch(selectCylinder(props.cylinder[1]))
    dispatch(selectGasMixture(props.gasMixture[1]))
    dispatch(selectFeeling(props.feeling[1]))
    dispatch(handleNotes(props.notes[1]))
    dispatch(handleBuddy(props.buddy[1]))

    dispatch(handleDialogState())
  }

  return (
    <Accordion expanded={expanded === props.diveTitle} onChange={handleChange(props.diveTitle)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={props.diveTitle}
        id={props.diveTitle}
      >
        <Typography sx={{ width: '25%', flexShrink: 0 }}>
          {props.diveTitle}
        </Typography>
        <Typography sx={{ color: 'text.secondary', marginRight: '15%' }}>{props.diveSite}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{props.date}</Typography>
      </AccordionSummary>
      <AccordionDetails className='log-details'>
        {(props.diveType[1]) && <Typography>{`${props.diveType[0]}: ${props.diveType[1]}`}</Typography>}
        {(props.maxDepth) && <Typography>{`${props.maxDepth[0]}: ${props.maxDepth[1]} meters`}</Typography>}
        {(props.bottomTime) && <Typography>{`${props.bottomTime[0]}: ${props.bottomTime[1]} mins`}</Typography>}
        {(props.airTemp[1]) && <Typography>{`${props.airTemp[0]}: ${props.airTemp[1]} °C`}</Typography>}
        {(props.surfaceTemp[1]) && <Typography>{`${props.surfaceTemp[0]}: ${props.surfaceTemp[1]} °C`}</Typography>}
        {(props.bottomTemp[1]) && <Typography>{`${props.bottomTemp[0]}: ${props.bottomTemp[1]} °C`}</Typography>}
        {(props.visibility[1]) && <Typography>{`${props.visibility[0]}: ${props.visibility[1]} meters`}</Typography>}
        {(props.waterType[1]) && <Typography>{`${props.waterType[0]}: ${props.waterType[1]}`}</Typography>}
        {(props.current[1]) && <Typography>{`${props.current[0]}: ${props.current[1]}`}</Typography>}
        {(props.suit[1]) && <Typography>{`${props.suit[0]}: ${props.suit[1]}`}</Typography>}
        {(props.weight[1]) && <Typography>{`${props.weight[0]}: ${props.weight[1]} kg`}</Typography>}
        {(props.cylinder[1]) && <Typography>{`${props.cylinder[0]}: ${props.cylinder[1]}`}</Typography>}
        {(props.cylinderSize[1]) && <Typography>{`${props.cylinderSize[0]}: ${props.cylinderSize[1]} liters`}</Typography>}
        {(props.gasMixture[1]) && <Typography>{`${props.gasMixture[0]}: ${props.gasMixture[1]}`}</Typography>}
        {(props.feeling[1]) && <Typography>{`${props.feeling[0]}: ${props.feeling[1]}`}</Typography>}
        {(props.notes[1]) && <Typography>{`${props.notes[0]}: ${props.notes[1]}`}</Typography>}
        {(props.buddy[1]) && <Typography>{`${props.buddy[0]}: ${props.buddy[1]}`}</Typography>}
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" startIcon={<EditIcon />} onClick={() => {editLog(props)}}>Edit</Button>
        <Button size='small' startIcon={<DeleteIcon />} color="error" onClick={() => {deleteLog(props.diveTitle)}}>
          Delete
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default ControlledAccordions