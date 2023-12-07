import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { filterProductByPrice } from '../../../redux/actions/ProductAction'
import './FilterProduct.css'

function FilterProduct() {
    const dispatch = useDispatch()
    const [startPrice, setStartPrice] = useState(0)
    const [endPrice, setEndPrice] = useState(0)

    const FilterProductByPrice = (a, b) => {
        let startPrice = parseInt(a)
        let endPrice = parseInt(b)
        dispatch(filterProductByPrice(startPrice, endPrice))
    }

    return (
        <div className="filter">
            <div className="options-price">
                <div className="options-price_input">
                    <input
                        type="number"
                        id="priceStart"
                        placeholder="đ TỪ"
                        min="1"
                        onChange={(e) => setStartPrice(e.target.value)}
                    ></input>
                    <input
                        type="number"
                        id="priceEnd"
                        min="1"
                        placeholder="đ ĐẾN"
                        onChange={(e) => setEndPrice(e.target.value)}
                    ></input>
                </div>
                <button onClick={() => FilterProductByPrice(startPrice, endPrice)}>Áp dụng</button>
            </div>
        </div>
    )
}

export default FilterProduct
