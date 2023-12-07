import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { createOrderInData, payOrder } from '../../redux/actions/OrderAction'
import { HandlePaymentProduct } from '../../redux/actions/ProductAction'
import { DeleteAllToCart } from '../../redux/actions/CartAction'
import VnPay from './VnPay'
import { HandlePaymentPromotion } from '../../redux/actions/PromotionAction'

export default function Payment() {
    const history = useNavigate()
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)
    const [choosePay, setChoosePay] = useState({
        payLater: false,
        payOnline: false,
    })

    const { order } = useSelector((state) => state.orderInfo)
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    const pricePayment = order ? Math.round(order.totalPriceFeeShip / 24580) : 1

    const payLater = () => {
        setChoosePay({ payOnline: false, payLater: true })
    }

    const payOnline = () => {
        setChoosePay({ payLater: false, payOnline: true })
    }

    const successPaymentHandler = async (paymentResult) => {
        const OrderPaid = {
            ...order,
            status: 'pendding',
            paymentMethod: 'payOnlinePayPal',
            paymentResult: { ...paymentResult },
        }
        if (order.totalPriceFeeShip) {
            await dispatch(DeleteAllToCart(userInfo._id))
            await dispatch(HandlePaymentProduct(order.orderItems))
            dispatch(createOrderInData(OrderPaid))
            if (order.idVoucher) {
                await dispatch(HandlePaymentPromotion({ id: order.idVoucher }))
            }
            history('/orderSuccess')
        }
    }

    const SendOrderPayLater = async () => {
        const OrderPaid = {
            ...order,
            status: 'pendding',
            paymentMethod: 'payLater',
        }
        if (order.totalPriceFeeShip) {
            await dispatch(createOrderInData(OrderPaid))
            await dispatch(DeleteAllToCart(userInfo._id))
            await dispatch(HandlePaymentProduct(order.orderItems))
            if (order.idVoucher) {
                await dispatch(HandlePaymentPromotion({ id: order.idVoucher }))
            }
            history('/orderSuccess')
        }
    }

    const addPayPalScript = async () => {
        const { data } = await axios.get('http://localhost:4000/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!window.paypal) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }
    }, [])

    return (
        <div className="choose-pay">
            <div
                style={{
                    fontWeight: '600',
                    fontSize: '1.8rem',
                }}
            >
                Chọn Phương Thức Thanh toán{' '}
            </div>
            <div className="choose">
                <button type="submit" className={choosePay.payLater ? 'active' : ''} onClick={() => payLater()}>
                    Thanh toán khi nhận hàng
                </button>
                <button type="submit" className={choosePay.payOnline ? 'active' : ''} onClick={() => payOnline()}>
                    Thanh toán Online
                </button>
            </div>
            {choosePay.payLater ? (
                <div className="customer-order">
                    <button onClick={SendOrderPayLater}>Đặt Hàng</button>
                </div>
            ) : (
                ''
            )}
            {choosePay.payOnline ? (
                <button type="submit" className="paypal">
                    <VnPay></VnPay>
                    <PayPalButton
                        className="paypal-btn"
                        style={{ color: 'white', marginTop: '1rem' }}
                        amount={pricePayment}
                        onSuccess={successPaymentHandler}
                    ></PayPalButton>
                </button>
            ) : (
                ''
            )}
        </div>
    )
}
