import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBrandProduct } from '../../../../redux/actions/ListPublisherAction'
import { paginationBrandProduct, updateBrandVisible } from '../../../../redux/actions/ListPublisherAction'

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { FiTrash, FiEdit } from 'react-icons/fi'

import IconCustomer from '../FromComponents/IconCustomer/IconCustomer'
import ModalCustomer from '../../../Modal/ModalCustomer'
import { success } from '../../../Message/Message'

function Publisher(props) {
    const { publisher, number } = props
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(publisher.visible)
    const currentPage = useSelector((state) => state.allBrandProduct.currentPage)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleRemoveItem = async (item) => {
        setIsModalOpen(false)
        await dispatch(deleteBrandProduct(item))
        await dispatch(paginationBrandProduct(currentPage))
        success('Xóa nhà xuất bản thành công')
    }

    const handleVisisble = async (brand) => {
        await setVisible(!visible)
        const dataVisible = { visible: !visible }
        await dispatch(updateBrandVisible(dataVisible, brand))
        await dispatch(paginationBrandProduct(currentPage))
    }

    return (
        <tr>
            <td>{number + 1}</td>
            <td>
                <img alt="img" className="img-publisher" src={publisher.img} />
            </td>
            <td>{publisher.name}</td>
            <td className="show">
                <Link onClick={(e) => handleVisisble(publisher._id)}>
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </Link>
            </td>
            <IconCustomer>
                <Link to={`/admin/publisher/update/${publisher._id}`}>
                    <FiEdit></FiEdit>
                </Link>
            </IconCustomer>
            <IconCustomer isDelete>
                <FiTrash onClick={showModal} />
            </IconCustomer>
            <ModalCustomer
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                handleFunction={() => handleRemoveItem(publisher)}
                lable="nhà xuất bản"
            />
        </tr>
    )
}

export default Publisher
