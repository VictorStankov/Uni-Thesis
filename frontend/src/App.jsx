import {Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import {logout, useAuth} from './auth.jsx'
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx"
import Catalogue from "./routes/Catalogue.jsx";
import EmployeeTasksList from "./routes/EmployeeTasks.jsx";
import OrdersList from "./routes/Orders.jsx";
import EmployeeOrderDetails from "./routes/components/EmployeeTasks/EmployeeOrderDetails.jsx";
import EmployeeTestDriveDetails from "./routes/components/EmployeeTasks/EmployeeTestDriveDetails.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/catalogue" element={<Catalogue/>}/>
                <Route path="/catalogue/:itemName" element={<Catalogue/>}/>
                <Route path="/employee_tasks" element={<EmployeeTasksList/>}/>
                <Route path="/employee_order/:id" element={<EmployeeOrderDetails/>}/>
                <Route path="/employee_test_drive/:id" element={<EmployeeTestDriveDetails/>}/>
                <Route path="/orders" element={<OrdersList/>}/>
                <Route path="/order/:id" element={<OrdersList/>}/>
                <Route path="*" element={<Home/>}/>
            </Route>
        </Routes>
    );
}

function Layout() {
    const navigate = useNavigate();
    const [loggedIn] = useAuth();
    const is_employee = localStorage.getItem('is_employee') === 'true'

    return (
        <div className="flex flex-col justify-start">
            <nav>
                <ul className="flex flex-auto px-6">
                    <div className="flex flex-row w-full">
                        <li className="px-2">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="px-2">
                            <Link to="/catalogue">Catalogue</Link>
                        </li>

                    </div>
                    <div className="flex flex-row w-full justify-end">
                        {
                            loggedIn ?
                                is_employee ?
                                    <li className="px-2">
                                        <Link to="/employee_tasks">Assigned Tasks</Link>
                                    </li> :
                                    <li className="px-2">
                                        <Link to="/orders">Orders</Link>
                                    </li>
                                :
                                null
                        }
                        {
                            loggedIn ?
                                <button className="px-2" onClick={() => {
                                    logout();
                                    navigate('/')
                                }}>Log Out</button> :
                                <li className="px-2">
                                    <Link to="/login">Login</Link>
                                </li>
                        }
                    </div>

                </ul>
            </nav>
            <div className="flex flex-row justify-center">
                <Outlet/>
            </div>
        </div>
    )
}
