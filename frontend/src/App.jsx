import {Route, Routes} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx"
import Catalogue from "./routes/Catalogue.jsx";
import OrdersList from "./routes/UserOrders.jsx";
import UserOrderDetails from "./routes/components/UserOrders/UserOrderDetails.jsx";
import EmployeeTasksList from "./routes/EmployeeTasks.jsx";
import EmployeeOrderDetails from "./routes/components/EmployeeTasks/Orders/EmployeeOrderDetails.jsx";
import EmployeeTestDriveDetails from "./routes/components/EmployeeTasks/TestDrives/EmployeeTestDriveDetails.jsx";
import Statistics from "./routes/Statistics.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<Navbar/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/catalogue" element={<Catalogue/>}/>
                <Route path="/catalogue/:itemName" element={<Catalogue/>}/>
                <Route path="/employee_tasks" element={<EmployeeTasksList/>}/>
                <Route path="/employee_order/:id" element={<EmployeeOrderDetails/>}/>
                <Route path="/employee_test_drive/:id" element={<EmployeeTestDriveDetails/>}/>
                <Route path="/orders" element={<OrdersList/>}/>
                <Route path="/order/:id" element={<UserOrderDetails/>}/>
                <Route path="/statistics" element={<Statistics/>}/>
                <Route path="*" element={<Home/>}/>
            </Route>
        </Routes>
    );
}
