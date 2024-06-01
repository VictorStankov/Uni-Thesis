import {useAuth, authFetch, logout} from '../auth.jsx'

export default function Home() {
    const [a] = useAuth()
    console.log(a)
    return (
        <>
            <h1>HOME</h1>
            <br/>
            {a? <div><h1>LOGGED IN</h1> </div> : <h1>LOGGED OUT</h1>}
        </>
    )
}
