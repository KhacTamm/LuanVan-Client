import { useDispatch } from 'react-redux'
import {
    ascendingFilterProduct,
    ascendingSearchProduct,
    descendingFilterProduct,
    descendingSearchProduct,
} from '../../../redux/actions/ProductAction'

import { DownOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function SortByPrice(props) {
    const dispatch = useDispatch()
    const { products, search } = props
    const [lable, setLable] = useState('Giá')
    const [show, setShow] = useState(false)

    const ThapDenCao = () => {
        setLable('Thấp đến cao')
        search ? dispatch(descendingSearchProduct(products)) : dispatch(descendingFilterProduct(products))
    }

    const CaoDenThap = () => {
        setLable('Cao đến thấp')
        search ? dispatch(ascendingSearchProduct(products)) : dispatch(ascendingFilterProduct(products))
    }

    return (
        <div className="sort-price" onClick={() => setShow(!show)}>
            <div className="sort-price-title" onClick={(e) => e.preventDefault()}>
                <span className="sort-price-label">{lable}</span>
                <DownOutlined className="sort-price-icon" />
            </div>
            {show ? (
                <div className="sort-price-list">
                    <div className="sort-price-list-item" onClick={ThapDenCao}>
                        <span onClick={() => setShow(!show)}>Thấp đến cao</span>
                    </div>
                    <div className="sort-price-list-item" onClick={CaoDenThap}>
                        <span onClick={() => setShow(!show)}>Cao đến thấp</span>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
