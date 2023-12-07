import React from 'react'
import { useEffect } from 'react'

import { handleDataProduct, handlePercentDiscount } from '../../untils/index'

import { useDispatch, useSelector } from 'react-redux'
import { editCurrentPage, paginationProduct } from '../../redux/actions/ProductAction'

import './AllProduct.css'
import ListProduct from './ListProduct/ListProduct'

import SortByPrice from './SortByPrice/SortByPrice'
import NavProduct from './NavProduct/NavProduct'
import PaginationCustomer from '../Pagination/PaginationCustomer'
import EmptyProduct from '../Search/EmptyProduct/EmptyProduct'

function AllProduct() {
    const dispatch = useDispatch()
    const { currentPage } = useSelector((state) => state.allProduct)
    const { pages } = useSelector((state) => state.allProduct.product)
    const { product } = useSelector((state) => state.allProduct)

    useEffect(() => {
        dispatch(paginationProduct(currentPage, 10))
    }, [dispatch, currentPage])

    const HandleChangePage = async (number) => {
        await dispatch(editCurrentPage(number))
        await dispatch(paginationProduct(number, 10))
    }

    const productData = handleDataProduct(product)

    return (
        <section id="hotsale iphone">
            <div className="hotsale">
                <div className="allProduct">
                    <div className="col-2">
                        <NavProduct />
                    </div>
                    <div className="col-10">
                        <div className="header_allProduct">
                            <div className="header_allProduct-title">Tất cả sản phẩm</div>
                            <div className="display_allProduct">
                                <span className="nav_title">Sắp xếp theo</span>
                                <SortByPrice products={product} />
                            </div>
                        </div>
                        {Array.isArray(productData) && productData.length ? (
                            <>
                                <ListProduct HotSaleProducts={handlePercentDiscount(productData)} />
                                {pages ? (
                                    <PaginationCustomer
                                        defaultCurrent={1}
                                        currentPage={currentPage}
                                        pages={pages}
                                        HandleChangePage={HandleChangePage}
                                    />
                                ) : (
                                    ''
                                )}
                            </>
                        ) : (
                            <EmptyProduct titleAll="Không tìm thấy sản phẩm" style={{ height: '600px' }} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AllProduct
