import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {authFetch} from "../auth.jsx";
import Card from "./components/UserOrders/UserOrderListItem.jsx"

export default function OrdersList() {
    const [orders, setOrders] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        authFetch(`/api/orders`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => setOrders(data.orders))
            .catch(err => {
                console.error(err)
                navigate('/')
            })
    }, []);

    return (
        <div className="px-6 py-10 max-w-5xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-center mb-10">Your Orders</h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">You have no orders yet.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((item) => (
                        <Card
                            key={item.id}
                            id={item.id}
                            car_img={item.car.base_image_path}
                            car_name={item.car.name}
                            price={item.car.base_price}
                            status={item.status.name}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}
