import {useNavigate} from "react-router-dom";

export default function Card(props) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/catalogue/' + props.name)
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-full h-full">
            <button onClick={handleClick} type={"button"} className="w-full overflow-hidden shadow-lg h-full">
                <img className="w-full" src={'/img/' + props.img} alt="Picture of a car"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{props.name}</div>
                    <p className="text-gray-700 text-base">
                        {props.price}
                    </p>
                </div>
            </button>
        </div>
    )
}