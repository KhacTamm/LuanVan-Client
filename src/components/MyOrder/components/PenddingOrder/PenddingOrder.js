import React, { useEffect } from 'react'

import { formatPrice, formatTimeDate } from '../../../../untils/index'

import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder, getOrderPenddingByUser } from '../../../../redux/actions/OrderAction'

import './PenddingOrder.css'
import EmptyOrder from '../AllOrder/EmptyOrder'
import MyOrder from '../../MyOrder'
import OrderProgress from '../../OrderProgress/OrderProgress'

function PenddingOrder() {
    const dispatch = useDispatch()
    const { myOrdersPendding } = useSelector((state) => state.orderByUser)
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    const orderParent = (item, index) => (
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
                    <strong style={{ color: '#d70018' }}>{formatPrice(item.totalPriceFeeShip)}₫</strong>
                </div>
            </div>
            <div className="all-myorder-list">
                <div className="all-myorder-product">
                    {item.orderItems.map((item, index) => orderItem(item, index))}
                </div>
                <OrderProgress status={item.status} />
            </div>
            <div className="all-myorder-item-totalprice">
                <div className="myorder-cancel">
                    {item.paymentMethod === 'payOnlinePayPal' || item.paymentMethod === 'payOnlineVnPay' ? (
                        <>
                            <strong style={{ color: 'rgb(109,121,181)', fontSize: '1.7rem' }}>Đã thanh toán</strong>
                        </>
                    ) : item.cancelOrder ? (
                        <strong style={{ color: 'rgb(109,121,181)', fontSize: '1.7rem' }}>Đang Yêu Cầu Hủy Đơn</strong>
                    ) : (
                        <button className="cancelbtn" onClick={() => handleCancelOrder(item)}>
                            Hủy đơn hàng
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
    const orderItem = (item, index) => (
        <div key={index} className="all-myorder-item">
            <div className="all-myorder-item-img">
                <img src={item.image} alt="image"></img>
            </div>
            <div className="all-myorder-item-name">
                <p>{item.name}</p>
                <div className="all-myorder-item-price">{formatPrice(item.salePrice)}đ</div>
                <span>Số lượng: {item.qty}</span>
            </div>
            {/* <div className="all-myorder-item-price">{formatPrice(item.salePrice)}đ</div> */}
        </div>
    )

    const handleCancelOrder = async (item) => {
        await dispatch(cancelOrder(item._id))
        dispatch(getOrderPenddingByUser(userInfo._id))
    }

    useEffect(() => {
        dispatch(getOrderPenddingByUser())
    }, [dispatch, userInfo._id])

    return (
        <div className="myorder-item">
            <MyOrder></MyOrder>
            <div className="all-myorder">
                {myOrdersPendding && myOrdersPendding.length > 0 ? (
                    myOrdersPendding.map((item, index) => orderParent(item, index))
                ) : (
                    <EmptyOrder></EmptyOrder>
                )}
            </div>
        </div>
    )
}

export default PenddingOrder
