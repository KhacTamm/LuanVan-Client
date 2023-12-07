import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { formatPrice } from '../../../../untils/index'

import { DeleteProduct, paginationProduct, updateVisible } from '../../../../redux/actions/ProductAction'

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { FiTrash, FiEdit } from 'react-icons/fi'

import './AdminProduct.css'

import IconCustomer from '../FromComponents/IconCustomer/IconCustomer'
import ModalCustomer from '../../../Modal/ModalCustomer'
import { success } from '../../../Message/Message'

function Product(props) {
    const { product, number } = props
    const dispatch = useDispatch()
    const currentPage = useSelector((state) => state.allProduct.currentPage)
    const [visible, setVisible] = useState(product.visible)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleDeleteProduct = async (product) => {
        await dispatch(DeleteProduct(product._id))
        await dispatch(paginationProduct(currentPage))
        success('Xóa sản phẩm thành công')
        setIsModalOpen(false)
    }

    const handleVisisble = async (product) => {
        await setVisible(!visible)
        const dataVisible = { visible: !visible }
        await dispatch(updateVisible(dataVisible, product._id))
        await dispatch(paginationProduct(currentPage))
    }

    return (
        <tr className="list" style={{ marginRight: '12px' }}>
            <td>{number + 1}</td>
            <td style={{ width: '220px' }}>
                <img alt="img" src={product.image}></img>
            </td>
            <td>{product.name}</td>
            <td className="admin_price">
                {product.price ? formatPrice(product.price) : formatPrice(product.salePrice)} ₫
            </td>
            <td className="admin_price">{formatPrice(product.salePrice)} ₫</td>
            <td style={{ width: '150px' }}>{product.amount}</td>
            <td className="show">
                <Link onClick={(e) => handleVisisble(product)}>
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </Link>
            </td>
            <IconCustomer>
                <Link to={`/admin/product/update/${product._id}`}>
                    <FiEdit></FiEdit>
                </Link>
            </IconCustomer>
            <IconCustomer isDelete>
                <FiTrash onClick={showModal} />
            </IconCustomer>
            <ModalCustomer
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                handleFunction={() => handleDeleteProduct(product)}
                lable="sản phẩm"
            />
        </tr>
    )
}

export default Product
