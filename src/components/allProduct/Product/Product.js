import { Link, useLocation, useNavigate } from 'react-router-dom'

import React, { useDispatch, useSelector } from 'react-redux'
import { AddToCart } from '../../../redux/actions/CartAction'

import config from '../../../config'
import { formatPrice } from '../../../untils/index'

import './Product.css'
import { Rate } from 'antd'

import { BsCart2 } from 'react-icons/bs'
import { failure, success } from '../../Message/Message'
import { BsFillBasket2Fill } from 'react-icons/bs'

function Product(props) {
    const { product } = props
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    const countReview = product.comments.length
    let averageRate = (product.comments.reduce((a, c) => a + c.star, 0) / countReview).toFixed(1)
    const { quantity } = useSelector((state) => state.cart)

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useNavigate()

    const AddProductToCart = async (product) => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                failure('Bạn không thể thêm sản phẩm vào Giỏ hàng bằng tài khoản Admin')
            } else {
                if (quantity <= product.amount) {
                    const cartItem = {
                        ...product,
                        count: 1,
                        idUser: userInfo._id,
                    }

                    const action = AddToCart(cartItem)
                    await dispatch(action)
                    history(`${config.routes.cart}`)
                } else {
                    history(`${config.routes.cart}`)
                }
            }
        } else {
            history(`${config.routes.login}`)
        }
    }

    const AddProductCart = async (e, product) => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                failure('Bạn không thể thêm sản phẩm vào Giỏ hàng bằng tài khoản Admin')
            } else {
                if (quantity <= product.amount) {
                    const cartItem = {
                        ...product,
                        count: 1,
                        idUser: userInfo._id,
                    }

                    const action = AddToCart(cartItem)
                    await dispatch(action)
                    await success('Sản phẩm đã được thêm vào giỏ hàng')
                } else {
                    e.preventDefault()
                }
            }
        } else {
            history(`${config.routes.login}`)
        }
    }

    return (
        <div className={location.pathname === '/product' ? 'col-product' : 'col-2'}>
            <div className="listproduct-product">
                <Link to={`/product/detail/${product._id}`}>
                    <img className="listproduct-product-img" src={product.image} alt="img product" />
                    <span className="listproduct-product-name">{product.name}</span>
                </Link>
                <div className="listproduct-product-price">
                    <div className="price">
                        <span className="price1">{formatPrice(product.salePrice)}₫</span>
                        {product.price ? <span className="price2">{formatPrice(product.price)}₫</span> : ''}
                    </div>
                    {/* <BsCart2
                        onClick={(e) => {
                            AddProductCart(e, product)
                        }}
                        className="cartIcon"
                    /> */}
                </div>
                <div className="listproduct-product-star">
                    {isNaN(averageRate) ? (
                        <Rate
                            style={{ color: 'orange', fontSize: '12px', marginRight: '10px' }}
                            value={0}
                            disabled={true}
                        />
                    ) : (
                        <Rate
                            style={{ color: 'orange', fontSize: '12px', marginRight: '10px' }}
                            value={averageRate}
                            disabled={true}
                        />
                    )}
                    <span className="product-rating">Đã bán {product.rating} </span>
                </div>
                {product.percentDiscount >= 5 ? (
                    <div className="discount">
                        <p>{product.percentDiscount}% OFF</p>
                    </div>
                ) : (
                    ''
                )}
                <div className="buy">
                    <div className="addCart-buy-in-cardProduct">
                        <div className="addcart-in-cardProduct">
                            <BsFillBasket2Fill
                                onClick={(e) => {
                                    AddProductCart(e, product)
                                }}
                                className="cartIcon"
                            />
                        </div>
                        <div
                            className="button_buy"
                            onClick={(e) => {
                                AddProductToCart(product)
                            }}
                        >
                            Mua Ngay
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
