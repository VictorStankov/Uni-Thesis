import {useNavigate} from "react-router-dom";

export default function Card({ img, name, price }) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/catalogue/' + name)
    }

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 w-full h-full"
        >
            <img
                className="w-full h-48 object-cover rounded-t-2xl"
                src={`/img/${img}`}
                alt={`Picture of ${name}`}
            />
            <div className="px-4 py-3">
                <h2 className="font-semibold text-lg">{name}</h2>
                <p className="text-gray-600 mt-1">${price}</p>
            </div>
        </div>
    )
}
