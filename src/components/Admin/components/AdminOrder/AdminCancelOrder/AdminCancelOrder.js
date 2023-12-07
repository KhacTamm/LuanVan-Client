import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { GetAllOrderCancel } from '../../../../../redux/actions/OrderAction'

import ListOrder from '../AdminOrderUI/ListOrder'
import MenuOrder from '../MenuOrder/MenuOrder'
import EmptyOrder from '../EmptyOrder/EmptyOrder'
import HeaderText from '../../TextAdmin/HeaderText/HeaderText'

function AdminCancelOrder(props) {
    const dispatch = useDispatch()
    const { orderCancel } = useSelector((state) => state.allOrder)

    useEffect(() => {
        dispatch(GetAllOrderCancel())
    }, [dispatch])

    return (
        <div>
            <div className="dashboard-top">
                <HeaderText lable="Quản lý đơn hàng"></HeaderText>

                <div className="menu_order-admin">
                    <MenuOrder></MenuOrder>
                </div>
            </div>
            {orderCancel && orderCancel.length > 0 ? <ListOrder orders={orderCancel} /> : <EmptyOrder></EmptyOrder>}
        </div>
    )
}

export default AdminCancelOrder
