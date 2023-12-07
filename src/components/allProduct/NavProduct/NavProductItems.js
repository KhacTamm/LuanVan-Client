import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchType } from '../../../redux/actions/ProductAction'

import './NavProduct.css'

function NavProductItems(props) {
    const { type } = props
    const dispatch = useDispatch()
    const history = useNavigate()

    const HandleFilterProductByType = async (type) => {
        await history('/search/type')

        dispatch(searchType(type))
    }

    return (
        <div className="navProduct_item" onClick={() => HandleFilterProductByType(type.name)}>
            <span className="typeName">{type.name}</span>
        </div>
    )
}

export default NavProductItems
