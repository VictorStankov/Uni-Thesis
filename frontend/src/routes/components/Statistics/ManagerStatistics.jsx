import {authFetch} from "../../../auth.jsx";
import {useEffect, useState} from "react";
import {BarChart, cheerfulFiestaPalette} from "@mui/x-charts";
import {Button} from "@mui/material";

export default function ManagerStatistics() {
    const [employeeData, setEmployeeData] = useState([])
    const [statuses, setStatuses] = useState([{dataKey: 'temp'}])
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
        }, []);

    return(
        <div className='w-full'>
            <Button onClick={onClickToggle}>Toggle Completed Orders</Button>
            <BarChart
                dataset={employeeData}
                yAxis={[{ scaleType: 'band', dataKey: 'email' }]}
                grid={{ vertical: true }}
                series={statuses.filter((status) => status.dataKey !== 'Completed' || toggleCompleted)}
                width={600}
                height={400}
                layout="horizontal"
                colors={cheerfulFiestaPalette}
            />
        </div>
    )
}