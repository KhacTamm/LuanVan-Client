import React from 'react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getBrandById, removeBrandById } from '../../redux/actions/ListPublisherAction'
import { getTypeById, removeTypeById } from '../../redux/actions/ListTypeProductAction'

import './Search.css'
import {
    getAllProductByBrand,
    getAllProductByType,
    removeCurrentProductFilter,
} from '../../redux/actions/ProductAction'
import Loading from '../Loading/Loading'
import HeaderFilter from './HeaderFilter/HeaderFilter'
import { handlePercentDiscount } from '../../untils'
import ListProduct from '../allProduct/ListProduct/ListProduct'

function ProductFilter() {
    const { typeId } = useSelector((state) => state.getTypeById)
    const { brandId } = useSelector((state) => state.getBrandById)
    const { productFilter } = useSelector((state) => state.allProduct)

    let location = useLocation()
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(removeCurrentProductFilter())
        if (location.pathname.includes('type')) {
            dispatch(getTypeById(id))
        } else {
            dispatch(getBrandById(id))
        }
        return () => {
            if (location.pathname.includes('type')) {
                dispatch(removeTypeById())
            } else {
                dispatch(removeBrandById())
            }
        }
    }, [dispatch, id, location.pathname])

    useEffect(() => {
        const filter = true
        if (typeId && typeId.name) {
            dispatch(getAllProductByType(typeId.name, filter))
        } else if (brandId && brandId.name) {
            dispatch(getAllProductByBrand(brandId.name, filter))
        }
    }, [dispatch, typeId, brandId])

    return (
        <section id="hotsale iphone">
            {typeId || brandId ? (
                <div className="hotsale">
                    <HeaderFilter name={typeId ? typeId.name : brandId ? brandId.name : ''} product={productFilter} />
                    {productFilter && productFilter.length > 0 ? (
                        <ListProduct HotSaleProducts={handlePercentDiscount(productFilter)} />
                    ) : (
                        <Loading />
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </section>
    )
}

export default ProductFilter
