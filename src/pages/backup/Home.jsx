import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { setLogin } from "../redux/auth"

const Home = () => {
    // state
    const [isLogged, setIsLogged] = useState(false)
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // redux
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHandler = (e) => {
        e.preventDefault()

        const data = { email }
        dispatch(setLogin(data))
            .then((result) => {
                if(result.payload){
                    const accessToken = result.payload.accessToken
                    Cookies.set('accessToken', accessToken, { expires: 1/24})
                    navigate('/award')
                }
                else {
                    setErrorMessage('Email Address is not exists')
                }
            })
            .catch((err) => console.log(err))
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
            <div className="row justify-content-md-center my-3">
                <div className="col-12 col-md-6 text-center">
                    <img src={process.env.PUBLIC_URL + '/images/star.png'} alt="" className="mx-auto d-block" style={{height:250, width:250}} />
                </div>
            </div>
            {
                !isLogged && (
                    <div className="row justify-content-md-center my-3">
                        <div className="col-12 col-md-6 text-center">
                            <h5>Enter your email address to sign in and continue</h5>
                            <form onSubmit={loginHandler}>
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
