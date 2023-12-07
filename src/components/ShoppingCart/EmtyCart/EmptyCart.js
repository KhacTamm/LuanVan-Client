import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../../assets'
import './EmptyCart.css'
import config from '../../../config'

function EmptyCart() {
    return (
        <div className="emptyCart">
            <img src={images.shopping_basket} alt="Giỏ hàng" className="imgEmptyCart" />
            <p className="empty__note">Chưa có sản phẩm trong giỏ hàng của bạn.</p>
            <Link className="empty__btn" to={config.routes.home}>
                Mua sắm ngay
            </Link>
        </div>
    )
}

export default EmptyCart
