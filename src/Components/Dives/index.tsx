import FormDialog from './Dialog/dialog'
import './index.scss'
import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { useAppSelector } from '../../hooks'
import { useEffect, useState } from 'react'
import ControlledAccordions from './Accordion'

const Dives = () => {
  const { user } = useAppSelector((store) => store.user)
  const [logs, setLogs] = useState<DocumentData>([]);

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
        />
      )
    })

    return data
  }

  return (
    <div className="dives-background">
      <div className='dives-container'>
        <h1 className='title'>Logbook</h1>
        <FormDialog />
        <div className='logs-container'>
          <header>
            <h4>Total dives: {logs.length}</h4>
            <h4>Dive time: </h4>
          </header>
          <section>
            <>
              {handleLogs()}
            </>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dives
