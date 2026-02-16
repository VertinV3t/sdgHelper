import { useEffect, useState } from 'react'
import '../App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.tsx'
import Players from './Players.tsx'
import Home from './Home.tsx';

import { db } from '../firebaseconfig.tsx'
import { collection, addDoc, onSnapshot} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

type PlayerData = {
  id: string
  name: string
}

const auth = getAuth()
signInAnonymously(auth)

auth.onAuthStateChanged(user => {
  console.log("User ID:", user?.uid)
})


function App() {
  const [totalPlayers, setTotalPlayers] = useState(0)
  const addName = (n : string) => {
    newPlayer(n)
    setTotalPlayers(totalPlayers +1)
  }

  async function newPlayer(n : string) {
    const auth = getAuth()
    const uid = auth.currentUser?.uid
    if (!uid) return

    const leader = data.length === 0;
    await addDoc(collection(db, "personal", uid, "details"), {
      name : n,
      mainRole : `${leader? "房主":"非房主"}`,
      inGameRole : "平民"
    })
    await addDoc(collection(db, "global"), {
      name : n,
    })
  }

  const [data, setData] = useState<PlayerData[]>([])
  useEffect(() => {
    const auth = getAuth()
    const unsubAuth = auth.onAuthStateChanged(user => {
      if (!user) return

      // const uid = user.uid
      const playersRef = collection(db, "global")

      const unsubFirestore = onSnapshot(playersRef, snapshot => {
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }))
        setData(usersData)
      })
      console.log(data)
      return () => unsubFirestore()
    })

      return () => unsubAuth()
  }, [totalPlayers])


  return (
    <BrowserRouter>
        <Header></Header>

      <Routes>
        <Route path='/' element = {<Home addName={addName}/>}/>
        <Route path='/game' element = {<Players data={data}/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App
