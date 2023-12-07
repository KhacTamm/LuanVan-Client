import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatPrice, isDaypromotion } from '../../../untils'

import './CartReceipt.css'
import { failure } from '../../Message/Message'
import { HiOutlineTicket } from 'react-icons/hi2'
import { Modal } from 'antd'
import images from '../../../assets'
import { getAllPromotion, resetIdPromotion, updateCurrentVoucher } from '../../../redux/actions/PromotionAction'
import { applyVoucher, resetVoucher, updateTotalPriceCart } from '../../../redux/actions/CartAction'
import config from '../../../config'

function CartReceipt() {
    const history = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const { voucher } = useSelector((state) => state.allPromotion)
    const [isDiscount, setIsDiscount] = useState(false)

    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    const deliveryAddress = userInfo.address.filter((item) => item.isDefault)
    let totalPriceNoDiscount = cartItems.reduce((total, item) => total + item.qty * item.salePrice, 0)

    const [totalPrice, setTotalPrice] = useState()

    const Order = async () => {
        if (userInfo) {
            if (deliveryAddress.length > 0) {
                await dispatch(updateTotalPriceCart(totalPrice ? totalPrice : totalPriceNoDiscount))
                if (isDiscount) {
                    await dispatch(applyVoucher(totalPriceNoDiscount - totalPrice))
                    await dispatch(updateCurrentVoucher(isDiscount))
                }
                history('/order')
            } else {
                await failure('Quý khách vui lòng chọn địa chỉ nhận hàng !!!')
                await history(`/account/address/${userInfo._id}`)
            }
        } else {
            history('/login')
        }
    }

    useEffect(() => {
        dispatch(getAllPromotion())
        dispatch(resetVoucher())
        dispatch(resetIdPromotion())
    }, [])

    const handleApplyVoucher = (id, condition, discount, qty, used) => {
        if (qty > used) {
            if (condition > totalPriceNoDiscount) {
                history(config.routes.productCustomer)
            } else if (isDiscount === false) {
                setIsModalOpen(false)
                setTotalPrice(totalPriceNoDiscount - discount)
                setIsDiscount(id)
            } else if (isDiscount === id) {
                setIsDiscount(false)
                setTotalPrice(totalPriceNoDiscount)
            } else {
                failure('Bạn chỉ có thể áp dụng 1 Voucher cho mỗi đơn hàng!!')
            }
        }
    }

    return (
        <div className="bill">
            <div
                style={{
                    fontSize: '2rem',
                    fontWeight: '600',
                }}
            >
                Tóm Tắt Đơn Hàng
            </div>
            <div className="cart-receipt-voucher" onClick={() => setIsModalOpen(true)}>
                <HiOutlineTicket /> Chọn hoặc nhập mã khuyến mãi
            </div>
            <Modal
                title="Velastro Khuyến Mãi"
                centered
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width={570}
                footer={null}
            >
                <div className="cart-receipt-voucher_modal_container">
                    <div className="cart-receipt-voucher_modal_header">
                        <div className="cart-receipt-voucher_input">
                            <HiOutlineTicket />
                            <input placeholder="Nhập mã giảm giá"></input>
                        </div>
                        <button disabled className="cart-receipt-voucher_btn">
                            Áp dụng
                        </button>
                    </div>
                    <div className="cart-receipt-voucher_item-continer">
                        <div className="cart-receipt-voucher_item-text">
                            <p>Mã Giảm Giá</p>
                            <span>Áp dụng tối đa: 1</span>
                        </div>
                        <div className="cart-receipt-voucher_item">
                            {voucher
                                ? voucher.map((item, index) => {
                                      if (isDaypromotion(item.dayStart, item.dayEnd) && item.visible) {
                                          return (
                                              <div
                                                  key={index}
                                                  className={
                                                      item.condition <= totalPriceNoDiscount
                                                          ? ' cart-receipt-voucher_item-image'
                                                          : ' cart-receipt-voucher_item-image none'
                                                  }
                                              >
                                                  <img src={images.voucher} alt="img"></img>
                                                  <div className="cart-receipt-voucher_item-image-price">
                                                      {formatPrice(item.limmit).split('.', 1)}K
                                                  </div>
                                                  <div className="cart-receipt-voucher_item-image-content">
                                                      <p>
                                                          <p>Giảm tối đa {formatPrice(item.limmit)}</p>
                                                          <p>Đơn tối thiểu {formatPrice(item.condition)}</p>
                                                      </p>

                                                      <p
                                                          className={
                                                              item.condition > totalPriceNoDiscount
                                                                  ? 'visibility'
                                                                  : 'unvisibility'
                                                          }
                                                      >
                                                          Chưa đạt giá trị đơn tối thiểu
                                                      </p>
                                                      <div className="cart-receipt-voucher_item-image-content-bottom">
                                                          <p>
                                                              <strong style={{ color: '#555' }}>HSD: </strong>
                                                              <span>{formatDate(item.dayEnd)}</span>
                                                          </p>

                                                          <div className="btn_dis">
                                                              <button
                                                                  className={
                                                                      item.qty <= item.used
                                                                          ? 'btn_not_discount'
                                                                          : 'btn_discount'
                                                                  }
                                                                  onClick={() =>
                                                                      handleApplyVoucher(
                                                                          item._id,
                                                                          item.condition,
                                                                          item.limmit,
                                                                          item.qty,
                                                                          item.used,
                                                                      )
                                                                  }
                                                              >
                                                                  {item.qty <= item.used
                                                                      ? 'Đã hết lượt sử dụng'
                                                                      : item.condition > totalPriceNoDiscount
                                                                      ? 'Mua thêm'
                                                                      : isDiscount !== item._id
                                                                      ? 'Sử dụng'
                                                                      : 'Bỏ chọn'}
                                                              </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          )
                                      }
                                  })
                                : ''}
                        </div>
                    </div>
                </div>
            </Modal>
            <ul className="prices_items">
                <li className="prices_item">
                    <span className="prices_text">Tạm tính</span>
                    <span className="prices_value">{formatPrice(totalPriceNoDiscount)} ₫</span>
                </li>
                {isDiscount && totalPriceNoDiscount - totalPrice > 0 ? (
                    <li className="prices_item">
                        <span className="prices_text">Giảm giá</span>
                        <span className="prices_value">- {formatPrice(totalPriceNoDiscount - totalPrice)} ₫</span>
                    </li>
                ) : (
                    ''
                )}
            </ul>

            <div className="total-price">
                <p className="prices">
                    <span className="prices_text">Thành tiền</span>
                    <p className="prices_total_value">{formatPrice(totalPrice ? totalPrice : totalPriceNoDiscount)}₫</p>
                </p>
                <p className="sub-prices_text">(Không bao gồm chi phí giao hàng)</p>
            </div>

            {totalPrice <= 0 ? (
                ''
            ) : (
                <div className="link_Order" onClick={() => Order()}>
                    <div className="order">Mua Hàng</div>
                </div>
            )}
        </div>
    )
}

export default CartReceipt
