import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()

    const navigate_to_assistant = () => {
        navigate('/assistant')
    }

    return (
        <div className='flex-col flex items-center'>
            <div className='h-[32rem] w-screen bg-cover bg-center flex items-center justify-center'
                 style={{ backgroundImage: "url('/img/img.png'"}}>
                <button onClick={navigate_to_assistant} className='bg-white/60 border-black border-2
                 rounded-2xl w-[14rem] h-[4rem] text-3xl cursor-pointer' type='submit'>AI Car Finder</button>
            </div>
        </div>
    )
}
