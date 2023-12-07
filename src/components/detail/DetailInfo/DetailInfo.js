import React from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../../../config'
import { formatPrice } from '../../../untils'

import { useDispatch, useSelector } from 'react-redux'
import { AddToCart } from '../../../redux/actions/CartAction'

import './DetailInfo.css'
import { Rate } from 'antd'
import { useState } from 'react'
import { failure, success } from '../../Message/Message'
import { MdAddShoppingCart } from 'react-icons/md'

function DetailInfo(props) {
    const { product } = props

    const dispatch = useDispatch()
    const history = useNavigate()
    const [qty, setQty] = useState(1)
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    const handleAddToCart = async (product) => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                failure('Bạn không thể thêm sản phẩm vào Giỏ hàng bằng tài khoản Admin')
            } else {
                const cartItem = {
                    ...product,
                    count: qty,
                    idUser: userInfo._id,
                }

                const action = AddToCart(cartItem)
                await dispatch(action)
                history(`${config.routes.cart}`)
            }
        } else {
            history(`${config.routes.login}`)
        }
    }

    const AddProductCart = async (product) => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                failure('Bạn không thể thêm sản phẩm vào Giỏ hàng bằng tài khoản Admin')
            } else {
                const cartItem = {
                    ...product,
                    count: qty,
                    idUser: userInfo._id,
                }
                const action = AddToCart(cartItem)
                await dispatch(action)
                await success('Sản phẩm đã được thêm vào Giỏ hàng')
            }
        } else {
            history(`${config.routes.login}`)
        }
    }

    const countReview = product && product.comments ? product.comments.length : 0
    let averageRate =
        product && product.comments ? (product.comments.reduce((a, c) => a + c.star, 0) / countReview).toFixed(1) : 0

    function discount(product) {
        const percentDiscount = 100 - Math.round((product.salePrice * 100) / product.price)
        return percentDiscount
    }

    function handleDecreaseProduct() {
        setQty(qty - 1)
    }

    function handleNoDecreaseProduct(e) {
        if (qty >= 1) {
            failure('Số lượng bạn chọn đã vượt mức số lượng tối thiểu của sản phẩm này')
        }
        e.preventDefault()
    }

    function handleIncreaseProduct() {
        setQty(qty + 1)
    }

    function handleNoIncreaseProduct(e) {
        if (qty >= 1) {
            failure('Số lượng bạn chọn đã vượt mức số lượng tối đa của sản phẩm này')
        }
        e.preventDefault()
    }

    return (
        <>
            <div className="detail-info-slide">
                <div className="detail-info-slide-image">
                    <img alt="img" src={product.image}></img>
                </div>
            </div>
            <div className="detail-info-right">
                <div className="detail-title">
                    <h2>{product.name}</h2>
                    <div className="product-publisher">
                        Tác giả: <span>{product.author}</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="listproduct-product-star">
                            {isNaN(averageRate) ? (
                                <span style={{ fontSize: '1.7rem' }}>Chưa có đánh giá</span>
                            ) : (
                                <>
                                    <p
                                        className="total_start"
                                        style={{
                                            fontSize: '1.8rem',
                                            marginRight: '10px',
                                            paddingBottom: '6px',
                                            borderBottom: '1px solid rgb(255, 120, 30)',
                                            color: 'rgb(255, 120, 30)',
                                        }}
                                    >
                                        {averageRate}
                                    </p>
                                    <Rate style={{ fontSize: '1.8rem' }} value={averageRate} disabled={true} />
                                </>
                            )}
                        </div>
                        <div className="quantity-sale">{countReview} Đánh Giá</div>
                        <div className="quantity-sale"> {product.rating} Đã Bán</div>
                    </div>
                </div>
                <div className="detail-item detail-info-right-price">
                    <strong className="saleprice">{formatPrice(product.salePrice)}₫</strong>
                    <div className="price-old-box">
                        <span className="old-price">
                            {product.price ? <span className="price">{formatPrice(product.price)}₫</span> : ''}
                        </span>
                        <div className="discount_detail">
                            {discount(product) >= 5 ? (
                                <div className="discount_detail-item">
                                    <p>Giảm {discount(product)}% </p>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
                <div className=" detail-item">
                    <div className="detail-qty-addtocart">
                        <span
                            style={{
                                fontSize: '1.8rem',
                                marginRight: '55px',
                            }}
                        >
                            Số lượng
                        </span>
                        <div className="detail-qty">
                            <ul className="button-add-cart">
                                <li
                                    className="btn-decrease"
                                    onClick={qty > 1 ? () => handleDecreaseProduct(product) : handleNoDecreaseProduct}
                                >
                                    -
                                </li>
                                <li className="qty">{qty}</li>
                                <li
                                    className="btn-increase"
                                    onClick={
                                        product.amount > qty
                                            ? () => handleIncreaseProduct(product)
                                            : handleNoIncreaseProduct
                                    }
                                >
                                    +
                                </li>
                            </ul>
                        </div>
                        <div className="detail-qty_text">{product.amount} sản phẩm có sẵn</div>
                    </div>
                    <div className="detail-info-right-buy">
                        <div className="detail-info-right-buy-now">
                            <div
                                className="button_buy btn-cart"
                                onClick={(e) => {
                                    AddProductCart(product)
                                }}
                            >
                                <MdAddShoppingCart style={{ fontSize: '2.2rem', marginRight: '8px' }} />
                                <strong>Thêm giỏ hàng</strong>
                            </div>
                        </div>
                        <div className="detail-info-right-buy-now">
                            <div className="button_buy btn-buy" onClick={() => handleAddToCart(product)}>
                                <strong>MUA NGAY</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailInfo
