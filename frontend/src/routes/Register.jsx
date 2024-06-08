import {useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg"


export default function Register() {
    const [message, setMessage] = useState('')
    const [pageStatus, setPageStatus] = useState(0)

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const pageStatusChange = (value) => {
        setPageStatus(value)
    }

    const onSubmitClick = (e) => {
        e.preventDefault()

        const body = {
            username: username,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone: phone
        }

        fetch(`/api/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(r => {
                    if (r.ok) {
                        navigate('/login')
                    }
                    return Promise.reject(r)
                }
            )
            .catch(r => {
                r.json().then((json) => {
                        setMessage(`${json.message}... Redirecting`)
                        setTimeout(() => {window.location.reload()}, 3000)
                    }
                )
            })
    }

    const InitialPage = () => {
        return (
            <>
                <form className="space-y-6" action="#">
                    <div>
                        <label htmlFor="username"
                               className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input id="username" name="username" autoComplete="username" required inputMode="text"
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   onChange={handleUsernameChange} value={username}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email"
                               className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input id="email" name="email" autoComplete="email" required inputMode="email"
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   onChange={handleEmailChange} value={email}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   onChange={handlePasswordChange} value={password}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">Confirm
                                Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="confirm_password" name="confirm_password" type="password"
                                   required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   onChange={handlePasswordConfirm} value={passwordConfirm}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="button" onClick={pageStatusChange} value={1}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            Up
                        </button>
                    </div>

                </form>

            </>
        )
    }

    const SecondaryPage = () => {
        return (
            <>
                <form className="space-y-6" action="#">
                    <div>
                        <label htmlFor="firstName"
                               className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                        <div className="mt-2">
                            <input id="firstName" name="firstName" autoComplete="given-name" required inputMode="text"
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   onChange={handleFirstNameChange} value={firstName}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastName"
                               className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                        <div className="mt-2">
                            <input id="lastName" name="lastName" autoComplete="family-name" required inputMode="text"
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   onChange={handleLastNameChange} value={lastName}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone"
                               className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                        <div className="mt-2">
                            <input id="phone" name="phone" autoComplete="mobile tel" required inputMode="tel"
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   onChange={handlePhoneChange} value={phone}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" onClick={onSubmitClick}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            Up
                        </button>
                    </div>

                </form>

            </>
        )
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-20 w-auto"
                         src={logo} alt="Atlas logo"/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign
                        Up</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {pageStatus === 0 ? InitialPage(handleUsernameChange, handlePasswordChange, handleEmailChange, pageStatusChange) : SecondaryPage()}
                </div>

                <p className="mt-10 text-center text-sm text-gray-500 w-64">
                    Already a member?
                    <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Log
                        in</a>
                </p>
                <p className="mt-10 text-center text-sm text-red-500 w-64">{message}</p>
            </div>
        </>
    )
}


function SecondaryPage() {

}