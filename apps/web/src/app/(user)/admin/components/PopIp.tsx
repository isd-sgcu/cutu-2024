import axios from 'axios';
import { useEffect, useState } from 'react';

interface PopUpProps{
    isStart: boolean;
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
    setIsShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

interface game{
    id: string;
    winner: {};
    title: string,
    description: string,
    open: boolean,
    actions: [],
    image: string,
    updatedAt: string | null,
    createdAt: string,
    deletedAt: string | null
}

const AUTH_HEADER = {
    headers: {
        Authorization: "Basic Y3V0dWZvb3RiYWxsY2x1YjIwMjQ6Y3V0dWZvb3RiYWxsY2x1YjIwMjQ1NTU1"
    }
};

const PopUp = (props: PopUpProps) => {
    const [gameId, setGameId] = useState('');

    const handleChangeState = async () => {
        try{
            const res = await axios.post(`https://api.cutu2024.sgcu.in.th/admin-api/games/${gameId}/${!props.isStart ? "start": "end"}`, null, AUTH_HEADER)
            console.log(res)
            props.setIsStart(prev => !prev);
            console.log("game", props.isStart ? "stop" : "start")
        }
        catch(error){
            console.log("err: ", (error as Error).message);
        }
        
    }

    const handleOnClick = (ok: boolean) => {
        if(!gameId) return;
        props.setIsShowPopUp(prev => !prev);
        if(ok){
            handleChangeState();
        }
    }

    useEffect(() => {
        handleGetGameId()
    }, [])

    const handleGetGameId = async () => {
        let data: game[] = (await axios.get(`https://api.cutu2024.sgcu.in.th/admin-api/games`, AUTH_HEADER)).data

        if(data.length == 0){
            data = (await axios.post(`https://api.cutu2024.sgcu.in.th/admin-api/games`, {
                title: "game",
                description: "new game",
                actions: [
                    {
                        "key": "CU",
                        "image": "https://i.imgur.com/tBbKGS2.jpeg"
                    },
                    {
                        "key": "TU",
                        "image": "https://i.imgur.com/dFkiG4y.jpeg"
                    }
                ],
                image: "https://i.imgur.com/dFkiG4y.jpeg",
                open: true
            })).data
        }
        
        setGameId(data[0].id)
    }

    return ( 
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20  flex justify-center items-center z-10">
            <div className="bg-white p-4 rounded-lg text-2xl">
                <div>ยืนยันที่จะ "<span className="font-bold">{props.isStart ? "หยุดเกม" : "เริ่มเกมใหม่" }</span>"</div>
                <div className="flex justify-between mt-2 px-2">
                    <button onClick={() => handleOnClick(true)} className="bg-red-400 p-2 rounded-lg">ตกลง</button>
                    <button onClick={() => handleOnClick(false)} className="bg-red-400 p-2 rounded-lg">ยกเลิก</button>
                </div>
            </div>
        </div>
    );
}
 
export default PopUp;