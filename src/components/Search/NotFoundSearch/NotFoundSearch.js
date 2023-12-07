import React from 'react'
import images from '../../../assets'
import './NotFoundSearch.css'

function NotFoundSearch() {
    return (
        <div className="SearchEmpty">
            <div>
                <img alt="img no found" src={images[404]} />
                <h5 className="textSearchEmpty">Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn</h5>
            </div>
        </div>
    )
}

export default NotFoundSearch
