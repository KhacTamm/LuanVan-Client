import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { formatPrice } from '../../untils/index'

import { useDispatch, useSelector } from 'react-redux'
import { IncreaseQtyProduct, DeleteToCart, DecreaseQtyProduct, getAllCart } from '../../redux/actions/CartAction'

import { IoTrashOutline } from 'react-icons/io5'
import { useState } from 'react'

// Product.propTypes = {}

function Product(props) {
    const { cartItem } = props
    const dispatch = useDispatch()
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    const [qty, setQty] = useState()

    useEffect(() => {
        setQty(cartItem.qty)
    }, [cartItem.qty])

    function handleDeleteProduct(cartItem) {
        dispatch(DeleteToCart(cartItem))
    }

    function handleNoDeleteProduct(e) {
        e.preventDefault()
    }

    async function handleIncreaseProduct(cartItem) {
        setQty(qty + 1)
        await dispatch(IncreaseQtyProduct(cartItem))
        await dispatch(getAllCart(userInfo._id))
    }

    async function handleDecreaseProduct(cartItem) {
        setQty(qty - 1)
        await dispatch(DecreaseQtyProduct(cartItem._id))
        await dispatch(getAllCart(userInfo._id))
    }

    return (
        // <div className="body__cl1">
        <tr className="spcl1">
            <td className="inf4_product">
                <div className="imgsp">
                    <img alt="img" src={cartItem.image}></img>
                </div>
                <div className="spbcl_2">
                    <Link to={`/product/detail/${cartItem.idProduct}`}>
                        <p className="product_name">{cartItem.name}</p>
                    </Link>
                    {/* <div className="trashItem" onClick={() => handleDeleteProduct(cartItem)}>
                        <IoTrashOutline />
                    </div> */}
                    {/* <td className="dg body_cl1_item"> */}
                    <div className="spbcl_2_price">
                        <p className="giakm">{formatPrice(cartItem.salePrice)} ₫</p>
                        {cartItem.price ? <p className="giagoc">{formatPrice(cartItem.price)} ₫</p> : ''}
                    </div>
                    {/* </td> */}
                </div>
            </td>
            {/* <td className="dg body_cl1_item">
                <p className="giakm">{formatPrice(cartItem.salePrice)} ₫</p>
                {cartItem.price ? <p className="giagoc">{formatPrice(cartItem.price)} ₫</p> : ''}
            </td> */}
            <td className="sl">
                <ul className="button-event">
                    <li
                        className="cart-btn-increase cart-btn-adjust cart-btn"
                        onClick={qty > 1 ? () => handleDecreaseProduct(cartItem) : handleNoDeleteProduct}
                    >
                        -
                    </li>
                    <li className="cart-btn-qty cart-btn">{qty}</li>
                    <li
                        className="cart-btn-decrease cart-btn-adjust cart-btn"
                        onClick={qty < cartItem.amount ? () => handleIncreaseProduct(cartItem) : handleNoDeleteProduct}
                    >
                        +
                    </li>
                </ul>
            </td>
            <td className="tt body_cl1_item" style={{ fontWeight: '600', color: '#c92127' }}>
                {formatPrice(cartItem.salePrice * qty)} ₫
            </td>
            <td className="trash">
                <IoTrashOutline onClick={() => handleDeleteProduct(cartItem)} />
            </td>
        </tr>
        // </div>
    )
}

export default Product
