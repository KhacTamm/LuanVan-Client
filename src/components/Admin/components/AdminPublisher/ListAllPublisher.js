import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { editCurrentPage, paginationBrandProduct } from '../../../../redux/actions/ListPublisherAction'

import Publisher from './Publisher'

import { Pagination } from 'antd'
import './AllPublisher.css'

function ListAllPublisher(props) {
    const dispatch = useDispatch()
    const { ListBrannds, search } = props

    const currentPage = useSelector((state) => state.allBrandProduct.currentPage)
    const { pages } = useSelector((state) => state.allBrandProduct.ListBrannd)

    const HandleChangePage = async (number) => {
        await dispatch(paginationBrandProduct(number))
        await dispatch(editCurrentPage(number))
    }

    return (
        <div className="list_publisher ">
            <table>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên nhà xuất bản</th>
                        <th colSpan="3">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(ListBrannds)
                        ? ListBrannds.map((item, index) => (
                              <Publisher publisher={item} key={item._id} update={item._id} number={index}></Publisher>
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

export default ListAllPublisher
