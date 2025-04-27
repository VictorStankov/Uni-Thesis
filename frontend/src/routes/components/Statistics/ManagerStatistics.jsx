import {authFetch} from "../../../auth.jsx";
import {useEffect, useState} from "react";
import {BarChart, cheerfulFiestaPalette, ResponsiveChartContainer} from "@mui/x-charts";
import {Button} from "@mui/material";

export default function ManagerStatistics() {
    const [employeeData, setEmployeeData] = useState([])
    const [statuses, setStatuses] = useState([{dataKey: 'temp'}])
    const [monthlyOrders, setMonthlyOrders] = useState([{dataKey: 'temp'}])
    const [toggleCompleted, setToggleCompleted] = useState(true)

    const onClickToggle = () => {
        setToggleCompleted(toggleCompleted === false)
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
                setEmployeeData(data.data);
                setStatuses(
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
        }, []);

    return(
        <div className='grid grid-cols-2 w-full'>
            <div className='grid grid-cols-1 justify-center'>
                <BarChart
                    dataset={employeeData}
                    yAxis={[{ scaleType: 'band', dataKey: 'email'}]}
                    grid={{ vertical: true }}
                    series={statuses.filter((status) => status.dataKey !== 'Completed' || toggleCompleted)}
                    layout="horizontal"
                    height={employeeData.length * 100}
                    colors={cheerfulFiestaPalette}
                    margin={{left: 170}}
                />
                <Button onClick={onClickToggle}>Toggle Completed Orders</Button>
            </div>
            <div>
                <BarChart
                    dataset={monthlyOrders}
                    series={[{dataKey: 'count'}]}
                    grid={{ vertical: true }}
                    xAxis={[{scaleType: 'band', dataKey: 'period'}]}
                    layout="vertical"
                    height={employeeData.length * 100}
                    colors={cheerfulFiestaPalette}
                    // margin={{top: 0}}
                />
            </div>
        </div>
    )
}