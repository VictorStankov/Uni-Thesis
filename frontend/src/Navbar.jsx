import {Link, Outlet, useNavigate} from "react-router-dom";
import {logout, useAuth} from "./auth.jsx";

export default function Navbar() {
    const navigate = useNavigate();
    const [loggedIn] = useAuth();
    const is_employee = localStorage.getItem('is_employee') === 'true';
    const is_manager = localStorage.getItem('is_manager') === 'true';

    const logoutAndRedirect = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md rounded-md mx-4 mt-4 p-4">
                <ul className="flex items-center justify-between">
                    <div className="flex space-x-6">
                        <li>
                            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
                        </li>
                        <li>
                            <Link to="/catalogue" className="text-gray-700 hover:text-indigo-600 font-medium">Catalogue</Link>
                        </li>
                        <li>
                            <Link to="/assistant" className="text-gray-700 hover:text-indigo-600 font-medium">Assistant</Link>
                        </li>
                    </div>

                    <div className="flex items-center space-x-4">
                        {loggedIn && !is_manager && (
                            is_employee ? (
                                <li>
                                    <Link to="/employee_tasks" className="text-gray-700 hover:text-indigo-600 font-medium">Assigned Tasks</Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/orders" className="text-gray-700 hover:text-indigo-600 font-medium">Orders</Link>
                                </li>
                            )
                        )}
                        {loggedIn && is_employee && (
                            <li>
                                <Link to="/statistics" className="text-gray-700 hover:text-indigo-600 font-medium">Statistics</Link>
                            </li>
                        )}
                        {loggedIn ? (
                            <button
                                onClick={logoutAndRedirect}
                                className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                            >
                                Log Out
                            </button>
                        ) : (
                            <li>
                                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">Log In</Link>
                            </li>
                        )}
                    </div>
                </ul>
            </nav>

            <div className="mt-6">
                <Outlet />
            </div>
        </div>
    );
}
