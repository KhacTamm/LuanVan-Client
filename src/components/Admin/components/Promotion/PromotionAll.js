import { Link } from 'react-router-dom'
import HeaderText from '../TextAdmin/HeaderText/HeaderText'

import { AiOutlinePlus } from 'react-icons/ai'

import './Promotion.css'
import config from '../../../../config'
import { useEffect } from 'react'
import { getAllPromotion } from '../../../../redux/actions/PromotionAction'
import { useDispatch, useSelector } from 'react-redux'
import PromotionList from './PromorionList'

function PromotionAll() {
    const dispatch = useDispatch()
    const { voucher } = useSelector((state) => state.allPromotion)

    useEffect(() => {
        dispatch(getAllPromotion())
    }, [dispatch])

    return (
        <div className="admin-promotion">
            <HeaderText lable="Quản lý khuyến mãi"></HeaderText>
            <div className="add-product">
                <Link to={config.routes.createPromotion} className="create-product_bottom">
                    <AiOutlinePlus className="create-product_icon" />
                </Link>
            </div>
            {voucher ? <PromotionList voucher={voucher}></PromotionList> : ''}
        </div>
    )
}

export default PromotionAll
