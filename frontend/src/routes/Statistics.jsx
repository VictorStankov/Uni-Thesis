import EmployeeStatistics from "./components/Statistics/EmployeeStatistics.jsx";

export default function Statistics() {
    const is_manager = localStorage.getItem('is_manager') === 'true'

    return is_manager ? <EmployeeStatistics/> : <EmployeeStatistics/>
}
