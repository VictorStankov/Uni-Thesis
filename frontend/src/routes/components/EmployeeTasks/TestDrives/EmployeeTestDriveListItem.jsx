import {useNavigate} from "react-router-dom";

export default function EmployeeTestDriveListItem({ id, car_img, car_name, status, created_on, order_placer }) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/employee_test_drive/' + id);
    }

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer bg-gray-100 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 w-full"
        >
            <div className="flex items-center gap-4 p-4">
                <img
                    className="w-28 h-28 object-cover rounded-lg border border-gray-300"
                    src={`/img/${car_img}`}
                    alt={`Car: ${car_name}`}
                />
                <div className="flex flex-col text-sm text-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{car_name}</h3>
                    <p><span className="font-medium text-gray-600">Status:</span> {status}</p>
                    <p><span className="font-medium text-gray-600">Scheduled:</span> {created_on}</p>
                    <p><span className="font-medium text-gray-600">User:</span> {order_placer}</p>
                </div>
            </div>
        </div>
    )
}
