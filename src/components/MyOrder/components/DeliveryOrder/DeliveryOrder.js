import React, { useEffect } from 'react'

import { formatPrice, formatTimeDate } from '../../../../untils/index'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderDeliveryByUser } from '../../../../redux/actions/OrderAction'
import MyOrder from '../../MyOrder'
import EmptyOrder from '../AllOrder/EmptyOrder'
import OrderProgress from '../../OrderProgress/OrderProgress'

const orderItem = (item, index) => (
    <div key={index} className="all-myorder-item">
        <div className="all-myorder-item-img">
            <img alt="img" src={item.image}></img>
        </div>
        <div className="all-myorder-item-name">
            <p>{item.name}</p>
            <div className="all-myorder-item-price">{formatPrice(item.salePrice)}đ</div>
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
                <p>Tổng số tiền </p>
                <strong style={{ color: 'rgb(215, 0, 24) ' }}>{formatPrice(item.totalPriceFeeShip)}₫</strong>
            </div>
        </div>
        <div className="all-myorder-list">
            <div className="all-myorder-product">{item.orderItems.map((item) => orderItem(item))}</div>
            <OrderProgress status={item.status} />
        </div>
        {/* <div className="all-myorder-item-totalprice">
            <span>Tổng số tiền : </span> <strong>{formatPrice(item.totalPrice)}đ</strong>
        </div> */}
    </div>
)

function DeliveryOrder(props) {
    const dispatch = useDispatch()
    const { myOrdersDelivery } = useSelector((state) => state.orderByUser)

    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    useEffect(() => {
        dispatch(getOrderDeliveryByUser(userInfo._id))
    }, [dispatch, userInfo._id])

    return (
        <div className="myorder-item">
            <MyOrder></MyOrder>
            <div className="all-myorder">
                {myOrdersDelivery && myOrdersDelivery.length > 0 ? (
                    myOrdersDelivery.map((item, index) => orderParent(item, index))
                ) : (
                    <EmptyOrder></EmptyOrder>
                )}
            </div>
        </div>
    )
}

export default DeliveryOrder
