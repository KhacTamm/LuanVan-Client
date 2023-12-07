import React from 'react'
import { Tabs } from 'antd'
import './AboutProduct.css'
import RateStar from '../RateStar/RateStar'
import Specifications from '../Specifications/Specifications'
import DescribeProduct from '../DescribeProduct/DescribeProduct'
import { useSelector } from 'react-redux'
// import CommentProduct from '../CommentProduct/CommentProduct'

function AboutProduct(props) {
    const detailProduct = useSelector((state) => state.getProductById.product)

    const menu = [
        {
            title: 'Thông tin sản phẩm',
            children: <Specifications product={detailProduct}></Specifications>,
        },
        {
            title: 'Mô tả sản phẩm',
            children: <DescribeProduct />,
        },
        {
            title: 'Đánh giá sản phẩm',
            children: <RateStar></RateStar>,
            // children: <CommentProduct></CommentProduct>,
        },
    ]

    return (
        <Tabs
            // onChange={onChange}
            type="card"
            items={menu.map((item, i) => {
                const id = String(i + 1)
                return {
                    label: `${item.title}`,
                    key: id,
                    children: item.children,
                }
            })}
        />
    )
}

export default AboutProduct
