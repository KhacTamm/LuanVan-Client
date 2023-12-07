import React from 'react'
import Marquee from 'react-fast-marquee'

import './Brands.css'

import BrandItem from './BrandItem'

function Brands(props) {
    const { ListBrannd } = props

    return (
        <section className="marque-wrapper py-4">
            <div className="row">
                <div className="col-12">
                    <div className="marquee-inner-wrapper card-wrapper">
                        <Marquee className="d-flex align-items-center justify-content-between">
                            {ListBrannd
                                ? ListBrannd.map((brand, index) =>
                                      brand.visible ? <BrandItem items={brand} key={index} /> : '',
                                  )
                                : ''}
                        </Marquee>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Brands
