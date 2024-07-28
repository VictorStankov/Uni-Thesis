import { Routes, Route, Outlet, Link } from "react-router-dom";
import {useAuth, logout} from './auth.jsx'
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx"
import Catalogue from "./routes/Catalogue.jsx";

export default function App() {
  return (
    <Routes>
        <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/catalogue" element={<Catalogue/>} />
            <Route path="*" element={<Home />} />
        </Route>
    </Routes>
  );
}

function Layout() {
    const [loggedIn] = useAuth();

    return (
        <div className="flex flex-col justify-start">
            <nav>
                <ul className="flex flex-row px-6">
                    <li className="px-2">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-2">
                        <Link to="/catalogue">Catalogue</Link>
                    </li>
                    {
                        loggedIn ?
                            <button onClick={() => logout()}>Log Out</button> :
                            <li className="px-2">
                                <Link to="/login">Login</Link>
                            </li>
                    }
                </ul>
            </nav>
            <div className="flex flex-row justify-center">
                <Outlet />
            </div>
        </div>
    )
}
