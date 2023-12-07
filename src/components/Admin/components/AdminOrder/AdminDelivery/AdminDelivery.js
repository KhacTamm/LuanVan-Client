import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { GetAllOrderPaid } from '../../../../../redux/actions/OrderAction'

import { formatPrice } from '../../../../../untils'

import ListOrder from '../AdminOrderUI/ListOrder'
import MenuOrder from '../MenuOrder/MenuOrder'
import EmptyOrder from '../EmptyOrder/EmptyOrder'
import HeaderText from '../../TextAdmin/HeaderText/HeaderText'

const orderItem = (item, index) => (
    <div key={index} className="all-myorder-item">
        <div className="all-myorder-item-img">
            <img alt="img" src={item.image}></img>
        </div>
        <div className="all-myorder-item-name-admin">
            <p>{item.name}</p>
            <span>x{item.qty}</span>
        </div>
        <div className="all-myorder-item-price">{formatPrice(item.salePrice)}đ</div>
    </div>
)

export const orderParent = (item) => (
    <div className="all-myorder-parent-item">
        <div className="all-myorder-list">{item.orderItems.map((item, index) => orderItem(item, index))}</div>
        <div className="all-myorder-item-totalprice">
            <span>Tổng số tiền : </span>{' '}
            <strong style={{ color: '#d70018' }}>{formatPrice(item.totalPriceFeeShip)}đ</strong>
        </div>
    </div>
)

function AdminDelivery(props) {
    const dispatch = useDispatch()

    const { orderDelivery } = useSelector((state) => state.allOrder)

    useEffect(() => {
        dispatch(GetAllOrderPaid())
    }, [dispatch])

    return (
        <div>
            <div className="dashboard-top">
                <HeaderText lable="Quản lý đơn hàng"></HeaderText>

                <div className="menu_order-admin">
                    <MenuOrder></MenuOrder>
                </div>
            </div>
            {/* <MenuOrder></MenuOrder> */}
            {orderDelivery && orderDelivery.length > 0 ? (
                <ListOrder orders={orderDelivery} />
            ) : (
                <EmptyOrder></EmptyOrder>
            )}
        </div>
    )
}

export default AdminDelivery
