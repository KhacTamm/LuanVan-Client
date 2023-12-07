import React from 'react'
import { formatPrice, formatTimeDate } from '../../../../../untils/index'

import { useNavigate } from 'react-router-dom'
import config from '../../../../../config'

import { useDispatch } from 'react-redux'
import { createOrderGhn, PrintOrderGhn } from '../../../../../redux/actions/GhnAction'
import { deleteOrder, getAllOrder, ShippingOrder } from '../../../../../redux/actions/OrderAction'

import './Order.css'

function Order(props) {
    const { order } = props
    const dispatch = useDispatch()
    const history = useNavigate()

    const {
        orderItems,
        totalPriceFeeShip,
        totalPrice,
        feeShip,
        paymentMethod,
        cancelOrder,
        shippingAddress,
        status,
        createdAt,
        updatedAt,
        userOrderIn4,
        voucher,
    } = order

    const handleShippingOrder = async (order) => {
        await dispatch(createOrderGhn(order._id)) // create order in giaohangnhanh
        await dispatch(ShippingOrder(order._id))

        await dispatch(getAllOrder())
        history(config.routes.orderShipping)
    }

    const handlePrintOrder = (order) => {
        dispatch(PrintOrderGhn(order._id))
    }

    const handleDeleteOrder = async (order) => {
        await dispatch(deleteOrder(order._id))
        await dispatch(getAllOrder())
        history(config.routes.orderCancel)
    }

    return (
        <div className="order-list">
            <div className="order-list-items">
                <div className="d-flex justify-content-between" style={{ width: '100%', margin: '8px 6px' }}>
                    {status === 'pendding' ? (
                        <p
                            style={{
                                color: 'rgb(215,0,24)',
                                fontWeight: '700',
                                fontSize: '1.65rem',
                            }}
                        >
                            Chờ Xác Nhận
                        </p>
                    ) : (
                        ''
                    )}
                    {status === 'shipping' ? (
                        <p
                            style={{
                                color: '#008000',
                                fontWeight: '700',
                                fontSize: '1.65rem',
                                textShadow: '1px 1px 2px rgba(0, 128, 0, 0.8))',
                            }}
                        >
                            Chờ Lấy Hàng
                        </p>
                    ) : (
                        ''
                    )}
                    {status === 'delivery' ? <p>Đang vận chuyển</p> : ''}
                    {status === 'paid' ? <p>Đã nhận hàng</p> : ''}
                    {status === 'cancel' ? (
                        <p
                            style={{
                                color: '#555',
                                fontWeight: '700',
                                fontSize: '1.65rem',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8))',
                            }}
                        >
                            Đơn Hủy
                        </p>
                    ) : (
                        ''
                    )}
                    <p>
                        <strong>Ngày đặt hàng:</strong>
                        <span style={{ fontSize: '1.6rem' }}> {formatTimeDate(createdAt)}</span>
                    </p>
                </div>
                <div className="order-list-items_in4">
                    <div className="order-list-items_in4_item">
                        <h4>Hình thức thanh toán và vận chuyển </h4>
                        <div className="order-info-address_item">
                            <p>Giao đến</p>
                            {shippingAddress.detail}, {shippingAddress.ward}, {shippingAddress.district},{' '}
                            {shippingAddress.province}
                        </div>
                        <div className="order-info-address_item">
                            <p>Tạm tính</p>
                            <p>{formatPrice(totalPrice)}đ</p>
                        </div>
                        <div className="order-info-address_item">
                            <p>Phí ship </p>
                            <p>{formatPrice(feeShip)}đ</p>
                        </div>
                        {voucher ? (
                            <div className="order-info-address_item">
                                <p>Giảm giá</p>
                                <p>- {formatPrice(voucher)}đ</p>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="order-info-address_item">
                            <p>Tổng tiền</p>
                            <strong style={{ color: 'rgb(215, 0, 24)' }}>{formatPrice(totalPriceFeeShip)}đ</strong>
                        </div>
                        <div className="order-info-address_item">
                            <p>Thanh toán</p>
                            <span>
                                {paymentMethod === 'payLater'
                                    ? 'Thanh toán khi nhận hàng'
                                    : paymentMethod === 'payOnlinePayPal'
                                    ? 'Thanh toán thông qua PayPal'
                                    : 'Thanh toán thông qua VNPay'}
                            </span>
                        </div>
                    </div>
                    <div className="order-info order-list-items_in4_item">
                        <div className="order-info-address">
                            <h4>Thông tin người nhận hàng</h4>
                            <div className="order-info-address_item">
                                <p>Họ tên </p>
                                <strong>{shippingAddress.name}</strong>
                            </div>
                            <div className="order-info-address_item">
                                <p>SĐT</p>0{shippingAddress.phone}
                            </div>
                        </div>
                    </div>
                    {userOrderIn4 ? (
                        <div className="order-list-items_in4_item">
                            <h4>Thông tin khách hàng</h4>
                            <div className="order-info-address_item">
                                <p>Họ tên</p>
                                <strong>{userOrderIn4.name}</strong>
                            </div>
                            {userOrderIn4 ? (
                                <div className="order-info-address_item">
                                    <p>SĐT</p>
                                    <p> 0{userOrderIn4.phone}</p>
                                </div>
                            ) : (
                                ''
                            )}
                            <div className="order-info-address_item">
                                <p>Email</p>
                                <p>{userOrderIn4.email}</p>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div className="order-items">
                    <h4>Thông tin sản phẩm</h4>
                    <table>
                        <thead>
                            <tr style={{ color: '#666' }}>
                                <th>Hình ảnh</th>
                                <th style={{ textAlign: 'center' }}>Tên sản phẩm</th>
                                <th style={{ textAlign: 'center' }}>Giá</th>
                                <th style={{ textAlign: 'center' }}>Số lượng</th>
                                <th style={{ textAlign: 'center' }}>Tổng tiền</th>
                            </tr>
                        </thead>
                        {orderItems.map((item, index) => (
                            <tbody>
                                <tr key={index} className="order-items-item">
                                    <td className="inf">
                                        <img alt="img" src={item.image}></img>
                                    </td>
                                    <td className="name">{item.name}</td>
                                    <td className="price">{formatPrice(item.salePrice)}₫</td>
                                    <td className="qty">x {item.qty}</td>
                                    <td className="qty">{formatPrice(item.qty * item.salePrice)}₫</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>

            <div className="order-bottom">
                {paymentMethod === 'payOnlinePayPal' || paymentMethod === 'payOnlineVnPay' ? (
                    <div className="order-payment-check">Đã thanh toán</div>
                ) : (
                    ''
                )}
                {/* {status === 'shipping' ? (
                    <div className="order-status">
                        <span>
                            Đã xác nhận
                            {paymentMethod === 'payOnlineVnPay' || paymentMethod === 'payOnlinePayPal' ? (
                                <span>Đã thanh toán</span>
                            ) : (
                                ''
                            )}
                        </span>
                    </div>
                ) : (
                    ''
                )} */}

                <div className="order-button">
                    {status === 'pendding' && cancelOrder === false ? (
                        <>
                            <button className="shipping" onClick={() => handleShippingOrder(order)}>
                                Xác nhận đơn hàng
                            </button>
                        </>
                    ) : (
                        ''
                    )}

                    {cancelOrder === true && status !== 'cancel' ? (
                        <>
                            <span> Khách yêu cầu hủy đơn </span>
                            <button className="shipping" onClick={() => handleDeleteOrder(order)}>
                                Hủy đơn
                            </button>
                        </>
                    ) : (
                        ''
                    )}

                    {status === 'shipping' ? (
                        <button className="shipping" onClick={() => handlePrintOrder(order)}>
                            In đơn hàng
                        </button>
                    ) : (
                        ''
                    )}
                    {status === 'cancel' ? (
                        <div className="d-flex justify-content-between" style={{ width: '100%' }}>
                            <div className="order-info-address_item">
                                <strong style={{ width: '200px' }}>Đã hủy đơn hàng vào: </strong>
                                <span>{formatTimeDate(updatedAt)}</span>
                            </div>
                            <span className="order-status" style={{ fontSize: '1.7rem', fontWeight: '600' }}>
                                Đơn hàng đã hủy
                            </span>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}

export default Order
