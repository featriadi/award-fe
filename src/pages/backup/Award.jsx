import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

const Home = () => {
    //router
    const navigate = useNavigate()

    // component state
    const [awards, setAwards] = useState([])

    // filter state
    const [type, setType] = useState('all')
    const [minPoin, setMinPoin] = useState(0)
    const [maxPoin, setMaxPoin] = useState(0)
    const [filters, setFilters] = useState({})

    // base api
    const BASE_URL = 'http://localhost:8000'

    const changeType = (e) => {
        setType(e.target.value)
    }

    const changeFilter = (e) => {
        e.preventDefault()

        if(type === 'all' && minPoin === 0 && maxPoin === 0) {
            setFilters({})
        }
        else {
            setFilters({
                type: (type === "all") ? '' : type,
                minprice: minPoin,
                maxprice: maxPoin,
            })
        }
    }

    useEffect(() => {
        const getAccessToken = () => {
            const accessToken = Cookies.get('accessToken')

            if (accessToken === undefined) {
                navigate('/')
            }

            return accessToken
        }

        const getAward = async() => {
            const accessToken = getAccessToken()

            const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: filters
            }
            const response = await axios.get(`${BASE_URL}/awards`, config)
            setAwards(response.data)
        }

        getAward()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    return (
        <div className="container my-3">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Filter</h3>
                    <form onSubmit={changeFilter}>
                        {
                            !!Object.keys(filters).length && (
                                <>
                                    <button className="btn btn-primary" onClick={() => setFilters((filter) => { delete filter.minPoin; delete filter.maxPoin; })}>Poin: {minPoin} - {maxPoin} (x)</button>
                                    <br/>
                                    <button className="btn btn-primary" onClick={() => setFilters((filter) => delete filter.type)}>Type: {type} (x)</button>
                                </>
                            )
                        }
                        <div className="form-group my-3">
                            <h5>Poin Needed</h5>
                            <div className="input-group mb-3">
                                <span className="input-group-text">IDR</span>
                                <input type="number" className="form-control" placeholder="Minimum poin needed" value={minPoin} onChange={(e) => setMinPoin(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">IDR</span>
                                <input type="number" className="form-control" placeholder="Maximum poin needed" value={maxPoin} onChange={(e) => setMaxPoin(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group my-3">
                            <h5>Award Type</h5>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type" value="all" checked={type === 'all'} onChange={(e) => changeType(e)} />
                                <label className="form-check-label">
                                    All Type
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type" value="vouchers" checked={type === 'vouchers'} onChange={(e) => changeType(e)} />
                                <label className="form-check-label">
                                    Vouchers
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type" value="products" checked={type === 'products'} onChange={(e) => changeType(e)} />
                                <label className="form-check-label">
                                    Products
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type" value="giftcard" checked={type === 'giftcard'} onChange={(e) => changeType(e)} />
                                <label className="form-check-label">
                                    Giftcards
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Filter</button>
                    </form>
                </div>
            </div>
            <div className="row">
                {
                    awards.map((item) => (
                        <div className="col-12 col-md-4 my-3" key={item._id}>
                            <div className="card">
                                <img alt="ada" className="card-img-top" />
                                <div className="card-body">
                                    <h3>{item.name}</h3>
                                    <p>{item.point} Poin</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default Home