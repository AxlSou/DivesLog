import FormDialog from './Dialog/dialog'
import './index.scss'
import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { useAppSelector } from '../../hooks'
import { useEffect, useState } from 'react'
import ControlledAccordions from './Accordion'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box/Box'
import Lottie from 'react-lottie'
import bubbles from '../../Assets/lotties/30221-bubbles.json'

export const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: bubbles,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const Dives = () => {
  const { user } = useAppSelector((store) => store.user)
  const [logs, setLogs] = useState<DocumentData>([])

  useEffect(() => {
    if (user.uid) {
      const docRef = collection(db, "DivesLogs", user.uid, "Dives")
      const getUserLogs = async () => {
        const docSnap = await getDocs(docRef)
        return setLogs(docSnap.docs.map((doc) => doc.data()))
      }
      getUserLogs()
    }
  }, [user.uid])

  const handleLogs = () => {
    const data = logs.map((log: DocumentData) => {
      return (
        <ControlledAccordions
          key={log.diveTitle}
          diveTitle={log.diveTitle}
          diveSite={log.diveSite}
          date={log.date}
          diveType={['Dive Type', log.diveType]}
          maxDepth={['Max Depth', log.maxDepth]}
          bottomTime={['Bottom Time', log.bottomTime]}
          weather={['Weather', log.weather]}
          airTemp={['Air Temperature', log.airTemp]}
          surfaceTemp={['Surface Temperature', log.surfaceTemp]}
          bottomTemp={['Bottom Tempreature', log.bottomTemp]}
          visibility={['Visibility', log.visibility]}
          waterType={['Water Type', log.waterType]}
          current={['Current', log.current]}
          suit={['Suit', log.suit]}
          weight={['Weight', log.weight]}
          cylinder={['Cylinder', log.cylinder]}
          cylinderSize={['Cylinder Size', log.cylinderSize]}
          gasMixture={['Gas Mixture', log.gasMixture]}
          feeling={['Feeling', log.feeling]}
          notes={['Notes', log.notes]}
          buddy={['Buddy', log.buddy]}
        />
      )
    })

    return data
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const LogsContainer = () => {
    if (user.uid) {
      return (
        <>
          <header>
            <h4>Total dives: {(logs.length === 0) ? 0 : logs.length}</h4>
            <h4>Total Dive time: {(logs.length === 0) ? 0
              : logs.map((log: DocumentData) => log.bottomTime).reduce((a: string, b: string) => parseInt(a) + parseInt(b))} mins</h4>
          </header>
          <section>
            <>
              {(logs.length === 0) ?
                <Box className='dives-alert'>
                  <Div>{'There are no logs recorded. You can add a new one clicking on "+ New Dive"'}</Div>
                </Box> :
                handleLogs()}
            </>
          </section>
        </>
      )
    } else {
      return (
        <Box className='dives-alert'>
          <Div>{"You must log in to visualize your logs"}</Div>
        </Box>
      )
    }
  }

  return (
    <div className="dives-background">
      <div className='loader'>
        <Lottie options={defaultOptions} speed={0.5} />
      </div>
      <div className='dives-container'>
        <h1 className='title'>Logbook</h1>
        <FormDialog />
        <div className='logs-container'>
          <LogsContainer />
        </div>
      </div>
    </div>
  )
}

export default Dives
