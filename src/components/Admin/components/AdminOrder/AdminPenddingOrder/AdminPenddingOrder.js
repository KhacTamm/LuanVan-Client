import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { GetAllOrderPendding } from '../../../../../redux/actions/OrderAction'

import ListOrder from '../AdminOrderUI/ListOrder'
import MenuOrder from '../MenuOrder/MenuOrder'
import EmptyOrder from '../EmptyOrder/EmptyOrder'
import HeaderText from '../../TextAdmin/HeaderText/HeaderText'

import './AdminPenddingOrder.css'

function AdminPenddingOrder(props) {
    const dispatch = useDispatch()
    const { orderPendding } = useSelector((state) => state.allOrder)

    useEffect(() => {
        dispatch(GetAllOrderPendding())
    }, [dispatch])

    return (
        <div>
            <div className="dashboard-top">
                <HeaderText lable="Quản lý đơn hàng"></HeaderText>
                <div className="menu_order-admin">
                    <MenuOrder></MenuOrder>
                </div>
            </div>
            {orderPendding && orderPendding.length > 0 ? (
                <ListOrder orders={orderPendding} />
            ) : (
                <EmptyOrder></EmptyOrder>
            )}
        </div>
    )
}

export default AdminPenddingOrder
