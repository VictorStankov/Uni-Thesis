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
                        localStorage.setItem('is_employee', token.is_employee)
                        localStorage.setItem('is_manager', token.is_manager)
                        navigate(-1)
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
            <div className='p-10 flex-col justify-items-center w-1/4'>

                <div>
                    <img className='block mx-auto size-[11rem]'
                         src={logo} alt="Atlas logo" />
                    <h2 className='align-center text-lg font-bold md-10' >Sign in
                        to your account</h2>
                </div>

                <div className='mt-10 w-full'>
                    <form>
                        <div>
                            <label htmlFor="username">Username</label>
                            <div className="my-1">
                                <input id="username" name="username" required
                                       className='w-full p-2 border border-solid border-gray-300'
                                       onChange={handleUsernameChange} value={username} />
                            </div>

                        <div className="my-3">
                            <label htmlFor="password">Password</label>
                            <div className="my-1">
                                <input id="password" name="password" type="password" required
                                       className='w-full p-2 border border-solid border-gray-300'
                                       onChange={handlePasswordChange} value={password} />
                            </div>
                        </div>

                        <div className="mt-10">
                            <button type="submit" onClick={onSubmitClick} disabled={button}
                                    className='w-full p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer font-semibold'>
                                Sign in</button>
                        </div>
                        </div>
                    </form>

                    <p className='mt-4 text-center'>
                        <span>Not a member? </span>
                        <a href="/register" className='text-indigo-600 hover:text-indigo-500 font-semibold'>Sign Up Here</a>
                    </p>
                    <p className='mt-4 text-center text-red-500 text-wrap'>{message}</p>
                </div>
            </div>
        </>
    )
}
