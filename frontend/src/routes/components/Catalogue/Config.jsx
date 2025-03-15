import {useEffect, useState} from "react";
import {authFetch, useAuth} from "../../../auth.jsx";
import {useNavigate} from "react-router-dom";

export default function Config(props) {
    const navigate = useNavigate()

    const [loggedIn] = useAuth()

    const [car, setCar] = useState({})
    const [carColours, setCarColours] = useState([])
    const [carInteriors, setCarInteriors] = useState([])

    const [selectedColour, setColour] = useState({price_increase: 0.})
    const [selectedInterior, setInterior] = useState({price_increase: 0.})

    useEffect(() => {
            fetch(`/api/cars/configs/${props.name}`, {
                method: 'get'
            })
                .then(r => r.json())
                .then(data => {
                    setCar(data.car);
                    setCarColours(data.colours);
                    setCarInteriors(data.interiors);

                    setColour(data.colours.find(item => item.is_base === true))
                    setInterior(data.interiors.find(item => item.is_base === true))
                })
        }, [props.name]);

    const handleSubmit = () => {
        const body = {
            car_id: car.id,
            colour_id: selectedColour.id,
            interior_id: selectedInterior.id
        }

        if(loggedIn === false) {
            navigate('/login')
        }

        authFetch(`/api/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(r => {
                    if (r.ok) {
                        navigate('/') // TODO: Redirect to orders screen
                    }
                }
            )
            .catch(r => {
                r.json().then((json) => {
                    console.log(`${json.message}... Redirecting`) // TODO: Add Error Message
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000)
                    }
                )
            })
    }

    return(
        <div className='flex-row flex flex-nowrap'>
            <form className='p-2 flex flex-col'>
                <p>{car.name === undefined ? car.name : ""}</p>
                <p>Available Colours:</p>
                <ul>
                    {carColours.map((colour, index) => (
                        <li key={colour.colour}>
                            <input defaultChecked={colour.is_base} id="colour" type="radio" name="colour" value={colour.colour} onClick={() => {
                                setColour(colour)
                            }}/>
                            <label>{colour.colour}</label>
                        </li>
                    ))}
                </ul>
                <br/>
                <p>Available Interiors:</p>
                <ul>
                    {carInteriors.map((interior, index) => (
                        <li key={interior.interior}>
                            <input defaultChecked={interior.is_base} id="interior" type="radio" name="interior" value={interior.interior} onClick={() => {
                                setInterior(interior)
                            }}/>
                            <label>{interior.interior}</label>
                        </li>
                    ))}
                </ul>
                <p>{car.base_price === undefined ? "" : car.base_price + selectedColour.price_increase + selectedInterior.price_increase}</p>
                <button type="button" onClick={handleSubmit}>Submit Order</button>
            </form>
            <div className=''>
                <img className="w-full rounded-lg" src={'/img/' + car.base_image_path} alt="Picture of a car"/>
            </div>
        </div>
    )
}