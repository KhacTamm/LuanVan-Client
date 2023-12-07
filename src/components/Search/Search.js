import React from 'react'
import { useSelector } from 'react-redux'
import { handlePercentDiscount } from '../../untils/index'

import { BsSearch } from 'react-icons/bs'
import './Search.css'

import ListProduct from '../allProduct/ListProduct/ListProduct'
import NotFoundSearch from './NotFoundSearch/NotFoundSearch.js'
import { useParams } from 'react-router-dom'
import SortByPrice from './SortByPrice/SortByPrice.js'

function Search() {
    const searchProduct = useSelector((state) => state.searchProduct)
    const params = useParams()
    const { searchProductResult } = searchProduct

    const { name } = params

    return (
        <section id="hotsale iphone">
            <div className="title_search">
                <p>
                    <BsSearch style={{ marginRight: ' 6px', fontSize: '2.2rem' }} />
                    Kết quả tìm kiếm cho từ khoá "
                    <span style={{ color: 'rgb(109, 121, 181)', fontWeight: '600' }}>{name}</span>"
                </p>
                {searchProductResult && searchProductResult.length > 0 ? (
                    <SortByPrice products={searchProductResult} search={true} />
                ) : (
                    ''
                )}
            </div>
            <div className="hotsale">
                {Array.isArray(searchProductResult) && searchProductResult.length ? (
                    <ListProduct HotSaleProducts={handlePercentDiscount(searchProductResult)} />
                ) : (
                    <NotFoundSearch></NotFoundSearch>
                )}
            </div>
        </section>
    )
}

export default Search
