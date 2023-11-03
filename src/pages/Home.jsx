import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = 'http://localhost:8000/api/v1'

const Home = () => {
    const navigate = useNavigate()
    const [isLogged, setIsLogged] = useState(false)
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const loginHandler = async(e) => {
        e.preventDefault()

        await axios.post(`${BASE_URL}/auth/login`, {email})
            .then((result) => {
                const accessToken = result.data.accessToken
                const refreshToken = result.data.refreshToken

                Cookies.set('accessToken', accessToken, { expires: 1/24})
                Cookies.set('refreshToken', refreshToken, { expires: 1})
                navigate('/award')
            })
            .catch(() => setErrorMessage('Email Address is not exists'))
    }

    useEffect(() => {
        const getAccessToken = () => {
            const accessToken = Cookies.get('accessToken')

            if (accessToken !== undefined) {
                setIsLogged(true)
            }
        }

        getAccessToken()
    }, [])

    return (
        <div className="container my-3">
            <div className="text-center">
               <img src={process.env.PUBLIC_URL + '/images/star.png'} alt="" className="mx-auto d-block" style={{height:250, width:250}} />
                <h1>AWARD</h1>
            </div>
            {
                !isLogged && (
                    <div className="row justify-content-md-center text-center my-3">
                        <div className="col-12 col-md-6 mx-auto">
                            <h5>Enter your email address to sign in and continue</h5>
                            <form onSubmit={(e) => loginHandler(e)}>
                                <div className="form-group mb-2">
                                    <input type="email" className="form-control" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </form>
                            {
                                errorMessage !== '' && (
                                    <div className="alert alert-danger" role="alert">{errorMessage}</div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Home
