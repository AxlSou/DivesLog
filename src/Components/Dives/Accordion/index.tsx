import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  diveTitle: string
  diveSite: string
  date?: string
  diveType?: string
  maxDepth?: string
  bottomTime?: string
  weather?: string
  airTemp?: string
  surfaceTemp?: string
  bottomTemp?: string
  visibility?: string
  waterType?: string
  current?: string
  suit?: string
  weight?: string
  cylinder?: string
  cylinderSize?: string
  gasMixture?: string
  feeling?: string
  notes?: string
  buddy?: string
}

function ControlledAccordions({ diveTitle, diveSite, date, diveType, maxDepth, bottomTime, weather, airTemp, surfaceTemp, bottomTemp, visibility, waterType, current, suit, weight, cylinder, cylinderSize, gasMixture, feeling, notes, buddy }: Props) {
  
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === diveTitle} onChange={handleChange(diveTitle)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelbh-content"
          id={diveTitle}
        >
          <Typography sx={{ width: '25%', flexShrink: 0 }}>
            {diveTitle}
          </Typography>
          <Typography sx={{ color: 'text.secondary', marginRight: '15%' }}>{diveSite}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{date}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ControlledAccordions