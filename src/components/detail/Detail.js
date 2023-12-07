import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getproductById } from '../../redux/actions/ProductAction'

import './Detail.css'
import DetailInfo from './DetailInfo/DetailInfo'
import AboutProduct from './AboutProduct/AboutProduct'
import AlsoLikeProduct from './AlsoLikeProduct/AlsoLikeProduct'

function Detail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const detailProduct = useSelector((state) => state.getProductById.product)

    useEffect(() => {
        dispatch(getproductById(id))
    }, [dispatch, id])

    return (
        <section id="detail">
            {detailProduct ? (
                <div className="detail">
                    <div className="detail_item">
                        <div className="detail-info">
                            <DetailInfo product={detailProduct ? detailProduct : ''}></DetailInfo>
                        </div>
                        <AboutProduct />
                    </div>
                    {/* <div className="similar_product">
                        <SimilarProduct author={detailProduct.author} currentProduct={detailProduct._id} />
                    </div> */}
                    <div className="alsoLike_product" style={{ marginTop: '32px' }}>
                        <AlsoLikeProduct
                            productName={detailProduct ? detailProduct.name : ''}
                            author={detailProduct.author}
                            currentProduct={detailProduct._id}
                        />
                    </div>
                </div>
            ) : (
                ''
            )}
        </section>
    )
}

export default Detail
