import {authFetch} from '../auth.jsx'
import {useState} from "react";

export default function Home() {
    const [message, setMessage] = useState({})

    const getBasicInfo = (e) => {
        e.preventDefault()

        authFetch('/api/test', {method: 'GET'}).then(
            response => {
                if (response.status === 401) {
                    setMessage({email: "Unauthorized"})
                    return null;
                }
                return response.json()
            })
            .then(
                data => {
                    if(data)
                        setMessage(data)
                }
            )
    }

    return (
        <div className='flex-col flex items-center'>
            <h1>HOME</h1>
            <button type='submit' onClick={getBasicInfo}>Get Info</button>
            <ul>
                <li>{message.email}</li>
                <li>{message.first_name}</li>
                <li>{message.last_name}</li>
                <li>{message.phone}</li>
            </ul>
        </div>
    )
}
