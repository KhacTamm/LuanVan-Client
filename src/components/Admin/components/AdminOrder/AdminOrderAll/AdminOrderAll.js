import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllOrder } from '../../../../../redux/actions/OrderAction'

import ListOrder from '../AdminOrderUI/ListOrder'
import EmptyOrder from '../EmptyOrder/EmptyOrder'
import MenuOrder from '../MenuOrder/MenuOrder'
import HeaderText from '../../TextAdmin/HeaderText/HeaderText'

function AdminOrderAll() {
    const dispatch = useDispatch()
    const orders = useSelector((state) => state.allOrder.order)

    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch])

    return (
        <div>
            <div className="dashboard-top">
                <HeaderText lable="Quản lý đơn hàng"></HeaderText>
                <div className="menu_order-admin">
                    <MenuOrder></MenuOrder>
                </div>
            </div>
            {orders && orders.length > 0 ? <ListOrder orders={orders} /> : <EmptyOrder></EmptyOrder>}
        </div>
    )
}

export default AdminOrderAll
