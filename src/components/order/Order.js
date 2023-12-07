import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { OrderInfo } from '../../redux/actions/OrderAction'
import { setDefaultAddress } from '../../redux/actions/UserAction'
import { FeeShip } from '../../redux/actions/GhnAction'

import { formatPrice } from '../../untils'

import DeliveryAddress from './DeliveryAddress/DeliveryAddress'
import Payment from './Payment'

import { IoLocationSharp } from 'react-icons/io5'
import { Modal } from 'antd'
import './Order.css'

function Order() {
    const dispatch = useDispatch()
    const { voucher } = useSelector((state) => state.cart)
    const { idVoucher } = useSelector((state) => state.getPromotionById)
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    const { handleSubmit } = useForm()

    const deliveryAddress = userInfo.address.filter((item) => item.isDefault)
    const myRef = useRef(deliveryAddress)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.salePrice, 0)

    const [chooseProvince, setChooseProvince] = useState(
        deliveryAddress && deliveryAddress[0].province
            ? { name: deliveryAddress[0].province }
            : { name: 'Hồ Chí Minh' },
    )

    const [chooseDistrict, setChooseDistrict] = useState(
        deliveryAddress && deliveryAddress[0].district
            ? { name: deliveryAddress[0].district }
            : { name: 'Quận / Huyện' },
    )

    const [chooseWard, setChooseWard] = useState(
        deliveryAddress && deliveryAddress[0].ward ? { name: deliveryAddress[0].ward } : { name: 'Phường / Xã' },
    )

    useEffect(() => {
        if (chooseProvince && chooseDistrict && chooseWard) {
            const address = {
                province: chooseProvince.name,
                district: chooseDistrict.id || deliveryAddress[0].to_district_id,
                ward: chooseWard.id || deliveryAddress[0].to_ward_code,
            }
            dispatch(FeeShip(address))
        }
    }, [chooseProvince, chooseDistrict, chooseWard])

    const feeShipGhn = useSelector((state) => state.orderGhn.feeShipGhn)
    const ship = feeShipGhn ? feeShipGhn : 0

    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = async () => {
        if (chooseProvince && chooseDistrict && chooseWard) {
            const address = {
                province: chooseProvince.name,
                district: chooseDistrict.id || deliveryAddress[0].to_district_id,
                ward: chooseWard.id || deliveryAddress[0].to_ward_code,
            }
            myRef.current = deliveryAddress
            dispatch(FeeShip(address))
        }
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        dispatch(setDefaultAddress(myRef.current[0]._id, { isdefault: 'true' }))
        setIsModalOpen(false)
    }

    const onSubmit = async (data) => {
        if (!data) {
            alert('Bạn hãy nhập đầy đủ thông tin')
            return
        }
        const Order = {
            to_ward_code: deliveryAddress[0].to_ward_code ? deliveryAddress[0].to_ward_code : chooseWard.id,
            to_district_id: deliveryAddress[0].to_district_id ? deliveryAddress[0].to_district_id : chooseDistrict.id,

            orderItems: [...cartItems],
            shippingAddress: {
                name: deliveryAddress[0].userNameDelivery,
                phone: deliveryAddress[0].userNamePhone,
                province: deliveryAddress[0] ? deliveryAddress[0].province : '',
                district: deliveryAddress[0] ? deliveryAddress[0].district : '',
                ward: deliveryAddress[0] ? deliveryAddress[0].ward : '',
                more: deliveryAddress[0] ? deliveryAddress[0].detail : '',
            },
            totalPrice: totalPrice,
            name: deliveryAddress[0].name,
            user: userInfo,
            voucher: voucher,
            idVoucher: idVoucher,
            totalPriceFeeShip: totalPrice + feeShipGhn - voucher,
            feeShip: feeShipGhn,
        }

        await dispatch(OrderInfo(Order))
    }

    return (
        <section id="order">
            <div className="order-content">
                <form className="order-page" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-left">
                        <div className="customer">
                            <div className="address">
                                <div className="header-order">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4>Địa chỉ nhận hàng</h4>
                                        <span className="change-address" onClick={showModal}>
                                            Thay đổi
                                        </span>
                                    </div>
                                </div>
                                <Modal
                                    title="Địa Chỉ Của Tôi"
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    okText="Hoàn thành"
                                    cancelText="Hủy"
                                >
                                    {userInfo && userInfo.address && userInfo.address.length
                                        ? userInfo.address.map((item, index) => (
                                              <DeliveryAddress
                                                  addressItem={item}
                                                  key={index}
                                                  order
                                                  deliveryAddress={deliveryAddress[0]}
                                                  handleOk={handleOk}
                                              />
                                          ))
                                        : ''}
                                </Modal>
                                <div className="form-customer">
                                    <strong style={{ marginRight: '12px' }}>
                                        {myRef ? myRef.current[0].userNameDelivery : ''}
                                    </strong>
                                    <p className="form-customer-phone">
                                        0{myRef ? myRef.current[0].userNamePhone : ''}
                                    </p>
                                </div>
                                <div className="address-default">
                                    <IoLocationSharp style={{ color: 'rgb(109, 121, 181)', fontSize: '2.2rem' }} />
                                    <span>
                                        {`${deliveryAddress[0].detail}, ${deliveryAddress[0].ward}, ${deliveryAddress[0].district}, ${deliveryAddress[0].province}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="myProduct">
                            <div className="header-order">
                                <h4>Thông tin sản phẩm</h4>
                            </div>
                            {cartItems
                                ? cartItems.map((item, index) => (
                                      <div key={index} className="myProduct_item">
                                          <div>
                                              <img className="myProduct_item-img" src={item.image} alt="img"></img>
                                              <div className="myProduct_item-name">{item.name}</div>
                                          </div>
                                          <div>
                                              <div className="myProduct_item-qty">{item.qty} x</div>
                                              <div className="myProduct_item-price">
                                                  &nbsp;{formatPrice(item.salePrice)}₫ ={' '}
                                              </div>
                                              <b className="myProduct_item-price">
                                                  &nbsp;{formatPrice(item.salePrice * item.qty)}₫
                                              </b>
                                          </div>
                                      </div>
                                  ))
                                : ''}
                        </div>
                    </div>
                    <div className="receipt-methodPay">
                        <div className="receipt">
                            <div className="header-order">
                                <h4>Thông tin đơn hàng</h4>
                            </div>
                            <ul className="receipt-warp">
                                <li className="receipt-item">
                                    <span>Tổng tiền hàng:</span>
                                    <span>{formatPrice(totalPrice)}₫</span>
                                </li>
                                <li className="receipt-item">
                                    <span>Phí vận chuyển:</span>
                                    <span>{formatPrice(ship)}₫</span>
                                </li>
                                {voucher > 0 ? (
                                    <li className="receipt-item">
                                        <span>Khuyến mãi:</span>
                                        <span>- {formatPrice(voucher)}₫</span>
                                    </li>
                                ) : (
                                    ''
                                )}
                                <li className="receipt-item">
                                    <span>Tổng thanh toán:</span>
                                    <b style={{ color: '#d70018' }}>{formatPrice(totalPrice + ship - voucher)}₫</b>
                                </li>
                            </ul>
                        </div>
                        <Payment></Payment>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Order
