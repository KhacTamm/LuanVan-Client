import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import './AuthorUser.css'
import { getAllProduct } from '../../../redux/actions/ProductAction'

function AuthorUser(props) {
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
        <div className="author-user-product" onClick={() => HandleFilterProductByType(items)}>
            <div className="author-user-product_img">
                <img src={items.image} alt={items.name} />
            </div>
            <div className="author-user-product_label">
                <h6>{items.name}</h6>
            </div>
        </div>
    )
}

export default AuthorUser
