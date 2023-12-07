import React, { useEffect } from 'react'

import { formatPrice, formatTimeDate } from '../../../../untils/index'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderPaidByUser } from '../../../../redux/actions/OrderAction'
import EmptyOrder from '../AllOrder/EmptyOrder'
import MyOrder from '../../MyOrder'
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
                <div>{formatPrice(item.totalPriceFeeShip)}₫</div>
            </div>
        </div>
        <div className="all-myorder-list">
            <div className="all-myorder-product">{item.orderItems.map((item) => orderItem(item))}</div>
            <OrderProgress status={item.status} />
        </div>
        <div className="all-myorder-item-totalprice">
            <div>
                <span>Tổng số tiền : </span> <strong>{formatPrice(item.totalPriceFeeShip)}₫</strong>
            </div>
        </div>
    </div>
)

function PaidOrder(props) {
    const dispatch = useDispatch()

    const { myOrdersPaid } = useSelector((state) => state.orderByUser)
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    useEffect(() => {
        dispatch(getOrderPaidByUser(userInfo._id))
    }, [dispatch, userInfo._id])

    return (
        <div className="myorder-item">
            <MyOrder></MyOrder>
            <div className="all-myorder">
                {myOrdersPaid && myOrdersPaid.length > 0 ? (
                    myOrdersPaid.map((item, index) => orderParent(item, index))
                ) : (
                    <EmptyOrder></EmptyOrder>
                )}
            </div>
        </div>
    )
}

export default PaidOrder
