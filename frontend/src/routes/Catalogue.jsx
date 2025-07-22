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
        <div className="w-full px-8 py-10">
            <h1 className="text-3xl font-bold text-center mb-10">Catalogue</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cars.map(car => (
                    <Card
                        key={car.id}
                        img={car.base_image_path}
                        name={car.name}
                        price={car.base_price}
                    />
                ))}
            </div>
        </div>
    )
}
