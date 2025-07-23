import EmployeeOrderList from "./components/EmployeeTasks/Orders/EmployeeOrderList.jsx";
import EmployeeTestDriveList from "./components/EmployeeTasks/TestDrives/EmployeeTestDriveList.jsx";

export default function EmployeeTasksList() {
    return (
        <div className="px-6 py-10 max-w-6xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-center mb-10">Assigned Tasks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EmployeeOrderList/>
                <EmployeeTestDriveList/>
            </div>
        </div>
    )
}
