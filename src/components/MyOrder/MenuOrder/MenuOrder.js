import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
    getOrderByUser,
    getOrderCancelByUser,
    getOrderDeliveryByUser,
    getOrderPaidByUser,
    getOrderPenddingByUser,
    getOrderShippingByUser,
} from '../../../redux/actions/OrderAction'
import './MenuOrder.css'

function MenuOrder(props) {
    const dispatch = useDispatch()
    const location = useLocation()

    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    const { myOrders } = useSelector((state) => state.orderByUser)
    const { myOrdersPendding } = useSelector((state) => state.orderByUser)
    const { myOrdersShipping } = useSelector((state) => state.orderByUser)
    const { myOrdersDelivery } = useSelector((state) => state.orderByUser)
    const { myOrdersPaid } = useSelector((state) => state.orderByUser)
    const { myOrdersCancel } = useSelector((state) => state.orderByUser)

    useEffect(() => {
        const getAllOrderPenddingAndShippingByUser = async () => {
            await dispatch(getOrderPenddingByUser(userInfo._id))
            await dispatch(getOrderByUser(userInfo._id))
            await dispatch(getOrderShippingByUser(userInfo._id))
            await dispatch(getOrderDeliveryByUser(userInfo._id))
            await dispatch(getOrderPaidByUser(userInfo._id))
            await dispatch(getOrderCancelByUser(userInfo._id))
        }

        getAllOrderPenddingAndShippingByUser()
    }, [dispatch, userInfo._id])

    return (
        <div className="myorder-menu-customer">
            <div
                className={
                    location.pathname === '/myOrder'
                        ? 'myorder-menu-customer-item active'
                        : 'myorder-menu-customer-item'
                }
            >
                <Link to={'/myOrder'}>Tất cả {myOrders && myOrders.length > 0 ? `(${myOrders.length})` : ''}</Link>
            </div>
            <div
                className={
                    location.pathname === '/myOrder/pendding'
                        ? 'myorder-menu-customer-item active'
                        : 'myorder-menu-customer-item'
                }
            >
                <Link to="/myOrder/pendding">
                    Chờ xác nhận {myOrdersPendding && myOrdersPendding.length > 0 ? `(${myOrdersPendding.length})` : ''}
                </Link>
            </div>
            <div
                className={
                    location.pathname === '/myOrder/shipping'
                        ? 'myorder-menu-customer-item active'
                        : 'myorder-menu-customer-item'
                }
            >
                <Link to="/myOrder/shipping">
                    Chờ lấy hàng {myOrdersShipping && myOrdersShipping.length > 0 ? `(${myOrdersShipping.length})` : ''}
                </Link>
            </div>
            <div
                className={
                    location.pathname === '/myOrder/delivery'
                        ? 'myorder-menu-customer-item active'
                        : 'myorder-menu-customer-item'
                }
            >
                <Link to="/myOrder/delivery">
                    Đang vận chuyển
                    {myOrdersDelivery && myOrdersDelivery.length > 0 ? `(${myOrdersDelivery.length})` : ''}
                </Link>
            </div>
            <div
                className={
                    location.pathname === '/myOrder/paid'
                        ? 'myorder-menu-customer-item active'
                        : 'myorder-menu-customer-item'
                }
            >
                <Link to="/myOrder/paid">
                    Đã giao {myOrdersPaid && myOrdersPaid.length > 0 ? `(${myOrdersPaid.length})` : ''}
                </Link>
            </div>
            <div
                className={
                    location.pathname === '/myOrder/cancel'
                        ? 'myorder-menu-customer-item active'
                        : 'myorder-menu-customer-item'
                }
            >
                <Link to="/myOrder/cancel">
                    Đã hủy {myOrdersCancel && myOrdersCancel.length > 0 ? `(${myOrdersCancel.length})` : ''}
                </Link>
            </div>
        </div>
    )
}

export default MenuOrder
