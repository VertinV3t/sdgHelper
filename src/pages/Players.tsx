import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import { db } from '../firebaseconfig'
import '../App.css'
import { onSnapshot } from 'firebase/firestore'

type PlayerData = {
  id: string
  name: string
}

type PlayerDetail = {
    id: string
    name: string
    mainRole : string
}

function Players({ data }: { data: PlayerData[] }) {
    const [personalData, setPData] = useState<PlayerDetail[]>([])
    useEffect(() => {
    const auth = getAuth()
    const unsubAuth = auth.onAuthStateChanged(user => {
      if (!user) return

      const uid = user.uid
      const playersRef = collection(db, "personal", uid, "details")

      const unsubFirestore = onSnapshot(playersRef, snapshot => {
        const usersData = snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            mainRole: doc.data().mainRole
        }))
        setPData(usersData)
        console.log(personalData)
      })
      return () => unsubFirestore()
    })
      return () => unsubAuth()
    }, [data])

    return (
        <div className='w-screen flex justify-center items-center p-20'>
            <div className='grid grid-cols-3 gap-20 justify-center items-center'>
                {data.map((data : PlayerData, i : number) => (
                    <div key={i} className='flex justify-center items-center'>
                        <div className='flex flex-col gap-3'>
                            <div className='text-black font-bold'>
                                {i+1}
                            </div>
                            <div className='flex bg-gray-600 w-18 p-6 rounded-full justify-center items-center'>
                                {data.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {personalData[0]?.mainRole == "房主" && (
                    <div>你是房主</div>
                )}
            </div>
        </div>
    )
}

export default Players