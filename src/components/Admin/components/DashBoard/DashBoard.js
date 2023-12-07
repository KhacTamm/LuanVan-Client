import React from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../../../redux/actions/ProductAction'
import { getAllUser } from '../../../../redux/actions/UserAction'

import { formatPrice } from '../../../../untils'

import { GiBlackBook } from 'react-icons/gi'
import { AiOutlineLineChart } from 'react-icons/ai'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { MdOutlineReceiptLong } from 'react-icons/md'
import './DashBoard.css'

import ReceiptManagement from './ReceiptManagement/ReceiptManagement'
import ChartRevenue from './ChartRevenue/ChartRevenue'
import ChartReceipt from './ChartReceipt/ChartReceipt'
import BookManagement from './BookManagement/BookManagement'

export default function DashBoard() {
    const dispatch = useDispatch()
    const { orderShipping } = useSelector((state) => state.allOrder)
    const { orderPendding } = useSelector((state) => state.allOrder)
    const { orderCancel } = useSelector((state) => state.allOrder)

    const { product } = useSelector((state) => state.allProduct)
    const users = useSelector((state) => state.getUsers.user)

    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getAllUser())
    }, [dispatch])

    const totalRevenue = useMemo(() => {
        if (orderShipping) {
            const today = new Date()
            const month = today.getMonth() + 1

            const order = orderShipping.filter((order) => {
                const orderShipping = new Date(order.updatedAt).getMonth()
                if (orderShipping + 1 === month) {
                    return order
                }
            })

            const result = order.reduce((accumulator, item) => {
                const result = accumulator + item.totalPriceFeeShip
                return result ? result : 0
            }, 0)

            return result
        }
        return
    }, [orderShipping])

    const recentOrder = useMemo(() => {
        if (orderShipping) {
            const today = new Date()
            const month = today.getMonth() + 1

            return orderShipping.filter((order) => {
                const orderShipping = new Date(order.updatedAt).getMonth()
                if (orderShipping + 1 === month) {
                    return order
                }
            }).length
        }
        return
    }, [orderShipping])

    return (
        <section id="dashboard">
            <div className="dashboard">
                <div className="dashboard-middle">
                    <div className="dashboard-middle-statistic">
                        <div className="dashboard-middle-statistic-content">
                            <div className="dashboard-middle-statistic-icon">
                                <AiOutlineLineChart></AiOutlineLineChart>
                            </div>
                            <div className="dashboard-middle-statistic-title">
                                <span className="total">{formatPrice(totalRevenue)}₫</span>
                                <span className="title">Doanh thu/tháng</span>
                            </div>
                        </div>
                        <div className="dashboard-middle-statistic-content">
                            <div className="dashboard-middle-statistic-icon">
                                <MdOutlineReceiptLong></MdOutlineReceiptLong>
                            </div>
                            <div className="dashboard-middle-statistic-title">
                                <span className="total">{recentOrder}</span>
                                <span className="title">Đơn hàng/tháng</span>
                            </div>
                        </div>
                        <div className="dashboard-middle-statistic-content">
                            <div className="dashboard-middle-statistic-icon">
                                <HiOutlineUserGroup></HiOutlineUserGroup>
                            </div>
                            <div className="dashboard-middle-statistic-title">
                                <span className="total">{users ? users.length - 1 : 0}</span>
                                <span className="title">Số tài khoản </span>
                            </div>
                        </div>
                        <div className="dashboard-middle-statistic-content">
                            <div className="dashboard-middle-statistic-icon">
                                <GiBlackBook></GiBlackBook>
                            </div>
                            <div className="dashboard-middle-statistic-title">
                                <span className="total">{product ? product.length : 0}</span>
                                <span className="title">Số sách </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chart-dashboard">
                    <ChartRevenue></ChartRevenue>
                    <ChartReceipt orderShipping={orderShipping}></ChartReceipt>
                </div>
                <div className="management">
                    <BookManagement products={product}></BookManagement>
                    <ReceiptManagement
                        orderShipping={orderShipping ? orderShipping.length : 0}
                        orderPendding={orderPendding ? orderPendding.length : 0}
                        orderCancel={orderCancel ? orderCancel.length : 0}
                    ></ReceiptManagement>
                </div>
            </div>
        </section>
    )
}
