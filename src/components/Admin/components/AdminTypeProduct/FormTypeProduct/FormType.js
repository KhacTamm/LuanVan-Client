import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
    getAllTypeProduct,
    getTypeById,
    removeTypeById,
    saveType,
} from '../../../../../redux/actions/ListTypeProductAction'
// import { editCurrentPage } from '../../../../../redux/actions/ListTypeProductAction'

import config from '../../../../../config'

import HeaderText from '../../TextAdmin/HeaderText/HeaderText'
import InputCustomer from '../../FromComponents/InputCustomer/InputCustomer'
import ButtonCustomer from '../../FromComponents/ButtonCustomer/ButtonCustomer'

import { GiReturnArrow } from 'react-icons/gi'
import './FormType.css'
import { useEffect } from 'react'
import { Checkbox } from 'antd'
import { success } from '../../../../Message/Message'

export default function FormType() {
    const { handleSubmit, register } = useForm({ defaultValues: {} })
    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(getTypeById(id))
        }

        return () => {
            dispatch(removeTypeById())
        }
    }, [dispatch, id])

    const detailType = useSelector((state) => state.getTypeById.typeId)
    const [visible, setVisible] = useState(detailType ? detailType.visible : '')

    const SetVisible = () => {
        setVisible(!visible)
        if (detailType) {
            detailType.visible = !visible
        }
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()
        let formData = new FormData()
        if (id) {
            formData.append('_id', id)
        }
        formData.append('name', data.name ? data.name : detailType ? detailType.name : '')
        formData.append('visible', detailType ? detailType.visible : visible)

        await dispatch(saveType(formData))
        await dispatch(getAllTypeProduct())
        e.target.reset()
        detailType ? success('Cập nhật danh mục thành công') : success('Thêm danh mục thành công')
        history('/admin/typeList')
    }

    return (
        <div className="admin-TypeProduct">
            <HeaderText lable={detailType ? 'Cập nhật danh mục' : 'Thêm danh mục'}>
                <Link to={config.routes.category}>
                    <GiReturnArrow />
                </Link>
            </HeaderText>
            <div>
                <div className="admim-create_type">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputCustomer lable="Tên nhà xuất bản">
                            <input
                                {...register('name')}
                                placeholder="Nhập tên nhà xuất bản"
                                autoComplete="off"
                                defaultValue={detailType ? detailType.name : ''}
                            ></input>
                        </InputCustomer>
                        <div onClick={() => SetVisible()} className="d-flex py-4 align-items-center">
                            <Checkbox
                                checked={(detailType && detailType.visible) || visible}
                                size="large"
                                style={{
                                    lineHeight: '40px',
                                    paddingRight: '6px',
                                }}
                            />
                            <div
                                style={{ fontSize: '1.6rem', fontWeight: '600', userSelect: 'none', cursor: 'pointer' }}
                            >
                                Hiển thị danh mục
                            </div>
                        </div>

                        <ButtonCustomer type="submit">
                            {detailType ? 'Cập nhật nhà xuất bản' : 'Thêm nhà xuất bản'}
                        </ButtonCustomer>
                    </form>
                </div>
            </div>
        </div>
    )
}
