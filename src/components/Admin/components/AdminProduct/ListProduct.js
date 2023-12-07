import React, { useDispatch, useSelector } from 'react-redux'
import { editCurrentPage, paginationProduct } from '../../../../redux/actions/ProductAction'
import { DeleteAllProduct } from '../../../../redux/actions/ProductAction'

import { FiTrash } from 'react-icons/fi'

import { Pagination } from 'antd'
import './AdminProduct.css'

import Product from './Product'
import { useState } from 'react'
import ModalCustomer from '../../../Modal/ModalCustomer'

function ListProduct(props) {
    const dispatch = useDispatch()
    const { listProducts, search } = props
    const currentPage = useSelector((state) => state.allProduct.currentPage)
    const { pages } = useSelector((state) => state.allProduct.product)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const HandleChangePage = async (number) => {
        await dispatch(paginationProduct(number))
        await dispatch(editCurrentPage(number))
    }

    const HandlDeleteAllProduct = async () => {
        await dispatch(DeleteAllProduct())
    }

    return (
        <div className="admin-product-list">
            <table>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sách</th>
                        <th scope="col">Giá gốc</th>
                        <th scope="col">Giá bán</th>
                        <th scope="col">Số lượng</th>
                        <th colSpan="2">Thao tác</th>
                        <th>
                            <FiTrash onClick={showModal} style={{ fontSize: '2.25rem' }} />
                            <ModalCustomer
                                isModalOpen={isModalOpen}
                                handleCancel={handleCancel}
                                handleFunction={() => HandlDeleteAllProduct()}
                                lable="tất cả sản phẩm"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts
                        ? listProducts.map((item, index) => (
                              <Product product={item} key={item._id} update={item._id} number={index}></Product>
                          ))
                        : ''}
                </tbody>
            </table>
            {!search ? (
                <div className="pagination">
                    <Pagination
                        defaultCurrent={1}
                        current={currentPage}
                        total={pages * 10}
                        onChange={HandleChangePage}
                    />
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default ListProduct
