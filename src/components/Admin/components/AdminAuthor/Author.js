import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { deleteAuthor, paginationAuthor, updateAuthorVisible } from '../../../../redux/actions/AuthorAction'

import IconCustomer from '../FromComponents/IconCustomer/IconCustomer'
import ModalCustomer from '../../../Modal/ModalCustomer'

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { success } from '../../../Message/Message'

function Author(props) {
    const { author, number } = props
    const dispatch = useDispatch()
    const currentPage = useSelector((state) => state.allAuthor.currentPage)
    const [visible, setVisible] = useState(author.visible)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleRemoveItem = async (item) => {
        await dispatch(deleteAuthor(item))
        await dispatch(paginationAuthor(currentPage))
        success('Xóa tác giả thành công')
        setIsModalOpen(false)
    }

    const handleVisisble = async (author) => {
        await setVisible(!visible)
        const dataVisible = { visible: !visible }
        await dispatch(updateAuthorVisible(dataVisible, author))
        await dispatch(paginationAuthor(currentPage))
    }

    return (
        <tr>
            <td>{number + 1}</td>
            <td>
                <img alt="img" className="img-author" src={author.image} />
            </td>
            <td style={{ textTransform: 'capitalize' }}>{author.name}</td>
            <td>
                <Link style={{ color: 'rgb(109, 121, 181)' }} to={`/admin/author/listProduct/${author._id}`}>
                    Xem các tác phẩm
                </Link>
            </td>
            <td className="show">
                <Link onClick={(e) => handleVisisble(author._id)}>
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </Link>
            </td>
            <IconCustomer style={{ textAlign: 'center', width: '45px' }}>
                <Link to={`/admin/author/update/${author._id}`}>
                    <FiEdit></FiEdit>
                </Link>
            </IconCustomer>

            <IconCustomer isDelete style={{ textAlign: 'center', width: '45px' }}>
                <FiTrash onClick={showModal} />
            </IconCustomer>

            <ModalCustomer
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                handleFunction={() => handleRemoveItem(author)}
                lable="tác giả"
            />
        </tr>
    )
}

export default Author
