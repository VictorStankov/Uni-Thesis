import {Link, Outlet, useNavigate} from "react-router-dom";
import {logout, useAuth} from "./auth.jsx";

export default function Navbar() {
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
                            loggedIn && is_employee ?
                                    <li className="px-2">
                                        <Link to="/statistics">Statistics</Link>
                                    </li> :
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
