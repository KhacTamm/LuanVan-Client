import React, { useState } from 'react'

import OutstandingAuthorItem from './OutstandingAuthorItem'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './OutstandingAuthor.css'
import HeaderText from '../Text/HeaderText'

function OutstandingAuthor(props) {
    const { authorList } = props

    const [sliderRef, setSliderRef] = useState(null)
    const sliderSettings = {
        // removes default buttons
        draggable: false,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        // infinite: true,
    }

    return (
        <section className="home-wrapper-3 mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="categories">
                        <HeaderText title="TÁC GIẢ NỔI BẬT" />
                        <div className="content align-items-start">
                            {authorList.length > 6 ? (
                                <Slider ref={setSliderRef} {...sliderSettings}>
                                    {authorList
                                        ? authorList.map((item, index) =>
                                              item.visible ? <OutstandingAuthorItem key={index} items={item} /> : '',
                                          )
                                        : ''}
                                </Slider>
                            ) : (
                                <div className="d-flex justify-content-start categories-noslick">
                                    {authorList
                                        ? authorList.map((item, index) => (
                                              <OutstandingAuthorItem key={index} items={item} />
                                          ))
                                        : ''}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OutstandingAuthor
