import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { getAllProduct } from '../../redux/actions/ProductAction'

import './OutstandingAuthor.css'

function OutstandingAuthorItem(props) {
    const { items } = props
    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(() => {
        dispatch(getAllProduct())

        return () => {
            return []
        }
    }, [dispatch])

    const HandleFilterProductByType = (author) => {
        history(`/author/${author._id}`)
    }

    return (
        <div className="categories-item" onClick={() => HandleFilterProductByType(items)}>
            <div className="categories-img">
                <img src={items.image} alt={items.name} />
            </div>
            <div className="categories-label">
                <h6>{items.name}</h6>
            </div>
        </div>
    )
}

export default OutstandingAuthorItem
