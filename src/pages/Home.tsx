import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import '../App.css'

function Home({addName} : {addName : (name : string) => void}) {
    const [playerName, setPlayerName] = useState("")

    return (
        <div className='flex w-screen justify-center'>
            <div className='flex flex-col justify-center items-center w-full'>
                <div className='text-black font-bold p-10 text-2xl'>
                    创建角色
                </div>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <div className='flex bg-white p-6 rounded-full text-black w-30 justify-center items-center text-center'>
                        <p>{playerName == "" ? "玩家":playerName}</p>
                    </div>
                    <input className="shadow-sm bg-white border w-40 p-2 text-black" 
                    type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)}
                    placeholder='请输入名字'/>
                </div>
                <Link to={"/game"} className=''>
                    <button className={`mt-6 text-color-black ${playerName == "" ? "hidden":"bg-red-500"} `} onClick={() => addName(playerName) }>
                        加入房间
                    </button>
                </Link>
            </div>
        </div>
    )
}



export default Home