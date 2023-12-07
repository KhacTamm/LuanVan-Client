import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { editCurrentPage, paginationAuthor } from '../../../../redux/actions/AuthorAction'

import Author from './Author'

import { Pagination } from 'antd'
import './AdminAuthor.css'

function ListAuthor(props) {
    const dispatch = useDispatch()
    const { ListAuthor, search } = props

    const currentPage = useSelector((state) => state.allAuthor.currentPage)
    const { pages } = useSelector((state) => state.allAuthor.authorList)

    const HandleChangePage = async (number) => {
        await dispatch(paginationAuthor(number))
        await dispatch(editCurrentPage(number))
    }

    return (
        <div className="list_authour">
            <table>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên tác giả</th>
                        <th scope="col">Tác phẩm</th>
                        <th colSpan="3" style={{ textAlign: 'center' }}>
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(ListAuthor) && ListAuthor.length
                        ? ListAuthor.map((item, index) => (
                              <Author author={item} key={item._id} update={item._id} number={index}></Author>
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

export default ListAuthor
