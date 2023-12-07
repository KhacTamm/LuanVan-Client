import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { handleDataType } from '../../untils'

import './Carousel.css'

function Carousel() {
    const history = useNavigate()
    const { typeProduct } = useSelector((state) => state.allTypeProduct)

    const HandleFilterProductByType = async (type) => {
        history(`/search/type/${type._id}`)
    }

    const NavTypeProductItems = (type, index) => (
        <div key={index} onClick={() => HandleFilterProductByType(type)} className="home-navCategory_item">
            <p className="typeName">{type.name}</p>
        </div>
    )

    return (
        <section id="carousel">
            <div className="carousel">
                <div className="carousel-right">
                    <div className="carousel_category_content">
                        <div className="carousel_category_title">Danh mục sách</div>
                        <div className="carousel_category_content-item">
                            {typeProduct
                                ? handleDataType(typeProduct).map((type, index) =>
                                      type.visible ? NavTypeProductItems(type, index) : '',
                                  )
                                : ''}
                        </div>
                    </div>
                </div>
                <div className="carousel-left">
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="3"
                                aria-label="Slide 4"
                            ></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    alt="img"
                                    src="	https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner/0/0/0/2485_new.jpg?v=1&w=1580&h=400"
                                ></img>
                                <div className="carousel-caption d-none d-md-block"></div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    alt="img"
                                    src="https://theme.hstatic.net/1000363117/1000911694/14/ms_banner_img4.jpg?v=437"
                                ></img>
                                <div className="carousel-caption d-none d-md-block"></div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    alt="img"
                                    src="https://theme.hstatic.net/1000363117/1000911694/14/ms_banner_img5.jpg?v=437"
                                ></img>
                                <div className="carousel-caption d-none d-md-block"></div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    alt="img"
                                    src="http://static.nhanam.com.vn/thumb/0x0/crop/Features/Images/2023/6/2/B2ZJL1L1.jpg"
                                ></img>
                                <div className="carousel-caption d-none d-md-block"></div>
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Carousel
