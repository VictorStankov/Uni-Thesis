import {useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg"


export default function Register() {
    const [message, setMessage] = useState('')
    const [pageStatus, setPageStatus] = useState(0)

    const successInput = 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5' // dark:bg-gray-700 dark:border-green-500  dark:text-green-400 dark:placeholder-green-500'
    const errorInput = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5' // dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 dark:bg-gray-700'
    const normalInput = 'bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5'

    const navigate = useNavigate()

    const [usernameInput, setUsernameInput] = useState(null)
    const [passwordInput, setPasswordInput] = useState(null)
    const [passwordConfirmInput, setPasswordConfirmInput] = useState(null)
    const [emailInput, setEmailInput] = useState(null)
    const [firstNameInput, setFirstNameInput] = useState(null)
    const [lastNameInput, setLastNameInput] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')

    const checkMainPageComplete = () => {
        return usernameInput && passwordConfirmInput && emailInput
    }

    const checkDetailsPageComplete = () => {
        return firstNameInput && lastNameInput
    }

    const handleUsernameChange = (e) => {
        if (e.target.value === '' || e.target.value === null)
            setUsernameInput(false)
        else
            setUsernameInput(true)
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        if (e.target.value.length < 6 || e.target.value !== passwordConfirm) {
            setPasswordInput(false)
            setPasswordConfirmInput(false)
        } else {
            setPasswordInput(true)
            setPasswordConfirmInput(true)
        }
        setPassword(e.target.value)
    }

    const handlePasswordConfirm = (e) => {
        if (e.target.value.length < 6 || e.target.value !== password) {
            setPasswordInput(false)
            setPasswordConfirmInput(false)
        } else {
            setPasswordInput(true)
            setPasswordConfirmInput(true)
        }
        setPasswordConfirm(e.target.value)
    }

    const handleEmailChange = (e) => {
        if (
            e.target.value === '' ||
            e.target.value === null ||
            !e.target.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        )
            setEmailInput(false)
        else
            setEmailInput(true)
        setEmail(e.target.value)
    }

    const handleFirstNameChange = (e) => {
        if (e.target.value === '' || e.target.value === null)
            setFirstNameInput(false)
        else
            setFirstNameInput(true)
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        if (e.target.value === '' || e.target.value === null)
            setLastNameInput(false)
        else
            setLastNameInput(true)
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
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000)
                    }
                )
            })
    }

    const InitialPage = () => {
        const button = !checkMainPageComplete()
        return (
            <>
                <form className="space-y-6" action="#">
                    <div>
                        <label htmlFor="username"
                               className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input id="username" name="username" autoComplete="username" required inputMode="text"
                                   className={usernameInput === null ? normalInput : usernameInput ? successInput : errorInput}
                                   onChange={handleUsernameChange} value={username}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email"
                               className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input id="email" name="email" autoComplete="email" required inputMode="email"
                                   className={emailInput === null ? normalInput : emailInput ? successInput : errorInput}
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
                                   className={passwordInput === null ? normalInput : passwordInput ? successInput : errorInput}
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
                                   className={passwordInput === null ? normalInput : passwordInput ? successInput : errorInput}
                                   onChange={handlePasswordConfirm} value={passwordConfirm}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="button" onClick={pageStatusChange} value={1} disabled={button}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            Up
                        </button>
                    </div>

                </form>

            </>
        )
    }

    const DetailsPage = () => {
        const button = !checkDetailsPageComplete()
        return (
            <>
                <form className="space-y-6" action="#">
                    <div>
                        <label htmlFor="firstName"
                               className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                        <div className="mt-2">
                            <input id="firstName" name="firstName" autoComplete="given-name" required inputMode="text"
                                   className={firstNameInput === null ? normalInput : firstNameInput ? successInput : errorInput}
                                   onChange={handleFirstNameChange} value={firstName}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastName"
                               className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                        <div className="mt-2">
                            <input id="lastName" name="lastName" autoComplete="family-name" required inputMode="text"
                                   className={lastNameInput === null ? normalInput : lastNameInput ? successInput : errorInput}
                                   onChange={handleLastNameChange} value={lastName}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone"
                               className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                        <div className="mt-2">
                            <input id="phone" name="phone" autoComplete="mobile tel" required inputMode="tel"
                                   className={normalInput}
                                   onChange={handlePhoneChange} value={phone}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" onClick={onSubmitClick}
                                disabled={button}
                                className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
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
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create
                        New Account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {pageStatus === 0 ? InitialPage() : DetailsPage()}
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
