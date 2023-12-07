import React, { useEffect } from 'react'
import Carousel from '../components/Slider/Carousel'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import OutstandingAuthor from '../components/outstandingAuthor/OutstandingAuthor'
import Brands from '../components/brands/Brands'
import ListProduct from '../components/allProduct/ListProduct/ListProduct'

import { calculateTime, handleDataAuthor, handleDataBrand, handleDataProduct, handlePercentDiscount } from '../untils'
import { useDispatch, useSelector } from 'react-redux'

import { getAllProduct } from '../redux/actions/ProductAction'
import { getAllTypeProduct } from '../redux/actions/ListTypeProductAction'
import { getAllBrandProduct } from '../redux/actions/ListPublisherAction'

import { getAllAuthor } from '../redux/actions/AuthorAction'

function HomePage() {
    const dispatch = useDispatch()

    const { product } = useSelector((state) => state.allProduct)
    const { authorList } = useSelector((state) => state.allAuthor)
    const { ListBrannd } = useSelector((state) => state.allBrandProduct)

    const productformat = handleDataProduct(product)

    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getAllTypeProduct())
        dispatch(getAllAuthor())
        dispatch(getAllBrandProduct())
    }, [dispatch])

    // 1 Ngày = 86400000 Mili giây	10 Ngày = 864000000 Mili giây	2500 Ngày = 216000000000 Mili giây
    // 2 Ngày = 172800000 Mili giây	20 Ngày = 1728000000 Mili giây	5000 Ngày = 432000000000 Mili giây
    // 3 Ngày = 259200000 Mili giây	30 Ngày = 2592000000 Mili giây	10000 Ngày = 864000000000 Mili giây
    // 4 Ngày = 345600000 Mili giây	40 Ngày = 3456000000 Mili giây	25000 Ngày = 2160000000000 Mili giây
    // 5 Ngày = 432000000 Mili giây	50 Ngày = 4320000000 Mili giây	50000 Ngày = 4320000000000 Mili giây
    // 6 Ngày = 518400000 Mili giây	100 Ngày = 8640000000 Mili giây	100000 Ngày = 8640000000000 Mili giây
    // 7 Ngày = 604800000 Mili giây	250 Ngày = 21600000000 Mili giây	250000 Ngày = 21600000000000 Mili giây
    // 8 Ngày = 691200000 Mili giây	500 Ngày = 43200000000 Mili giây	500000 Ngày = 43200000000000 Mili giây
    // 9 Ngày = 777600000 Mili giây	1000 Ngày = 86400000000 Mili giây	1000000 Ngày = 86400000000000 Mili giây

    const newProduct =
        Array.isArray(productformat) && productformat.length > 0
            ? productformat.filter((items) => calculateTime(items.createdAt, 1728000000) <= 1)
            : ''

    const bestSeller =
        Array.isArray(productformat) && productformat.length > 0
            ? productformat.filter((items) => calculateTime(items.updatedAt, 604800000) <= 1 && items.rating >= 1000)
            : ''

    return (
        <div style={{ position: 'relative' }}>
            <Carousel />

            <div style={{ marginTop: '45px' }}>
                {authorList ? <OutstandingAuthor authorList={handleDataAuthor(authorList)} /> : ''}

                {Array.isArray(productformat) && productformat.length ? (
                    <div className="mt-5">
                        <ListProduct
                            slider
                            HotSaleProducts={handlePercentDiscount(productformat)}
                            discount={30}
                            title="GIÁ TỐT MỖI NGÀY"
                        />
                    </div>
                ) : (
                    ''
                )}

                <div className="mt-5">
                    {bestSeller.length ? (
                        <ListProduct
                            slider
                            HotSaleProducts={handlePercentDiscount(bestSeller.reverse())}
                            title="Sách bán chạy"
                        />
                    ) : (
                        ''
                    )}
                </div>
                {ListBrannd ? <Brands ListBrannd={handleDataBrand(ListBrannd)} /> : ''}

                <div className="mt-5">
                    {newProduct.length ? (
                        <ListProduct
                            slider
                            HotSaleProducts={handlePercentDiscount(newProduct.reverse())}
                            title="Sách mới"
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <ScrollToTop></ScrollToTop>
        </div>
    )
}

export default HomePage
