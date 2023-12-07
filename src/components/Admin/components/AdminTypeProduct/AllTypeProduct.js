import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../config'

import { useDispatch, useSelector } from 'react-redux'
import { paginationTypeProduct, removeSearchType, searchType } from '../../../../redux/actions/ListTypeProductAction'

import { AiOutlinePlus } from 'react-icons/ai'
import './TypeProduct.css'

import Empty from '../Empty/Empty'
import ListTypeProduct from './ListTypeProduct'
import HeaderText from '../TextAdmin/HeaderText/HeaderText'
import { SearchOutlined } from '@ant-design/icons'
import { handleDataType } from '../../../../untils'
import SearchEmpty from '../SearchEmpty/SearchEmpty'

export default function AllTypeProduct() {
    const dispatch = useDispatch()
    const { typeProduct } = useSelector((state) => state.allTypeProduct)
    const currentPage = useSelector((state) => state.allTypeProduct.currentPage)

    const [search, setSearch] = useState('')
    const searchtype = useSelector((state) => state.searchType)
    const { searchTypeResult } = searchtype

    useEffect(() => {
        dispatch(removeSearchType())
        dispatch(paginationTypeProduct(currentPage))
    }, [dispatch, currentPage])

    const SearchType = async (e) => {
        e.preventDefault()
        if (search.replaceAll(' ', '') && search !== '') {
            dispatch(searchType(search.trim()))
        }
    }

    const GoBack = async () => {
        dispatch(removeSearchType())
    }

    return (
        <div className="admin-TypeProduct">
            <div className="admin-TypeProduct_header">
                <HeaderText lable="Quản lý danh mục"></HeaderText>
                <form onSubmit={(e) => SearchType(e)} className="search-admin">
                    <SearchOutlined />
                    <input
                        defaultValue={setSearch}
                        type="text"
                        name="search"
                        spellCheck={false}
                        autoComplete="off"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Nhập tên danh mục sách ..."
                    />
                    <button>Tìm kiếm</button>
                </form>
            </div>
            {searchTypeResult ? (
                Array.isArray(searchTypeResult) && searchTypeResult.length && search !== '' ? (
                    <ListTypeProduct listTypes={searchTypeResult} search />
                ) : (
                    <SearchEmpty
                        title="danh mục sách "
                        keySearch={search}
                        titleBtn="Trở lại danh sách danh mục sách"
                        GoBack={GoBack}
                    />
                )
            ) : Array.isArray(handleDataType(typeProduct)) ? (
                <ListTypeProduct listTypes={handleDataType(typeProduct)}></ListTypeProduct>
            ) : (
                <Empty path={`${config.routes.createType}`} lable="danh mục sách" />
            )}

            <div className="add-product">
                <Link to={config.routes.createType} className="create-product_bottom">
                    <AiOutlinePlus className="create-product_icon" />
                </Link>
            </div>
        </div>
    )
}
