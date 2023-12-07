import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { IoTrashOutline } from 'react-icons/io5'
import './ShoppingCart.css'

import { useDispatch } from 'react-redux'
import { DeleteAllToCart, getAllCart } from '../../redux/actions/CartAction'
import EmptyCart from './EmtyCart/EmptyCart'
import CartReceipt from './CartReceipt/CartReceipt'
import Product from './Product'

function Cart() {
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)
    const { quantity } = useSelector((state) => state.cart)
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    function DeleteAllProduct() {
        const action = DeleteAllToCart(userInfo._id)
        dispatch(action)
    }

    useEffect(() => {
        dispatch(getAllCart(userInfo._id))
    }, [dispatch, userInfo._id])

    return (
        <section id="shopping-cart">
            <h2 className="title_header">Giỏ Hàng Của Bạn ({quantity})</h2>
            {cartItems.length > 0 ? (
                <div className="shopping-cart">
                    <div className="CartNp">
                        <table className="cl1_cart">
                            {/* <div className="header_cl1"> */}
                            <tr className="header_cl1">
                                <th className="checkboxAll">
                                    <span className="Namesp">Sản Phẩm</span>
                                    {/* <span className="trash" onClick={() => DeleteAllProduct()}>
                                        <IoTrashOutline />
                                    </span> */}
                                </th>
                                <th className="header_cl1_item sl">Số Lượng</th>
                                <th className="header_cl1_item tt">Thành Tiền</th>
                                <th className="header_cl1_item trash">
                                    <IoTrashOutline onClick={() => DeleteAllProduct()} />
                                </th>
                            </tr>
                            {cartItems.map((product, index) => (
                                <Product cartItem={product} key={index} />
                            ))}
                        </table>
                        <div className="cl2_cart">
                            <CartReceipt />
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyCart />
            )}
        </section>
    )
}

export default Cart
