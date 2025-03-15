import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {authFetch} from "../auth.jsx";
import Card from "./components/UserOrders/OrderListItem.jsx"
import OrderDetails from "./components/UserOrders/OrderDetails.jsx"

export default function OrdersList() {
    const {id} = useParams()

    return (
        id === undefined ? <List/> : <OrderDetails id={id}/>
    )
}

function List() {
    const [orders, setOrders] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
            authFetch(`/api/orders`, {
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
                        <Card className='flex-grow' key={item.id} id={item.id} car_img={item.car.base_image_path} car_name={item.car.name} price={item.car.base_price} status={item.status.name} created_on={item.created_on}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}