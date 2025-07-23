import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {authFetch} from "../../../../auth.jsx";
import Card from "./EmployeeTestDriveListItem.jsx";

export default function EmployeeTestDriveList() {
    const [testDrives, setTestDrives] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        authFetch(`/api/employee/test_drives`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => setTestDrives(data.test_drives))
            .catch(reason => {
                console.error(reason)
                navigate("/employee_tasks")
            })
    }, []);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Assigned Test Drives</h2>
            {testDrives.length === 0 ? (
                <p className="text-center text-gray-500">No assigned test drives.</p>
            ) : (
                <ul className="space-y-4">
                    {testDrives.map(item => (
                        <Card
                            key={item.id}
                            id={item.id}
                            car_img={item.car.base_image_path}
                            car_name={item.car.name}
                            status={item.status.name}
                            created_on={item.created_on}
                            order_placer={item.user.email}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}
