/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

const BASE_URL = 'http://localhost:8000/api/v1'

const Award = () => {
    const navigate = useNavigate()
    const [awards, setAwards] = useState([])
    const [filter, setFilter] = useState({
        type: '',
    })
    const [type, setType] = useState({
        all: true,
        vouchers: true,
        products: true,
        giftcards: true,
    })
    const [poin, setPoin] = useState({
        min: 0,
        max: 0,
    })

    const typeChange = (e) => {
        const { value, checked } = e.target

        if(value === 'all' && checked) {
            setType({
                all: true,
                vouchers: true,
                products: true,
                giftcards: true,
            })
        } else {
            setType((prev) => ({
                ...prev,
                all: false,
                [value]: checked,
            }))
        }

    }

    const changeFilter = (e) => {
        e.preventDefault()
        
        if(type.all && poin.min === 0 && poin.max === 0){
            setFilter({
                type: '',
            })
        }
        else {
            setFilter({
                type: '',
            })

            // type
            for(const key in type) {
                if(type[key]){
                    setFilter(filter => ({
                        ...filter,
                        type: `${filter.type}${key},`
                    }))
                }
            }

            // poin
            if(poin.min >= 0 && poin.max > 0){
                setFilter(filter => ({
                    ...filter,
                    minprice: poin.min,
                    maxprice: poin.max,
                }))
            }
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
                params: filter
            }
            const response = await axios.get(`${BASE_URL}/awards`, config)
            setAwards(response.data)
        }

        getAward()
    }, [filter])

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Filter</h2>
                            {
                                // remove filter
                            }
                            <form onSubmit={(e) => changeFilter(e)}>
                                <div className="form-group my-3">
                                    <h5>Poin Needed</h5>
                                    <div className="row">
                                        <div className="col-12 col-md-4">
                                            <div className="input-group">
                                                <span className="input-group-text">IDR</span>
                                                <input type="number" className="form-control" placeholder="Minimum poin needed" value={poin.min} min={0} onChange={(e) => {setPoin((prev) => ({...prev, min: e.target.value}))}} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="input-group">
                                                <span className="input-group-text">IDR</span>
                                                <input type="number" className="form-control" placeholder="Maximum poin needed" value={poin.max} min={0} onChange={(e) => {setPoin((prev) => ({...prev, max: e.target.value}))}} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group my-3">
                                    <h5>Award Type</h5>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="type" value="all" checked={type.all} onChange={(e) => typeChange(e)}/>
                                        <label className="form-check-label">
                                            All Type
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="type" value="vouchers" checked={type.vouchers} onChange={(e) => typeChange(e)}/>
                                        <label className="form-check-label">
                                            Vouchers
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="type" value="products" checked={type.products} onChange={(e) => typeChange(e)}/>
                                        <label className="form-check-label">
                                            Products
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="type" value="giftcards" checked={type.giftcards} onChange={(e) => typeChange(e)}/>
                                        <label className="form-check-label">
                                            Giftcards
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Filter</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        {
                            (awards.length !== 0) ? 
                            awards.map((item) => (
                                <div className="col-12 col-md-4 my-3" key={item._id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h3>{item.name}</h3>
                                            <h5>{item.point} Poin</h5>
                                            <p>{item.type}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : 'No Awards Found'
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Award
