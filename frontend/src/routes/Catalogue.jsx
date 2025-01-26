import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Card from "./components/Catalogue/Card.jsx"
import Config from "./components/Catalogue/Config.jsx";

export default function Catalogue() {
    const {itemName} = useParams()

    return (
        itemName === undefined ? <Gallery/> : <Config name={itemName}/>
    )
}

function Gallery() {
    const [cars, setCars] = useState([])

    useEffect(() => {
            fetch(`/api/cars/list`, {
                method: 'get'
            })
                .then(r => r.json())
                .then(data => {
                    setCars(data.cars);
                })
        }, []);

    return (
        <div className='flex-col w-full'>
            <h1 className='font-bold place-self-center text-2xl'>Catalogue</h1>
            <div className='mt-16'>
                <ul className='grid grid-flow-col justify-stretch items-stretch justify-items-center'>
                    {cars.map((item, index) => (
                        <Card className='w-full' key={item.id} img={item.base_image_path} name={item.name} price={item.base_price}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}