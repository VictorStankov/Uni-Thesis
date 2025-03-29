import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {authFetch} from "../../../auth.jsx";
import Card from "./OrderListItem.jsx";

export default function EmployeeOrdersList() {
    const [orders, setOrders] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
            authFetch(`/api/employee/orders`, {
                method: 'get'
            })
                .then(r => {
                    if (r.ok)
                        return r.json()
                    throw new Error(r.statusText)
                })
                .then(data => {
                    setOrders(data.orders);
                })
                .catch(reason => {
                    console.log(reason)
                    navigate('/')
                })
        }, []);

    return (
        <div className='flex-col flex-grow'>
            <h1 className='font-bold place-self-center text-2xl'>Assigned Orders</h1>
            <div className='mt-16 flex-grow'>
                <ul className='flex-col items-center flex-grow'>
                    {orders.map((item, index) => (
                        <Card className='flex-grow' key={item.id} id={item.id} car_img={item.car.base_image_path} car_name={item.car.name} price={item.car.base_price} status={item.status.name} created_on={item.created_on} order_placer={item.user.email}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}