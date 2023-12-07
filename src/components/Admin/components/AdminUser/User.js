import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { deleteUser, getAllUser } from '../../../../redux/actions/UserAction'

import { formatDate } from '../../../../untils'

import AvatarCustomer from '../../../Account/AvatarCustomer/AvatarCustomer'
import IconCustomer from '../FromComponents/IconCustomer/IconCustomer'
import ModalCustomer from '../../../Modal/ModalCustomer'

import { FiTrash, FiEdit } from 'react-icons/fi'

import './User.css'
import { success } from '../../../Message/Message'

function User(props) {
    const { user, number } = props
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleDeleteUser = async (user) => {
        setIsModalOpen(false)
        await dispatch(deleteUser(user._id))
        await dispatch(getAllUser())
        success('Xóa tài khoản khách hàng thành công')
    }

    return (
        <tr>
            <td>{number + 1}</td>
            <td className="d-flex align-items-center">
                <AvatarCustomer src={user.image} />
                <span style={{ paddingLeft: '14px' }}>{user.name}</span>
            </td>
            <td style={{ textAlign: 'center' }}>{user.email}</td>
            <td style={{ textAlign: 'center' }}>0{user.phone}</td>
            <td style={{ textAlign: 'center' }}>
                <Link className="order-user-item" to={`/admin/customer/order/${user._id}`}>
                    Đơn hàng
                </Link>
            </td>
            <td style={{ textAlign: 'center' }}>{formatDate(user.createdAt)}</td>

            <IconCustomer style={{ width: '50px', textAlign: 'center' }}>
                <Link to={`/admin/customer/update/profile/${user._id}`}>
                    <FiEdit></FiEdit>
                </Link>
            </IconCustomer>

            <IconCustomer isDelete style={{ width: '50px', textAlign: 'center' }}>
                <FiTrash onClick={showModal} />
            </IconCustomer>

            <ModalCustomer
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                handleFunction={() => handleDeleteUser(user)}
                lable="tài khoản"
            />
        </tr>
    )
}

export default User
