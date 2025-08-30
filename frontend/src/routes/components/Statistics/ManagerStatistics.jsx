import {authFetch} from "../../../auth.jsx";
import {useEffect, useState} from "react";
import {BarChart, cheerfulFiestaPalette} from "@mui/x-charts";
import {Button} from "@mui/material";

export default function ManagerStatistics() {
    const [employeeOrders, setEmployeeOrders] = useState([])
    const [orderStatuses, setOrderStatuses] = useState([{dataKey: 'temp'}])

    const [employeeTestDrives, setEmployeeTestDrives] = useState([])
    const [testDriveStatuses, setTestDrivesStatuses] = useState([{dataKey: 'temp'}])

    const [monthlyOrders, setMonthlyOrders] = useState([{dataKey: 'temp'}])
    const [monthlyTestDrives, setMonthlyTestDrives] = useState([{dataKey: 'temp'}])

    const [toggleCompletedOrders, setToggleCompletedOrders] = useState(true)
    const [toggleCompletedTestDrives, setToggleCompletedTestDrives] = useState(true)

    useEffect(() => {
        authFetch(`/api/employee_order_statistics`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => {
                setEmployeeOrders(data.data);
                setOrderStatuses(
                    data.order_statuses?.map(status => ({
                        dataKey: status,
                        label: status,
                        stack: 'stack',
                        stackOrder: 'reverse'
                    }))
                );
            })
            .catch(reason => {
                console.log(reason)
            })

        authFetch(`/api/employee_test_drive_statistics`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => {
                setEmployeeTestDrives(data.data);
                setTestDrivesStatuses(
                    data.test_drive_statuses?.map(status => ({
                        dataKey: status,
                        label: status,
                        stack: 'stack',
                        stackOrder: 'reverse'
                    }))
                );
            })
            .catch(reason => {
                console.log(reason)
            })

        authFetch(`/api/monthly_order_statistics`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => setMonthlyOrders(data))
            .catch(reason => {
                console.error(reason)
            })

        authFetch(`/api/monthly_test_drive_statistics`)
            .then(r => {
                if (r.ok) return r.json()
                throw new Error(r.statusText)
            })
            .then(data => setMonthlyTestDrives(data))
            .catch(reason => {
                console.error(reason)
            })
    }, [])

    return (
        <div className="mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6 justify-items-center">
                    <h2 className="text-xl font-semibold mb-4">Order Status per Employee</h2>
                    <BarChart
                        dataset={employeeOrders}
                        yAxis={[{scaleType: 'band', dataKey: 'email'}]}
                        grid={{vertical: true}}
                        series={orderStatuses.filter((status) => status.dataKey !== 'Completed' || toggleCompletedOrders)}
                        layout="horizontal"
                        height={employeeOrders.length * 100}
                        colors={cheerfulFiestaPalette}
                        margin={{left: 170}}
                        barLabel="value"
                    />
                    <div className="mt-4 flex justify-center">
                        <Button onClick={() => setToggleCompletedOrders(prev => !prev)}>
                            Toggle Completed Orders
                        </Button>
                    </div>
                </div>


                <div className="bg-white rounded-xl shadow-sm p-6 justify-items-center">
                    <h2 className="text-xl font-semibold mb-4">Historical Orders per Month</h2>
                    <BarChart
                        dataset={monthlyOrders}
                        series={orderStatuses}
                        grid={{vertical: true}}
                        xAxis={[{scaleType: 'band', dataKey: 'period'}]}
                        layout="vertical"
                        height={employeeOrders.length * 100}
                        colors={cheerfulFiestaPalette}
                        barLabel="value"
                    />
                </div>
            </div>

            <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6 justify-items-center">
                    <h2 className="text-xl font-semibold mb-4">Test Drive Status per Employee</h2>
                    <BarChart
                        dataset={employeeTestDrives}
                        yAxis={[{scaleType: 'band', dataKey: 'email'}]}
                        grid={{vertical: true}}
                        series={testDriveStatuses.filter((status) => status.dataKey !== 'Completed' || toggleCompletedTestDrives)}
                        layout="horizontal"
                        height={employeeTestDrives.length * 100}
                        colors={cheerfulFiestaPalette}
                        margin={{left: 170}}
                        barLabel="value"
                    />
                    <div className="mt-4 flex justify-center">
                        <Button onClick={() => setToggleCompletedTestDrives(prev => !prev)}>
                            Toggle Completed Test Drives
                        </Button>
                    </div>

                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 justify-items-center">
                    <h2 className="text-xl font-semibold mb-4">Historical Test Drives per Month</h2>
                    <BarChart
                        dataset={monthlyTestDrives}
                        series={testDriveStatuses}
                        grid={{vertical: true}}
                        xAxis={[{scaleType: 'band', dataKey: 'period'}]}
                        layout="vertical"
                        height={employeeTestDrives.length * 100}
                        colors={cheerfulFiestaPalette}
                        barLabel="value"
                    />
                </div>
            </div>
        </div>
    );
}
