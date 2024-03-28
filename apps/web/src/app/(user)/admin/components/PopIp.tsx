import axios from 'axios';

interface PopUpProps{
    isStart: boolean;
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
    setIsShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUp = (props: PopUpProps) => {
    const handleChangeState = async () => {
        try{
            if(props.isStart){
                await axios.post(`/admin-api/games/stop`, {
                    game_id: "123121321"
                })
            }
            else{
                await axios.post("{{base_url}}/admin-api/games/start", {
                    game_id: "123121321"
                })
            }
            props.setIsStart(prev => !prev);
        }
        catch(error){
            console.log("err: ", (error as Error).message);
        }
        
    }

    const handleOnClick = (ok: boolean) => {
        props.setIsShowPopUp(prev => !prev);
        if(ok){
            handleChangeState();
        }
    }

    return ( 
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20  flex justify-center items-center z-10">
            <div className="bg-white p-4 rounded-lg text-2xl">
                <div>ยืนยันที่จะ "<span className="font-bold">{props.isStart ? "เริ่มเกมใหม่" : "หยุดเกม" }</span>"</div>
                <div className="flex justify-between mt-2 px-2">
                    <button onClick={() => handleOnClick(true)} className="bg-red-400 p-2 rounded-lg">ตกลง</button>
                    <button onClick={() => handleOnClick(false)} className="bg-red-400 p-2 rounded-lg">ยกเลิก</button>
                </div>
            </div>
        </div>
    );
}
 
export default PopUp;