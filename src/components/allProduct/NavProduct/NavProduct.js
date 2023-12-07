import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTypeProduct } from '../../../redux/actions/ListTypeProductAction'
import { getAllProductByType, getAllProductByBrand } from '../../../redux/actions/ProductAction'

import { getAllBrandProduct } from '../../../redux/actions/ListPublisherAction'

import './NavProduct.css'
import FilterProduct from '../FilterProduct/FilterProduct'
import { BsCheck } from 'react-icons/bs'

function NavProduct() {
    const dispatch = useDispatch()

    const { typeProduct } = useSelector((state) => state.allTypeProduct)
    const { ListBrannd } = useSelector((state) => state.allBrandProduct)
    const [activeType, setActiveType] = useState('')
    const [activeBrand, setActiveBrand] = useState('')

    useEffect(() => {
        dispatch(getAllTypeProduct())

        return () => {
            return []
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllBrandProduct())

        return () => {
            return []
        }
    }, [dispatch])

    const HandleFilterProductByType = async (type) => {
        setActiveBrand('')
        setActiveType(type)
        await dispatch(getAllProductByType(type))
    }

    const HandleFilterProductByBrand = async (brand) => {
        setActiveType('')
        setActiveBrand(brand)
        await dispatch(getAllProductByBrand(brand))
    }

    const NavTypeProductItems = (type, index) => (
        <div
            key={index}
            onClick={() => HandleFilterProductByType(type.name)}
            className={activeType === type.name ? `navProduct_item active` : 'navProduct_item'}
        >
            <p>
                <p className="radio-nav-product">
                    <BsCheck className="radio-nav-product_check" style={{ fontSize: '3rem' }} />
                </p>
            </p>
            <span className="typeName">{type.name}</span>
        </div>
    )

    const NavBrandProductItems = (brand, index) => (
        <div
            key={index}
            className={activeBrand === brand.name ? `navProduct_item active` : 'navProduct_item'}
            onClick={() => HandleFilterProductByBrand(brand.name)}
        >
            <p>
                <p className="radio-nav-product">
                    <BsCheck className="radio-nav-product_check" style={{ fontSize: '3rem' }} />
                </p>
            </p>
            <span className="typeName">{brand.name}</span>
        </div>
    )

    return (
        <div className="navProduct">
            <div className="navProduct_content">
                <div className="navProduct_title">Danh mục</div>
                <div className="navProduct_content-item">
                    {typeProduct
                        ? typeProduct.map((type, index) => (type.visible ? NavTypeProductItems(type, index) : ''))
                        : ''}
                </div>
            </div>
            <div className="navProduct_content">
                <div className="navProduct_title">Nhà xuất bản</div>
                <div className="navProduct_content-item">
                    {ListBrannd
                        ? ListBrannd.map((brand, index) => (brand.visible ? NavBrandProductItems(brand, index) : ''))
                        : ''}
                </div>
            </div>
            <div className="navProduct_content">
                <div className="navProduct_title">Khoảng Giá</div>
                <FilterProduct />
            </div>
        </div>
    )
}

export default NavProduct
