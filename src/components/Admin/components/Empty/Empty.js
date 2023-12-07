import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import './Empty.css'

function Empty(props) {
    const { lable, path } = props
    return (
        <div className="empty_wrap">
            <div className="empty">
                <span>Bạn chưa có {lable}</span>
                <div className="admin-createType-link">
                    <Link to={`${path}`} className="add-createType">
                        <AiOutlinePlus className="create-product_icon" />
                        <p>Thêm {lable}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Empty
