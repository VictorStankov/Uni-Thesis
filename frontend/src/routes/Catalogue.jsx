import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Catalogue() {
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

    console.log(cars)

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

function Card(props) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/' + props.name)
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <button onClick={handleClick} type={"button"} className="w-full overflow-hidden shadow-lg">
                <img className="w-full" src={'/img/' + props.img} alt="Picture of a car"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{props.name}</div>
                    <p className="text-gray-700 text-base">
                        {props.price}
                    </p>
                </div>
            </button>
        </div>
    )
}