import {useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg"


export default function Register() {
    const [message, setMessage] = useState('')
    const [pageStatus, setPageStatus] = useState(0)

    const successInput = 'w-full p-2 border border-solid border-gray-300 bg-green-50'
    const errorInput = 'w-full p-2 border border-solid border-gray-300 bg-red-50'
    const normalInput = 'w-full p-2 border border-solid border-gray-300'

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
                        navigate(-1)
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
                <form action="#">
                    <div>
                        <label htmlFor="username">Username</label>
                        <div className="my-1">
                            <input id="username" name="username" autoComplete="username" required inputMode="text"
                                   className={usernameInput === null ? normalInput : usernameInput ? successInput : errorInput}
                                   onChange={handleUsernameChange} value={username}
                            />
                        </div>
                    </div>

                    <div className="my-3">
                    <label htmlFor="email">Email</label>
                        <div className="my-1">
                            <input id="email" name="email" autoComplete="email" required inputMode="email"
                                   className={emailInput === null ? normalInput : emailInput ? successInput : errorInput}
                                   onChange={handleEmailChange} value={email}
                            />
                        </div>
                    </div>

                    <div className="my-3">
                        <label htmlFor="password">Password</label>
                        <div className="my-1">
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required
                                   className={passwordInput === null ? normalInput : passwordInput ? successInput : errorInput}
                                   onChange={handlePasswordChange} value={password}
                            />
                        </div>
                    </div>

                    <div className="my-3">
                        <label htmlFor="password">Confirm Password</label>
                        <div className="my-1">
                            <input id="confirm_password" name="confirm_password" type="password"
                                   required
                                   className={passwordInput === null ? normalInput : passwordInput ? successInput : errorInput}
                                   onChange={handlePasswordConfirm} value={passwordConfirm}
                            />
                        </div>
                    </div>

                    <div className="mt-10">
                        <button type="button" onClick={pageStatusChange} value={1} disabled={button}
                                className="w-full p-2.5 cursor-pointer bg-indigo-600 text-white font-semibold hover:bg-indigo-500">
                            Sign Up
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
                <form>
                    <div className="my-3">
                        <label htmlFor="firstName">First Name</label>
                        <div className="my-1">
                            <input id="firstName" name="firstName" autoComplete="given-name" required inputMode="text"
                                   className={firstNameInput === null ? normalInput : firstNameInput ? successInput : errorInput}
                                   onChange={handleFirstNameChange} value={firstName}
                            />
                        </div>
                    </div>

                    <div className="my-3">
                        <label htmlFor="lastName">Last Name</label>
                        <div className="my-1">
                            <input id="lastName" name="lastName" autoComplete="family-name" required inputMode="text"
                                   className={lastNameInput === null ? normalInput : lastNameInput ? successInput : errorInput}
                                   onChange={handleLastNameChange} value={lastName}
                            />
                        </div>
                    </div>

                    <div className="my-3">
                        <label htmlFor="phone">Phone Number</label>
                        <div className="my-1">
                            <input id="phone" name="phone" autoComplete="mobile tel" required inputMode="tel"
                                   className={normalInput}
                                   onChange={handlePhoneChange} value={phone}
                            />
                        </div>
                    </div>

                    <div className="mt-10">
                        <button type="submit" onClick={onSubmitClick}
                                disabled={button}
                                className="w-full p-2.5 cursor-pointer bg-indigo-600 text-white font-semibold">
                            Sign Up
                        </button>
                    </div>
                </form>
            </>
        )
    }

    return (
        <div className='flex-col w-full justify-items-center'>
            <div className='p-10 flex-col justify-items-center w-1/4'>
                <div>
                    <img className="block mx-auto size-44"
                         src={logo} alt="Atlas logo"/>
                    <h2 className="align-center text-lg font-bold md-10">Create New Account</h2>
                </div>

                <div className="mt-10 w-full">
                    {pageStatus === 0 ? InitialPage() : DetailsPage()}
                </div>

                <p className="mt-4 text-center">
                    <span>Already a member? </span>
                    <a href="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">Log in</a>
                </p>
                <p className="mt-4 text-center text-wrap">{message}</p>
            </div>
        </div>
    )
}
