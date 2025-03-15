import {useEffect, useState} from "react";
import {authFetch} from "../../../auth.jsx";
import {useNavigate} from "react-router-dom";

export default function OrderDetails(props) {
    const navigate = useNavigate()

    const [response, setResponse] = useState({})

    useEffect(() => {
            authFetch(`/api/order/${props.id}`, {
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
                    navigate('/orders')
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
                <p>{response?.sales_rep?.first_name} {response?.sales_rep?.last_name}</p>
                <div className='flex flex-row'>
                    <a className='px-2' href={'mailto:' + response?.sales_rep?.email}>Email</a>
                    <a className='px-2' href={'tel:' + response?.sales_rep?.phone}>Call</a>
                </div>
            </div>
        </div>
    )
}