import EmployeeOrderList from "./components/EmployeeTasks/Orders/EmployeeOrderList.jsx";
import EmployeeTestDriveList from "./components/EmployeeTasks/TestDrives/EmployeeTestDriveList.jsx";

export default function EmployeeTasksList() {

    return (
        <div className='flex flex-col justify-center'>
            <h1 className='text-center font-bold text-2xl'>Assigned Tasks</h1>
            <div className='grid grid-cols-2'>
                <EmployeeOrderList/>
                <EmployeeTestDriveList/>
            </div>
        </div>
    )
}
