import {useState} from "react";
import {login} from "../auth"
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [usernameInput, setUsernameInput] = useState(false)
    const [passwordInput, setPasswordInput] = useState(false)

    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const onSubmitClick = (e) => {
        e.preventDefault()

        fetch(`/api/login?username=${username}&password=${password}`, {
            method: 'get'
        })
            .then(r => r.json())
            .then(token => {
                    if (token.access_token) {
                        login(token.access_token)
                        navigate('/')
                    } else {
                        setMessage(token.message)
                    }
                }
            )
    }
    const handleUsernameChange = (e) => {
        if (e.target.value === '' || e.target.value === null)
            setUsernameInput(false)
        else
            setUsernameInput(true)
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        if (e.target.value.length < 6)
            setPasswordInput(false)
        else
            setPasswordInput(true)
        setPassword(e.target.value)
    }


    const button = !(usernameInput && passwordInput)
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-20 w-auto"
                         src={logo} alt="Atlas logo"/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in
                        to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#">
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input id="username" name="username" autoComplete="email" required inputMode="text"
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                       onChange={handleUsernameChange} value={username}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password"
                                       required
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                       onChange={handlePasswordChange} value={password}
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" onClick={onSubmitClick} disabled={button}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500 w-64">
                        Not a member?
                        <a href="/register"
                           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign Up Here</a>
                    </p>
                    <p className="mt-10 text-center text-sm text-red-500 w-64">{message}</p>
                </div>
            </div>
        </>
    )
}
