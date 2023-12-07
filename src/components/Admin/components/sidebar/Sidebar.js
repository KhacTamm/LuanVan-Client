import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { GetAllOrderCancel, GetAllOrderPendding, GetAllOrderShipping } from '../../../../redux/actions/OrderAction'

import config from '../../../../config'
import images from '../../../../assets'

import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { FaUserEdit } from 'react-icons/fa'
import { TbUsers } from 'react-icons/tb'
import { SiPublons } from 'react-icons/si'
import { AiOutlineDashboard } from 'react-icons/ai'
import { BiCategoryAlt } from 'react-icons/bi'
import { GiBookshelf } from 'react-icons/gi'
import { HiOutlineTicket } from 'react-icons/hi2'
import { FaReplyAll } from 'react-icons/fa'
import './Sidebar.css'
import AvatarCustomer from '../../../Account/AvatarCustomer/AvatarCustomer'

function Sidebar() {
    const dispatch = useDispatch()
    const location = useLocation()
    const { orderPendding } = useSelector((state) => state.allOrder)
    let totalNewOrder

    if (orderPendding) {
        totalNewOrder = orderPendding.length
    }

    useEffect(() => {
        const getNewOrder = () => {
            dispatch(GetAllOrderPendding())
            dispatch(GetAllOrderShipping())
            dispatch(GetAllOrderCancel())
        }
        getNewOrder()
    }, [dispatch])

    return (
        <div className="sidebar">
            <div className="sidebar-list-first">
                <AvatarCustomer style={{ width: '65px', height: '65px' }} src={images.avatarAdmin} />
                <span>Admin</span>
            </div>
            <div className="sidebar-list">
                <NavLink
                    to={config.routes.admin}
                    className={location.pathname === '/admin' ? 'sidebar-list-item active' : 'sidebar-list-item'}
                >
                    <AiOutlineDashboard />
                    <p>Tổng quan</p>
                </NavLink>

                <NavLink
                    to={config.routes.order}
                    className={location.pathname === '/admin/order' ? 'sidebar-list-item active' : 'sidebar-list-item'}
                >
                    <HiOutlineClipboardDocumentList />
                    <p>
                        Đơn hàng
                        <span className="admin-order-new">{totalNewOrder}</span>
                    </p>
                </NavLink>

                <NavLink
                    to={config.routes.product}
                    className={
                        location.pathname === '/admin/product' ? 'sidebar-list-item active' : 'sidebar-list-item'
                    }
                >
                    <GiBookshelf />
                    <p>Sách</p>
                </NavLink>
                <NavLink
                    to={config.routes.category}
                    className={
                        location.pathname === '/admin/typeList' ? 'sidebar-list-item active' : 'sidebar-list-item'
                    }
                >
                    <BiCategoryAlt />
                    <p>Danh mục sách</p>
                </NavLink>
                <NavLink
                    to={config.routes.author}
                    className={location.pathname === '/admin/author' ? 'sidebar-list-item active' : 'sidebar-list-item'}
                >
                    <FaUserEdit />
                    <p>Tác giả</p>
                </NavLink>
                <NavLink
                    to={config.routes.publisher}
                    className={
                        location.pathname === '/admin/publisher' ? 'sidebar-list-item active' : 'sidebar-list-item'
                    }
                >
                    <SiPublons />
                    <p>Nhà xuất bản</p>
                </NavLink>
                <NavLink
                    to={config.routes.promotion}
                    className={
                        location.pathname === '/admin/promotion' ? 'sidebar-list-item active' : 'sidebar-list-item'
                    }
                >
                    <HiOutlineTicket />
                    <p>Khuyến Mãi</p>
                </NavLink>

                <NavLink
                    to={config.routes.evaluate}
                    className={
                        location.pathname === '/admin/evaluate' ? 'sidebar-list-item active' : 'sidebar-list-item'
                    }
                >
                    <FaReplyAll />
                    <p>Đánh giá</p>
                </NavLink>

                <NavLink
                    to={config.routes.customer}
                    className={
                        location.pathname === '/admin/customer' ? 'sidebar-list-item active' : 'sidebar-list-item'
                    }
                >
                    <TbUsers />
                    <p>Khách hàng</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
