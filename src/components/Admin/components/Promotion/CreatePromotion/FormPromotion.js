import { Link, useNavigate, useParams } from 'react-router-dom'
import HeaderText from '../../TextAdmin/HeaderText/HeaderText'
import { GiReturnArrow } from 'react-icons/gi'
import config from '../../../../../config'
import InputCustomer from '../../FromComponents/InputCustomer/InputCustomer'
import ButtonCustomer from '../../FromComponents/ButtonCustomer/ButtonCustomer'
import { useForm } from 'react-hook-form'

import './FormPromotion.css'
import { getPromotionById, removePromotionById, savePromotion } from '../../../../../redux/actions/PromotionAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { success } from '../../../../Message/Message'

function FormPromotion() {
    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams()
    const { voucherId } = useSelector((state) => state.getPromotionById)
    const { handleSubmit, register } = useForm({ defaultValues: {} })

    useEffect(() => {
        if (id) {
            dispatch(getPromotionById(id))
        }

        return () => {
            dispatch(removePromotionById())
        }
    }, [dispatch, id])

    const onSubmit = async (data, e) => {
        e.preventDefault()
        let formData = new FormData()
        if (id) {
            formData.append('_id', id)
        }
        formData.append('name', data.name ? data.name : voucherId ? voucherId.name : '')
        formData.append('limmit', data.limmit ? data.limmit : voucherId ? voucherId.limmit : '')
        formData.append('condition', data.condition ? data.condition : voucherId ? voucherId.condition : '')
        formData.append('qty', data.qty ? data.qty : voucherId ? voucherId.qty : '')
        formData.append('dayStart', data.dayStart ? data.dayStart : voucherId ? voucherId.dayStart : '')
        formData.append('dayEnd', data.dayEnd ? data.dayEnd : voucherId ? voucherId.dayEnd : '')
        await dispatch(savePromotion(formData))
        success(id && voucherId ? 'Cập nhật khuyến mãi thành công' : 'Thêm khuyến mãi thành công')
        history('/admin/promotion')
    }
    return (
        <div className="admin-TypeProduct">
            <div>
                <HeaderText lable={id ? 'Cập nhật khuyến mãi' : 'Thêm khuyến mãi'}>
                    <Link to={config.routes.promotion}>
                        <GiReturnArrow />
                    </Link>
                </HeaderText>
                <div className="admim-create_type">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputCustomer lable="Mã khuyến mãi">
                            <input
                                {...register('name')}
                                placeholder="Nhập mã khuyến mãi "
                                autoComplete="off"
                                defaultValue={voucherId ? voucherId.name : ''}
                            ></input>
                        </InputCustomer>

                        <div className="form-voucher-setting">
                            <h4>Thiết lập mã giảm giá</h4>
                            <div className="form-voucher-item">
                                <p className="form-voucher-item_lable">Mức giảm</p>
                                <input
                                    {...register('limmit')}
                                    autoComplete="off"
                                    placeholder="₫"
                                    defaultValue={voucherId ? voucherId.limmit : ''}
                                ></input>
                            </div>
                            <div className="form-voucher-item">
                                <p className="form-voucher-item_lable">Đơn tối thiểu</p>
                                <input
                                    {...register('condition')}
                                    autoComplete="off"
                                    placeholder="₫"
                                    defaultValue={voucherId ? voucherId.condition : ''}
                                ></input>
                            </div>
                            <div className="form-voucher-item">
                                <p className="form-voucher-item_lable">Tổng số lượt sử dụng tối đa</p>

                                <input
                                    {...register('qty')}
                                    autoComplete="off"
                                    type="number"
                                    defaultValue={voucherId ? voucherId.qty : ''}
                                ></input>
                            </div>
                            <h4>Thiết lập thời gian</h4>
                            <div className="form-voucher-item">
                                <p className="form-voucher-item_lable">Thời gian bắt đầu</p>
                                {/* <input {...register('dayStart')} type="date" name="birthday" /> */}
                                <input
                                    {...register('dayStart')}
                                    autoComplete="off"
                                    type="date"
                                    defaultValue={
                                        voucherId && voucherId.dayStart ? voucherId.dayStart.slice(0, 10) : ''
                                    }
                                ></input>
                            </div>
                            <div className="form-voucher-item">
                                <p className="form-voucher-item_lable">Thời gian kết thúc</p>
                                <input
                                    {...register('dayEnd')}
                                    autoComplete="off"
                                    type="date"
                                    defaultValue={voucherId && voucherId.dayEnd ? voucherId.dayEnd.slice(0, 10) : ''}
                                ></input>
                            </div>
                        </div>

                        <ButtonCustomer type="submit">
                            {id && voucherId ? 'Cập nhật khuyến mãi' : 'Thêm khuyến mãi'}
                        </ButtonCustomer>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormPromotion
