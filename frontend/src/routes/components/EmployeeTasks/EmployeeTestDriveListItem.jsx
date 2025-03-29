import {useNavigate} from "react-router-dom";

export default function EmployeeTestDriveListItem(props) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/test_drive/' + props.id)
    }

    return (
        <div className="px-4 sm rounded overflow-hidden shadow-lg w-full h-full">
            <button onClick={handleClick} type={"button"} className="w-full overflow-hidden shadow-lg">
                <div className='flex flex-row'>
                    <div>
                        <img className="w-32 px-4 py-4" src={'/img/' + props.car_img} alt="Picture of a car"/>
                    </div>
                    <div className="px-6 py-4">
                        <p className="text-gray-700 text-base">
                            {props.car_name}
                        </p>
                        <p className="text-gray-700 text-base">
                            {props.status}
                        </p>
                        <p className="text-gray-700 text-base">
                            {props.created_on}
                        </p>
                        <p className="text-gray-700 text-base">
                            {props.order_placer}
                        </p>
                    </div>
                </div>
            </button>
        </div>
    )
}