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

    const onOrderStatusToggle = () => {
        setToggleCompletedOrders(toggleCompletedOrders === false)
    }

    const onTestDriveStatusToggle = () => {
        setToggleCompletedTestDrives(toggleCompletedTestDrives === false)
    }

    useEffect(() => {
        authFetch(`/api/employee_order_statistics`, {
            method: 'get'
        })
            .then(r => {
                if (r.ok)
                    return r.json()
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

        authFetch(`/api/employee_test_drive_statistics`, {
            method: 'get'
        })
            .then(r => {
                if (r.ok)
                    return r.json()
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

        authFetch(`/api/monthly_order_statistics`, {
            method: 'get'
        })
            .then(r => {
                if (r.ok)
                    return r.json()
                throw new Error(r.statusText)
            })
            .then(data => {
                    setMonthlyOrders(data);
            })
            .catch(reason => {
                console.log(reason)
            })

        authFetch(`/api/monthly_test_drive_statistics`, {
            method: 'get'
        })
            .then(r => {
                if (r.ok)
                    return r.json()
                throw new Error(r.statusText)
            })
            .then(data => {
                    setMonthlyTestDrives(data);
            })
            .catch(reason => {
                console.log(reason)
            })
        }, [])

    return(
        <div className='grid grid-cols-2 w-full'>
            <div className='grid grid-cols-1 justify-items-center'>
                <h1 className="font-bold text-2xl">Order Status per Employee</h1>
                <BarChart
                    dataset={employeeOrders}
                    yAxis={[{ scaleType: 'band', dataKey: 'email'}]}
                    grid={{ vertical: true }}
                    series={orderStatuses.filter((status) => status.dataKey !== 'Completed' || toggleCompletedOrders)}
                    layout="horizontal"
                    height={employeeOrders.length * 100}
                    colors={cheerfulFiestaPalette}
                    margin={{left: 170}}
                    barLabel="value"
                />
                <Button onClick={onOrderStatusToggle}>Toggle Completed Orders</Button>

                <h1 className="font-bold text-2xl mt-8">Test Drive Status per Employee</h1>
                <BarChart
                    dataset={employeeTestDrives}
                    yAxis={[{ scaleType: 'band', dataKey: 'email'}]}
                    grid={{ vertical: true }}
                    series={testDriveStatuses.filter((status) => status.dataKey !== 'Completed' || toggleCompletedTestDrives)}
                    layout="horizontal"
                    height={employeeTestDrives.length * 100}
                    colors={cheerfulFiestaPalette}
                    margin={{left: 170}}
                    barLabel="value"
                />
                <Button onClick={onTestDriveStatusToggle}>Toggle Completed Test Drives</Button>
            </div>
            <div className='grid grid-cols-1 justify-items-center'>
                <h1 className="font-bold text-2xl">Historical Orders per Employee</h1>
                <BarChart
                    dataset={monthlyOrders}
                    series={[{dataKey: 'count'}]}
                    grid={{ vertical: true }}
                    xAxis={[{scaleType: 'band', dataKey: 'period'}]}
                    layout="vertical"
                    height={employeeOrders.length * 100}
                    colors={cheerfulFiestaPalette}
                    barLabel="value"
                />

                <h1 className="font-bold text-2xl mt-8">Historical Test Drives per Employee</h1>
                <BarChart
                    dataset={monthlyTestDrives}
                    series={[{dataKey: 'count'}]}
                    grid={{ vertical: true }}
                    xAxis={[{scaleType: 'band', dataKey: 'period'}]}
                    layout="vertical"
                    height={employeeOrders.length * 100}
                    colors={cheerfulFiestaPalette}
                    barLabel="value"
                />
            </div>
        </div>
    )
}
