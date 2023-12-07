import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteTypeProduct } from '../../../../redux/actions/ListTypeProductAction'
import { paginationTypeProduct, updateTypeVisible } from '../../../../redux/actions/ListTypeProductAction'

import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

import IconCustomer from '../FromComponents/IconCustomer/IconCustomer'
import ModalCustomer from '../../../Modal/ModalCustomer'
import { FiEdit } from 'react-icons/fi'
import { success } from '../../../Message/Message'

function Type(props) {
    const { type, number } = props
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(type.visible)
    const currentPage = useSelector((state) => state.allTypeProduct.currentPage)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleRemoveItem = async (item) => {
        setIsModalOpen(false)
        await dispatch(deleteTypeProduct(item))
        await dispatch(paginationTypeProduct(currentPage))
        success('Xóa danh mục thành công')
    }

    const handleVisisble = async (type) => {
        await setVisible(!visible)
        const dataVisible = { visible: !visible }
        await dispatch(updateTypeVisible(dataVisible, type._id))
        await dispatch(paginationTypeProduct(currentPage))
    }

    return (
        <tr>
            <td>{number + 1}</td>
            <td>{type.name}</td>
            <td className="show">
                <Link onClick={(e) => handleVisisble(type)}>
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </Link>
            </td>
            <IconCustomer>
                <Link to={`/admin/typeList/update/${type._id}`}>
                    <FiEdit></FiEdit>
                </Link>
            </IconCustomer>
            <IconCustomer isDelete>
                <DeleteOutlined onClick={showModal} />
            </IconCustomer>
            <ModalCustomer
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                handleFunction={() => handleRemoveItem(type)}
                lable="danh mục sách"
            />
        </tr>
    )
}

export default Type
