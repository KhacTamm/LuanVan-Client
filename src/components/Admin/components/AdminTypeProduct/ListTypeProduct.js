import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { editCurrentPage, paginationTypeProduct } from '../../../../redux/actions/ListTypeProductAction'

import { Pagination } from 'antd'
import './TypeProduct.css'
import Type from './Type'

function ListTypeProduct(props) {
    const dispatch = useDispatch()
    const { listTypes, search } = props
    const currentPage = useSelector((state) => state.allTypeProduct.currentPage)
    const { pages } = useSelector((state) => state.allTypeProduct.typeProduct)

    const HandleChangePage = async (number) => {
        await dispatch(paginationTypeProduct(number))
        await dispatch(editCurrentPage(number))
    }

    return (
        <div className="list_TypeProduct ">
            <table>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên danh mục</th>
                        <th colSpan="3">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listTypes
                        ? listTypes.map((item, index) => (
                              <Type type={item} key={item._id} update={item._id} number={index} />
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

export default ListTypeProduct
