import {useEffect, useState} from "react";
import {authFetch} from "../../../auth.jsx";
import {useNavigate, useParams} from "react-router-dom";

export default function UserOrderDetails() {
    const navigate = useNavigate()
    const { id } = useParams();

    const [response, setResponse] = useState({})

    useEffect(() => {
        authFetch(`/api/order/${id}`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => setResponse(data))
            .catch(reason => {
                    console.log(reason)
                    navigate('/orders')
            })
    }, []);

    const car = response?.car
    const colour = response?.colour
    const interior = response?.interior
    const salesRep = response?.sales_rep
    const status = response?.status

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className="w-full md:w-1/2">
                <img
                    className="w-full h-auto rounded-xl shadow-md object-cover"
                    src={`/img/${car?.base_image_path}`}
                    alt={`Picture of ${car?.name}`}
                />
            </div>

            <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{car?.name}</h2>

                <div className="text-gray-700 space-y-1">
                    <p><span className="font-semibold">Price:</span> ${response?.price}</p>
                    <p><span className="font-semibold">Configuration:</span> {colour?.colour}, {interior?.interior}</p>
                    <p><span className="font-semibold">Status:</span> {status?.name}</p>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Sales Representative</h3>
                    <p>{salesRep?.first_name} {salesRep?.last_name}</p>
                    <div className="flex gap-4 mt-2">
                        <a
                            href={`mailto:${salesRep?.email}`}
                            className="text-indigo-600 hover:underline"
                        >
                            Email
                        </a>
                        <a
                            href={`tel:${salesRep?.phone}`}
                            className="text-indigo-600 hover:underline"
                        >
                            Call
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
