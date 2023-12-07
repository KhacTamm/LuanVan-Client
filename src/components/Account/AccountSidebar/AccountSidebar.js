import { NavLink, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'

import config from '../../../config'

import AvatarCustomer from '../AvatarCustomer/AvatarCustomer'

import { BiUser } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { HiOutlineClipboardList } from 'react-icons/hi'

import './AccountSidebar.css'
import { Avatar } from 'antd'

function AccountSidebar() {
    const location = useLocation()
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    return (
        <div className="profile-nav" style={{ width: '210px' }}>
            <div className="profile-inf">
                <div className="profile-inf_img">
                    {userInfo.image ? (
                        <AvatarCustomer src={userInfo.image} />
                    ) : (
                        <Avatar size="large" icon={<BiUser />} />
                    )}
                </div>
                <div className="profile-inf_name">{userInfo.name}</div>
            </div>
            <NavLink
                to={`/account/${userInfo._id}`}
                className={
                    location.pathname === `/account/${userInfo._id}` ? 'profile-nav_item active' : 'profile-nav_item'
                }
            >
                <FaRegUser />
                <p>Hồ sơ của tôi</p>
            </NavLink>
            <NavLink
                to={`/account/address/${userInfo._id}`}
                className={
                    location.pathname === `/account/address/${userInfo._id}`
                        ? 'profile-nav_item active'
                        : 'profile-nav_item'
                }
            >
                <HiOutlineLocationMarker />
                <p> Địa chỉ </p>
            </NavLink>
            <NavLink
                to={config.routes.MyOrder}
                className={
                    location.pathname === `${config.routes.MyOrder}` ? 'profile-nav_item active' : 'profile-nav_item'
                }
            >
                <HiOutlineClipboardList />
                <p>Đơn mua</p>
            </NavLink>
        </div>
    )
}

export default AccountSidebar
