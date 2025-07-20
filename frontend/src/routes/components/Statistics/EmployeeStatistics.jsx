import {PieChart} from '@mui/x-charts/PieChart';
import {authFetch} from "../../../auth.jsx";
import {useEffect, useState} from "react";

export default function EmployeeStatistics() {
    const [orders, setOrders] = useState([])
    const [testDrives, setTestDrives] = useState([])

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
                setOrders(data)
            })
            .catch(reason => {
                console.log(reason)
            })

        authFetch(`/api/me/test_drive_statistics`, {
            method: 'get'
        })
            .then(r => {
                if (r.ok)
                    return r.json()
                throw new Error(r.statusText)
            })
            .then(data => {
                setTestDrives(data)
            })
            .catch(reason => {
                console.log(reason)
            })
    }, []);

    return (
        <div className='grid grid-cols-2 w-full'>
            <div className='grid grid-cols-1 justify-items-center'>
                <h1 className="font-bold text-2xl">Assigned Orders Statuses</h1>
                <PieChart
                    series={[{
                        data: orders,
                        highlightScope: {fade: 'global', highlight: 'item'},
                        faded: {innerRadius: 15, additionalRadius: -15},
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 35,
                        arcLabelRadius: '60%',
                    }]}
                    width={400}
                    height={200}
                />
            </div>
            <div className='grid grid-cols-1 justify-items-center'>
                <h1 className="font-bold text-2xl">Assigned Test Drives Statuses</h1>
                <PieChart
                    series={[{
                        data: testDrives,
                        highlightScope: {fade: 'global', highlight: 'item'},
                        faded: {innerRadius: 15, additionalRadius: -15},
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 35,
                        arcLabelRadius: '60%',
                    }]}
                    width={400}
                    height={200}
                />
            </div>
        </div>
    )
}
