import {useEffect, useState} from "react";
import {authFetch} from "../../../../auth.jsx";
import {useNavigate, useParams} from "react-router-dom";

export default function EmployeeOrderDetails() {
    const navigate = useNavigate()
    const { id } = useParams();

    const [response, setResponse] = useState({})

    useEffect(() => {
            authFetch(`/api/employee/order/${id}`)
                .then(r => {
                    if (r.ok) return r.json()
                    throw new Error(r.statusText)
                })
                .then(data => setResponse(data))
                .catch(reason => {
                    console.error(reason)
                    navigate('/employee_tasks')
                })
        }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img
                        src={`/img/${response?.car?.base_image_path}`}
                        alt="Car"
                        className="rounded-lg object-cover w-full max-h-80"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-3 text-gray-800">
                    <h2 className="text-2xl font-bold">{response?.car?.name}</h2>
                    <p><span className="font-semibold">Price:</span> ${response?.price}</p>
                    <p><span className="font-semibold">Specs:</span> {response?.colour?.colour} / {response?.interior?.interior}</p>
                    <p><span className="font-semibold">Status:</span> {response?.status?.name}</p>
                    <p><span className="font-semibold">User:</span> {response?.user?.first_name} {response?.user?.last_name}</p>
                    <div className="flex gap-4 mt-2">
                        <a className="text-indigo-600 hover:underline" href={`mailto:${response?.user?.email}`}>Email</a>
                        <a className="text-indigo-600 hover:underline" href={`tel:${response?.user?.phone}`}>Call</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
