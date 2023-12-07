import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { GetAllOrderShipping } from '../../../../../redux/actions/OrderAction'

import ListOrder from '../AdminOrderUI/ListOrder'
import MenuOrder from '../MenuOrder/MenuOrder'
import EmptyOrder from '../EmptyOrder/EmptyOrder'
import HeaderText from '../../TextAdmin/HeaderText/HeaderText'

function AdminShippingOrder(props) {
    const dispatch = useDispatch()
    const { orderShipping } = useSelector((state) => state.allOrder)

    useEffect(() => {
        dispatch(GetAllOrderShipping())
    }, [dispatch])

    return (
        <div>
            <div className="dashboard-top">
                <HeaderText lable="Quản lý đơn hàng"></HeaderText>

                <div className="menu_order-admin">
                    <MenuOrder></MenuOrder>
                </div>
            </div>
            {orderShipping && orderShipping.length > 0 ? (
                <ListOrder orders={orderShipping} />
            ) : (
                <EmptyOrder></EmptyOrder>
            )}
        </div>
    )
}

export default AdminShippingOrder
