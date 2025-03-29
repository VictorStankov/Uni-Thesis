import {useEffect, useState} from "react";
import {authFetch} from "../../../auth.jsx";
import {useNavigate, useParams} from "react-router-dom";

export default function EmployeeOrderDetails() {
    const navigate = useNavigate()
    const { id } = useParams();

    const [response, setResponse] = useState({})

    useEffect(() => {
            authFetch(`/api/employee/order/${id}`, {
                method: 'get'
            })
                .then(r => {
                    if (r.ok)
                        return r.json()
                    throw new Error(r.statusText)
                })
                .then(data => {
                    setResponse(data);
                })
                .catch(reason => {
                    console.log(reason)
                    navigate('/employee_orders')
                })
        }, []);

    console.log(response)

    return(
        <div className='flex-row flex flex-nowrap'>
            <div className=''>
                <img className="w-full rounded-lg" src={'/img/' + response?.car?.base_image_path} alt="Picture of a car"/>
            </div>
            <div className='flex flex-col'>
                <p>{response?.car?.name}</p>
                <p>{response?.price}</p>
                <p>{response?.colour?.colour} {response?.interior?.interior}</p>
                <p>{response?.status?.name}</p>
                <p>{response?.user?.first_name} {response?.user?.last_name}</p>
                <div className='flex flex-row'>
                    <a className='px-2' href={'mailto:' + response?.user?.email}>Email</a>
                    <a className='px-2' href={'tel:' + response?.user?.phone}>Call</a>
                </div>
            </div>
        </div>
    )
}