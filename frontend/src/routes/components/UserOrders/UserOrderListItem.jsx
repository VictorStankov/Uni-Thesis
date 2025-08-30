import {useNavigate} from "react-router-dom";

export default function UserOrderListItem({ id, car_img, car_name, status, price }) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/order/' + id)
    }

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer bg-white rounded-xl shadow-xs hover:shadow-md transition-shadow duration-200 w-full"
        >
            <div className="flex items-center gap-4 p-4">
                <img
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border"
                    src={`/img/${car_img}`}
                    alt={`Picture of ${car_name}`}
                />
                <div className="flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{car_name}</h3>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">Status:</span> {status}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">Price:</span> ${price}
                    </p>
                </div>
            </div>
        </div>
    )
}
