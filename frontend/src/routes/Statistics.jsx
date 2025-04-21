import EmployeeStatistics from "./components/Statistics/EmployeeStatistics.jsx";
import ManagerStatistics from "./components/Statistics/ManagerStatistics.jsx";

export default function Statistics() {
    const is_manager = localStorage.getItem('is_manager') === 'true'

    return is_manager ? <ManagerStatistics/> : <EmployeeStatistics/>
}
