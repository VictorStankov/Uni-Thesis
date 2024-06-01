import {useAuth, authFetch, logout} from '../auth.jsx'

export default function Home() {
    const [a] = useAuth()
    return (
        <>
            <h1>HOME</h1>
        </>
    )
}
