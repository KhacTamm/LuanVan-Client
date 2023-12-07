import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { paginationBrandProduct, removeSearchBrand, searchBrand } from '../../../../redux/actions/ListPublisherAction'

import config from '../../../../config'
import { handleDataBrand } from '../../../../untils'

import Empty from '../Empty/Empty'
import SearchEmpty from '../SearchEmpty/SearchEmpty'
import HeaderText from '../TextAdmin/HeaderText/HeaderText'
import ListAllPublisher from './ListAllPublisher'

import { AiOutlinePlus } from 'react-icons/ai'
import { SearchOutlined } from '@ant-design/icons'

import './AllPublisher.css'

export default function AllPublisher() {
    const dispatch = useDispatch()
    const { ListBrannd } = useSelector((state) => state.allBrandProduct)
    const currentPage = useSelector((state) => state.allBrandProduct.currentPage)

    const [search, setSearch] = useState('')
    const searchPublisher = useSelector((state) => state.searchBrand)
    const { SearchBrandReuslt } = searchPublisher

    useEffect(() => {
        dispatch(removeSearchBrand())
        dispatch(paginationBrandProduct(currentPage))
    }, [dispatch, currentPage])

    const SearchPublisher = async (e) => {
        e.preventDefault()
        if (search.replaceAll(' ', '') && search !== '') {
            dispatch(searchBrand(search.trim()))
        }
    }

    const GoBack = async () => {
        dispatch(removeSearchBrand())
    }

    return (
        <div className="admin-publisher">
            <HeaderText lable="Quản lý nhà xuất bản"></HeaderText>
            <form onSubmit={(e) => SearchPublisher(e)} className="search-admin">
                <SearchOutlined />
                <input
                    defaultValue={setSearch}
                    type="text"
                    name="search"
                    spellCheck={false}
                    autoComplete="off"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nhập tên nhà xuất bản ..."
                />
                <button>Tìm kiếm</button>
            </form>
            {SearchBrandReuslt ? (
                Array.isArray(SearchBrandReuslt) && SearchBrandReuslt.length && search !== '' ? (
                    <ListAllPublisher ListBrannds={SearchBrandReuslt} search />
                ) : (
                    <SearchEmpty
                        title="nhà xuất bản "
                        keySearch={search}
                        titleBtn="Trở lại danh sách NXB"
                        GoBack={GoBack}
                    />
                )
            ) : Array.isArray(handleDataBrand(ListBrannd)) ? (
                <ListAllPublisher ListBrannds={handleDataBrand(ListBrannd)} />
            ) : (
                <Empty path={`${config.routes.createBrand}`} lable="nhà xuất bản" />
            )}

            <div className="add-product">
                <Link to={config.routes.createPublisher} className="create-product_bottom">
                    <AiOutlinePlus className="create-product_icon" />
                </Link>
            </div>
        </div>
    )
}
