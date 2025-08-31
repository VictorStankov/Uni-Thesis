import {useNavigate} from "react-router-dom";
import Slider from "react-slick";
import {useEffect, useState} from "react";
import Card from "./components/Catalogue/Card.jsx";

export default function Home() {
    const navigate = useNavigate()
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

    const navigate_to_assistant = () => {
        navigate('/assistant')
    }
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
    };


    return (

        <div className='flex-col flex items-center'>
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <div className='h-[32rem] w-full bg-cover bg-center flex items-center justify-center'
                 style={{backgroundImage: "url('/img/img.png'"}}>
                <button onClick={navigate_to_assistant} className='bg-white/60 border-black border-2
                 rounded-2xl w-[14rem] h-[4rem] text-3xl cursor-pointer' type='submit'>AI Car Finder
                </button>
            </div>
            <div className='w-32/36 h-40 p-4'>

                <Slider {...settings}>
                    {cars.map(car => (
                        <div key={car.id} className='p-4'>
                            <Card
                                key={car.id}
                                img={car.base_image_path}
                                name={car.name}
                                price={car.base_price}
                            />

                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
