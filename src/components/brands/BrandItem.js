import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { getAllProduct } from '../../redux/actions/ProductAction'
import './Brands.css'

function BrandItem(props) {
    const { items } = props
    const dispatch = useDispatch()
    const history = useNavigate()

    // const [dataFilter, setDataFilter] = useState({})

    // useEffect(() => {
    //     dispatch(filterProductByRandomField(dataFilter))
    // }, [dataFilter])

    useEffect(() => {
        dispatch(getAllProduct())

        return () => {
            return []
        }
    }, [dispatch])

    const HandleFilterProductByBrand = async (brand) => {
        await history(`/search/brand/${brand._id}`)

        // dispatch(searchBrands(brand))
    }

    return (
        <div className="brand-item" onClick={() => HandleFilterProductByBrand(items)}>
            <img src={items.img} alt={items.name} />
        </div>
    )
}

export default BrandItem
