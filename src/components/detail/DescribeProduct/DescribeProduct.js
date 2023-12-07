import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './DescribeProduct.css'

function DescribeProduct() {
    const detailProduct = useSelector((state) => state.getProductById.product)
    const [styleBlog, setStyleBlog] = useState({
        height: '100%',
    })

    return (
        <section id="blog">
            {detailProduct.detail ? (
                <div className="blog">
                    <div className="blog-content" style={styleBlog}>
                        <div dangerouslySetInnerHTML={{ __html: detailProduct.detail }} />
                    </div>
                </div>
            ) : (
                ''
            )}
        </section>
    )
}

export default DescribeProduct
