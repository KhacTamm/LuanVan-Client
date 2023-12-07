import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getAllUser, removeSearchUser, searchUser } from '../../../../redux/actions/UserAction'

import config from '../../../../config'

import SearchEmpty from '../SearchEmpty/SearchEmpty'
import HeaderText from '../TextAdmin/HeaderText/HeaderText'
import ListUser from './ListUser'

import './AdminUser.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { SearchOutlined } from '@ant-design/icons'

function AdminUser() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.getUsers.user)

    const [search, setSearch] = useState('')
    const userSearch = useSelector((state) => state.searchUser)
    const { searchUserResult } = userSearch

    useEffect(() => {
        dispatch(removeSearchUser())
        dispatch(getAllUser())
    }, [dispatch])

    const SearchUser = async (e) => {
        e.preventDefault()
        if (search.replaceAll(' ', '') && search !== '') {
            dispatch(searchUser(search.trim()))
        }
    }

    const GoBack = async () => {
        await setSearch('')
        dispatch(removeSearchUser())
    }

    return (
        <>
            <div className="admin-list-customer">
                <HeaderText lable="Danh sách khách hàng"></HeaderText>
                <form onSubmit={(e) => SearchUser(e)} className="search-admin">
                    <SearchOutlined />
                    <input
                        value={search}
                        type="text"
                        name="search"
                        spellCheck={false}
                        autoComplete="off"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Nhập tên khách hàng..."
                    />
                    <button>Tìm kiếm</button>
                </form>

                {searchUserResult ? (
                    Array.isArray(searchUserResult) && searchUserResult.length && search !== '' ? (
                        <ListUser users={searchUserResult} search />
                    ) : (
                        <SearchEmpty
                            title="tài khoản"
                            keySearch={search}
                            titleBtn="Trở lại danh sách tài khoản"
                            GoBack={GoBack}
                        />
                    )
                ) : users ? (
                    <ListUser users={users} />
                ) : (
                    <h2> Loading</h2>
                )}

                <div className="add-product">
                    <Link to={config.routes.createCustomer} className="create-product_bottom">
                        <AiOutlinePlus className="create-product_icon" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AdminUser
