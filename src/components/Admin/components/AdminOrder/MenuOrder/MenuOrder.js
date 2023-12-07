import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import config from '../../../../../config'

import { useDispatch, useSelector } from 'react-redux'
import { GetAllOrderDelivery, getAllOrder } from '../../../../../redux/actions/OrderAction'
import {
    GetAllOrderPendding,
    GetAllOrderPaid,
    GetAllOrderShipping,
    GetAllOrderCancel,
} from '../../../../../redux/actions/OrderAction'

import './MenuOrder.css'

function MenuOrder(props) {
    const dispatch = useDispatch()
    const location = useLocation()

    const { order } = useSelector((state) => state.allOrder)
    const { orderPendding } = useSelector((state) => state.allOrder)
    const { orderShipping } = useSelector((state) => state.allOrder)
    const { orderDelivery } = useSelector((state) => state.allOrder)
    const { orderPaid } = useSelector((state) => state.allOrder)
    const { orderCancel } = useSelector((state) => state.allOrder)

    useEffect(() => {
        const getAllOrderPenddingAndShippingByUser = () => {
            dispatch(getAllOrder())
            dispatch(GetAllOrderPendding())
            dispatch(GetAllOrderShipping())
            dispatch(GetAllOrderDelivery())
            dispatch(GetAllOrderPaid())
            dispatch(GetAllOrderCancel())
        }

        getAllOrderPenddingAndShippingByUser()
    }, [dispatch])

    return (
        <div className="adminorder-menu">
            <div
                className={
                    location.pathname === '/admin/order' ? 'adminorder-menu-item active' : 'adminorder-menu-item'
                }
            >
                <Link to={config.routes.order}>Tất cả {order && order.length > 0 ? `(${order.length})` : ''}</Link>
            </div>
            <div
                className={
                    location.pathname === '/admin/order/pendding'
                        ? 'adminorder-menu-item active'
                        : 'adminorder-menu-item'
                }
            >
                <Link to={config.routes.orderPedding}>
                    Chờ xác nhận {orderPendding && orderPendding.length > 0 ? `(${orderPendding.length})` : ''}
                </Link>
            </div>
            <div
                className={
                    location.pathname === '/admin/order/shipping'
                        ? 'adminorder-menu-item active'
                        : 'adminorder-menu-item'
                }
            >
                <Link to={config.routes.orderShipping}>
                    Chờ lấy hàng {orderShipping && orderShipping.length > 0 ? `(${orderShipping.length})` : ''}
                </Link>
            </div>
            <div
                className={
                    location.pathname === '/admin/order/delivery'
                        ? 'adminorder-menu-item active'
                        : 'adminorder-menu-item'
                }
            >
                <Link to={config.routes.orderDelivery}>
                    Đang giao {orderDelivery && orderDelivery.length > 0 ? `(${orderDelivery.length})` : ''}
                </Link>
            </div>
            <div
                className={
                    location.pathname === '/admin/order/paid' ? 'adminorder-menu-item active' : 'adminorder-menu-item'
                }
            >
                <Link to={config.routes.orderPaid}>
                    Đã giao {orderPaid && orderPaid.length > 0 ? `(${orderPaid.length})` : ''}
                </Link>
            </div>
            {/* <div
                className={
                    location.pathname === '/admin/order/cancel' ? 'adminorder-menu-item active' : 'adminorder-menu-item'
                }
            >
                <Link to={config.routes.orderCancel}>
                    Khách yêu cầu Hủy {orderCancel && orderCancel.length > 0 ? `(${orderCancel.length})` : ''}
                </Link>
            </div> */}
            <div
                className={
                    location.pathname === '/admin/order/cancel' ? 'adminorder-menu-item active' : 'adminorder-menu-item'
                }
            >
                <Link to={config.routes.orderCancel}>
                    Đơn hủy {orderCancel && orderCancel.length > 0 ? `(${orderCancel.length})` : ''}
                </Link>
            </div>
        </div>
    )
}

export default MenuOrder
