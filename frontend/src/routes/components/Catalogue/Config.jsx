import {useEffect, useState} from "react";
import {authFetch, useAuth} from "../../../auth.jsx";
import {useNavigate} from "react-router-dom";

export default function Config({ name }) {
    const navigate = useNavigate()

    const [loggedIn] = useAuth()

    const [car, setCar] = useState({})
    const [carColours, setCarColours] = useState([])
    const [carInteriors, setCarInteriors] = useState([])

    const [selectedColour, setColour] = useState({price_increase: 0.})
    const [selectedInterior, setInterior] = useState({price_increase: 0.})

    const [testDriveRequested, setTestDriveRequested] = useState(false)

    useEffect(() => {
        fetch(`/api/cars/configs/${name}`)
            .then(r => r.json())
            .then(data => {
                setCar(data.car);
                setCarColours(data.colours);
                setCarInteriors(data.interiors);

                setColour(data.colours.find(item => item.is_base))
                setInterior(data.interiors.find(item => item.is_base))
            })
    }, [name]);

    const handleOrderSubmit = () => {
        if (!loggedIn) return navigate('/login');

        const body = {
            car_id: car.id,
            colour_id: selectedColour.id,
            interior_id: selectedInterior.id
        }

        authFetch(`/api/orders`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then(r => {
                if (r.ok) navigate('/orders')
            })
            .catch(err => console.error(err));
    };

    const handleTestDriveSubmit = () => {
        if (!loggedIn) return navigate('/login');

        const body = {
            car_id: car.id
        }

        authFetch(`/api/test_drives`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then(r => {
                if (r.ok) setTestDriveRequested(true);
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8">
            <form className="flex flex-col gap-6 w-full md:w-1/2 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold">{car.name}</h2>

                <div>
                    <p className="font-semibold mb-1">Available Colours:</p>
                    <div className="flex flex-wrap gap-3">
                        {carColours.map(colour => (
                            <label key={colour.colour} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="colour"
                                    defaultChecked={colour.is_base}
                                    onChange={() => setColour(colour)}
                                />
                                {colour.colour}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-semibold mb-1">Available Interiors:</p>
                    <div className="flex flex-wrap gap-3">
                        {carInteriors.map(interior => (
                            <label key={interior.interior} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="interior"
                                    defaultChecked={interior.is_base}
                                    onChange={() => setInterior(interior)}
                                />
                                {interior.interior}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="text-xl font-semibold text-gray-800">
                    Total: ${car.base_price + selectedColour.price_increase + selectedInterior.price_increase}
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={handleOrderSubmit}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-sm transition"
                    >
                        Submit Order
                    </button>
                    <button
                        type="button"
                        onClick={handleTestDriveSubmit}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-sm transition"
                    >
                        Request Test Drive
                    </button>
                    {testDriveRequested && (
                        <p className="text-green-600 font-medium">Test drive requested successfully!</p>
                    )}
                </div>
            </form>

            <div className="w-full md:w-1/2 flex items-center justify-center">
                <img
                    className="w-full rounded-xl shadow-lg object-cover"
                    src={`/img/${car.base_image_path}`}
                    alt={`Picture of ${car.name}`}
                />
            </div>
        </div>
    )
}
