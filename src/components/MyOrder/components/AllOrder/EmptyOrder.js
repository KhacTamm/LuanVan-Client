import React from 'react'
import './AllOrder.css'
import './EmptyOrder.css'

function EmptyOrder() {
    return (
        <div className="emptyOrder">
            <img
                alt="img"
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png"
            ></img>
            <div className="emptyOrder_text">Chưa có đơn hàng</div>
        </div>
    )
}

export default EmptyOrder
