import FormDialog from './Dialog/dialog'
import './index.scss'
import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { useAppSelector } from '../../hooks'
import { useEffect, useState } from 'react'

const Dives = () => {
  const { user } = useAppSelector((store) => store.user)
  const [logs, setLogs] = useState<DocumentData>([]);
  
  useEffect(() => {
    if (user.uid) {
      const docRef = collection(db, "DivesLogs", user.uid, "Dives")
      const getUserLogs = async () => {
        const docSnap = await getDocs(docRef)
        console.log(docSnap.docs.map((doc) => doc.data()))
        return setLogs(docSnap.docs.map((doc) => doc.data()))
      }
      getUserLogs()
    }
  }, [user.uid])

  return (
    <div className="dives-background">
        <h2 className='title'>Logbook</h2>
        <FormDialog />
        <div className='logs-container'>{logs.map((log: DocumentData) => {
          return (
          <h1>{log.diveTitle}</h1>
        )})}
        </div>
    </div>
  )
}

export default Dives
