import React, { useEffect } from 'react'

import { formatPrice, formatTimeDate } from '../../../../untils/index'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUser } from '../../../../redux/actions/OrderAction'

import MyOrder from '../../MyOrder'

import './AllOrder.css'
import EmptyOrder from './EmptyOrder'
import OrderProgress from '../../OrderProgress/OrderProgress'

const orderItem = (item, index) => (
    <div key={index} className="all-myorder-item">
        <div className="all-myorder-item-img">
            <img alt="image" src={item.image}></img>
        </div>
        <div className="all-myorder-item-name">
            <p>{item.name}</p>
            <div className="all-myorder-item-price">{formatPrice(item.salePrice)}₫</div>
            <span>Số lượng: {item.qty}</span>
        </div>
    </div>
)

export const orderParent = (item, index) => (
    <div key={index} className="all-myorder-parent-item">
        <div className="all-myorder-header">
            <div className="time-order">
                <p>Đã đặt đơn hàng vào</p>
                <div>{formatTimeDate(item.createdAt)}</div>
            </div>
            <div className="totalPrice-order">
                {item.paymentMethod === 'payOnlinePayPal' || item.paymentMethod === 'payOnlineVnPay' ? (
                    <p>Đã thanh toán </p>
                ) : (
                    <p>Tổng số tiền </p>
                )}
                {/* <p>Tổng số tiền </p> */}
                <strong style={{ color: '#d70018' }}>{formatPrice(item.totalPriceFeeShip)}₫</strong>
            </div>
        </div>
        <div className="all-myorder-list">
            <div className="all-myorder-product">{item.orderItems.map((item, index) => orderItem(item, index))}</div>
            <OrderProgress status={item.status} />
        </div>
    </div>
)

function AllOrder() {
    const dispatch = useDispatch()
    const { myOrders } = useSelector((state) => state.orderByUser)

    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    useEffect(() => {
        dispatch(getOrderByUser(userInfo._id))
    }, [dispatch, userInfo._id])

    return (
        <div className="myorder-item">
            <MyOrder></MyOrder>
            <div className="all-myorder">
                {myOrders && myOrders.length > 0 ? (
                    myOrders.map((item, index) => orderParent(item, index))
                ) : (
                    <EmptyOrder></EmptyOrder>
                )}
            </div>
        </div>
    )
}

export default AllOrder
