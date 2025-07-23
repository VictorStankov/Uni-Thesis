import {PieChart} from '@mui/x-charts/PieChart';
import {authFetch} from "../../../auth.jsx";
import {useEffect, useState} from "react";

export default function EmployeeStatistics() {
    const [orders, setOrders] = useState([])
    const [testDrives, setTestDrives] = useState([])

    useEffect(() => {
        authFetch(`/api/me/order_statistics`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => setOrders(data))
            .catch(reason => {
                console.error(reason)
            })

        authFetch(`/api/me/test_drive_statistics`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => setTestDrives(data))
            .catch(reason => {
                console.error(reason)
            })
    }, []);

  return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6 text-center">
                <h2 className="text-xl font-semibold mb-4">Assigned Orders Statuses</h2>
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
                    height={250}
                />
            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">
                <h2 className="text-xl font-semibold mb-4">Assigned Test Drives Statuses</h2>
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
                    height={250}
                />
            </div>
        </div>
    );
}
