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
            <h1>Catalogue</h1>
            <div className='flex-row flex-wrap w-full'>
                <ul className='flex-row'>
                    {cars.map((item, index) => (
                        <Card key={item.id} img={item.base_image_path} name={item.name} price={item.base_price}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}