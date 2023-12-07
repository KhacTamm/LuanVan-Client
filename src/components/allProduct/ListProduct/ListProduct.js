import React from 'react'
import { useState } from 'react'
import Slider from 'react-slick'
import './ListProduct.css'
import Product from '../Product/Product'

function ListProduct(props) {
    const { HotSaleProducts, discount, title, slider, author, pagedetail } = props

    const [sliderRef, setSliderRef] = useState(null)
    const sliderSettings = {
        draggable: false,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplaySpeed: 3000,
        infinite: false,
    }

    return (
        <div className="listproduct row">
            {title ? (
                <div className="title_listProduct">
                    {pagedetail ? (
                        <span className="title_listProduct-title-pagedetail">{title}</span>
                    ) : (
                        <span className="title_listProduct-title">{title}</span>
                    )}
                </div>
            ) : (
                ''
            )}
            {slider && Array.isArray(HotSaleProducts) && HotSaleProducts.length > 6 ? (
                <Slider ref={setSliderRef} {...sliderSettings}>
                    {HotSaleProducts.map((product, index) =>
                        discount ? (
                            product.percentDiscount >= discount ? (
                                product.amount > 0 && product.visible ? (
                                    <Product product={product} key={index} />
                                ) : (
                                    ''
                                )
                            ) : (
                                ''
                            )
                        ) : product.amount > 0 && product.visible ? (
                            <Product product={product} key={index} />
                        ) : (
                            ''
                        ),
                    )}
                </Slider>
            ) : (
                <>
                    {Array.isArray(HotSaleProducts) && HotSaleProducts.length >= 0
                        ? HotSaleProducts.map((product, index) =>
                              discount ? (
                                  product.percentDiscount >= discount ? (
                                      product.amount > 0 && product.visible ? (
                                          <Product product={product} key={index} />
                                      ) : (
                                          ''
                                      )
                                  ) : (
                                      ''
                                  )
                              ) : product.amount > 0 && product.visible ? (
                                  <Product product={product} key={index} />
                              ) : (
                                  ''
                              ),
                          )
                        : ''}
                </>
            )}
        </div>
    )
}

export default ListProduct
