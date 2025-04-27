import { PieChart } from '@mui/x-charts/PieChart';
import {authFetch} from "../../../auth.jsx";
import {useEffect, useState} from "react";

export default function EmployeeStatistics() {
    const [response, setResponse] = useState([])

    useEffect(() => {
        authFetch(`/api/me/order_statistics`, {
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
            })
        }, []);

    return(
        <PieChart
            series={[{
                data: response,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 15, additionalRadius: -15},
                arcLabel: (item) => `${item.value}`,
                arcLabelMinAngle: 35,
                arcLabelRadius: '60%',
            }]}
            width={400}
            height={200}

        />
    )
}