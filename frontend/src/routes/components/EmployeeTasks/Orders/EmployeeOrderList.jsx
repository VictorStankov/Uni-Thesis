import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {authFetch} from "../../../../auth.jsx";
import Card from "./EmployeeOrderListItem.jsx";

export default function EmployeeOrderList() {
    const [orders, setOrders] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        authFetch(`/api/employee/orders`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => setOrders(data.orders))
            .catch(reason => {
                console.error(reason)
                navigate("/employee_tasks")
            })
    }, []);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Assigned Orders</h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No assigned orders.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map(item => (
                        <Card
                            key={item.id}
                            id={item.id}
                            car_img={item.car.base_image_path}
                            car_name={item.car.name}
                            price={item.car.base_price}
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
