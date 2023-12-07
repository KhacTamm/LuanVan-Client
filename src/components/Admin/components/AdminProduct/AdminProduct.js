import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../config'

import { useDispatch, useSelector } from 'react-redux'
import {
    paginationProduct,
    removeProductById,
    removeSearchProduct,
    searchProduct,
} from '../../../../redux/actions/ProductAction'

import { AiOutlinePlus } from 'react-icons/ai'
import './AdminProduct.css'
import { SearchOutlined } from '@ant-design/icons'

import ListProduct from './ListProduct'
import Empty from '../Empty/Empty'
import HeaderText from '../TextAdmin/HeaderText/HeaderText'
import SearchEmpty from '../SearchEmpty/SearchEmpty'

function AdminProduct() {
    const dispatch = useDispatch()
    const { currentPage } = useSelector((state) => state.allProduct)
    const { products } = useSelector((state) => state.allProduct.product)

    const [search, setSearch] = useState('')
    const SearProduct = useSelector((state) => state.searchProduct)
    const { searchProductResult } = SearProduct

    useEffect(() => {
        dispatch(removeProductById())
        dispatch(removeSearchProduct())
        dispatch(paginationProduct(currentPage))
    }, [dispatch, currentPage])

    const SearchProduct = async (e) => {
        e.preventDefault()

        if (search.replaceAll(' ', '') && search !== '') {
            dispatch(searchProduct(search.trim()))
        }
    }

    const GoBack = async () => {
        dispatch(removeSearchProduct())
    }

    return (
        <div className="admin-product">
            <HeaderText lable="Quản lý sản phẩm" />
            <form onSubmit={(e) => SearchProduct(e)} className="search-admin">
                <SearchOutlined />
                <input
                    value={search}
                    type="text"
                    name="search"
                    spellCheck={false}
                    autoComplete="off"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nhập tên sản phẩm..."
                />
                <button>Tìm kiếm</button>
            </form>

            {searchProductResult ? (
                Array.isArray(searchProductResult) && searchProductResult.length && search !== '' ? (
                    <ListProduct listProducts={searchProductResult} search />
                ) : (
                    <SearchEmpty
                        title="sản phẩm "
                        keySearch={search}
                        titleBtn="Trở lại danh sách sản phẩm"
                        GoBack={GoBack}
                    />
                )
            ) : products ? (
                <ListProduct listProducts={products} />
            ) : (
                <Empty path={`${config.routes.create}`} lable="sản phẩm" />
            )}

            <div className="add-product">
                <Link to={config.routes.create} className="create-product_bottom">
                    <AiOutlinePlus className="create-product_icon" />
                </Link>
            </div>
        </div>
    )
}

export default AdminProduct
