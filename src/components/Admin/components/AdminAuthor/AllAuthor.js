import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { paginationAuthor, removeSearchAuthor, searchAuthor } from '../../../../redux/actions/AuthorAction'

import config from '../../../../config'

import Empty from '../Empty/Empty'
import SearchEmpty from '../SearchEmpty/SearchEmpty'
import HeaderText from '../TextAdmin/HeaderText/HeaderText'
import ListAuthor from './ListAuthor'

import { AiOutlinePlus } from 'react-icons/ai'
import { SearchOutlined } from '@ant-design/icons'

function AllAuthor() {
    const dispatch = useDispatch()
    const { authorLists } = useSelector((state) => state.allAuthor.authorList)
    const currentPage = useSelector((state) => state.allAuthor.currentPage)

    const [search, setSearch] = useState('')
    const SearAuthor = useSelector((state) => state.searchAuthor)
    const { SearchAuthorResult } = SearAuthor

    useEffect(() => {
        dispatch(removeSearchAuthor())
        dispatch(paginationAuthor(currentPage))
    }, [dispatch, currentPage])

    const SearchAuthor = async (e) => {
        e.preventDefault()
        if (search.replaceAll(' ', '') && search !== '') {
            dispatch(searchAuthor(search.trim()))
        }
    }

    const GoBack = async () => {
        dispatch(removeSearchAuthor())
    }

    return (
        <div className="admin-author">
            <HeaderText lable="Quản lý tác giả" />
            <form onSubmit={(e) => SearchAuthor(e)} className="search-admin">
                <SearchOutlined />
                <input
                    value={search}
                    type="text"
                    name="search"
                    spellCheck={false}
                    autoComplete="off"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nhập tên tác giả..."
                />
                <button>Tìm kiếm</button>
            </form>

            {SearchAuthorResult ? (
                Array.isArray(SearchAuthorResult) && SearchAuthorResult.length && search !== '' ? (
                    <ListAuthor ListAuthor={SearchAuthorResult} search />
                ) : (
                    <SearchEmpty
                        title="tác giả "
                        keySearch={search}
                        titleBtn="Trở lại danh sách danh tác giả"
                        GoBack={GoBack}
                    />
                )
            ) : authorLists ? (
                <ListAuthor ListAuthor={authorLists} />
            ) : (
                <Empty path={`${config.routes.create}`} lable="Tác giả" />
            )}

            <div className="add-product">
                <Link to={config.routes.createAuthor} className="create-product_bottom">
                    <AiOutlinePlus className="create-product_icon" />
                </Link>
            </div>
        </div>
    )
}

export default AllAuthor
