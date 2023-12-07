import React, { useEffect } from 'react'

import { formatPrice, formatTimeDate } from '../../../../untils/index'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderCancelByUser } from '../../../../redux/actions/OrderAction'
import EmptyOrder from '../AllOrder/EmptyOrder'
import MyOrder from '../../MyOrder'
import OrderProgress from '../../OrderProgress/OrderProgress'
import './CancelOrder.css'

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
            <div className="time-cancel">
                <span>Đã hủy đơn hàng vào: </span>
                <div
                    style={{
                        fontWeight: '600',
                        color: '#555',
                    }}
                >
                    {formatTimeDate(item.updatedAt)}
                </div>
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
        <div className="all-myorder-footer">
            <div className="cancle-lable">Đã hủy</div>
        </div>
    </div>
)

function CancelOrder(props) {
    const dispatch = useDispatch()

    const { myOrdersCancel } = useSelector((state) => state.orderByUser)

    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    useEffect(() => {
        dispatch(getOrderCancelByUser(userInfo._id))
    }, [dispatch, userInfo._id])

    return (
        <div className="myorder-item">
            <MyOrder></MyOrder>
            <div className="all-myorder">
                {myOrdersCancel && myOrdersCancel.length > 0 ? (
                    myOrdersCancel.map((item, index) => orderParent(item, index))
                ) : (
                    <EmptyOrder></EmptyOrder>
                )}
            </div>
        </div>
    )
}

export default CancelOrder
