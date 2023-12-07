import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getBrandById, removeBrandById, saveBrand } from '../../../../../redux/actions/ListPublisherAction'

import { useForm } from 'react-hook-form'
import config from '../../../../../config'

import { GiReturnArrow } from 'react-icons/gi'

import HeaderText from '../../TextAdmin/HeaderText/HeaderText'
import InputCustomer from '../../FromComponents/InputCustomer/InputCustomer'
import ButtonCustomer from '../../FromComponents/ButtonCustomer/ButtonCustomer'
import ImageCreate from '../../ImageCreate/ImageCreate'
import { Checkbox } from 'antd'
import { success } from '../../../../Message/Message'

export default function FormPublisher() {
    const { handleSubmit, register } = useForm({ defaultValues: {} })
    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams()

    const [image, setImage] = useState('')
    const detailBrand = useSelector((state) => state.getBrandById.brandId)
    const [stateFile, setStateFile] = useState(detailBrand ? detailBrand.img : '')
    const [visible, setVisible] = useState(detailBrand ? detailBrand.visible : '')

    useEffect(() => {
        if (id) {
            dispatch(getBrandById(id))
        }

        return () => {
            dispatch(removeBrandById())
        }
    }, [dispatch, id])

    const handleFileImageChange = (e) => {
        const file = e.target.files[0]
        const newFile = file ? URL.createObjectURL(file) : ''

        if (file) {
            setImage(file)
        }
        setStateFile(newFile)
    }

    const SetVisible = () => {
        setVisible(!visible)
        if (detailBrand) {
            detailBrand.visible = !visible
        }
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()
        let formData = new FormData()
        if (id) {
            formData.append('_id', id)
        }
        formData.append('name', data.name ? data.name : detailBrand ? detailBrand.name : '')
        formData.append('image', image ? image : detailBrand ? detailBrand.img : '')
        formData.append('visible', detailBrand ? detailBrand.visible : visible)

        await dispatch(saveBrand(formData))
        detailBrand ? success('Cập nhật nhà xuất bản thành công') : success('Thêm nhà xuất bản thành công')
        e.target.reset()
        history('/admin/publisher')
    }

    return (
        <div className="admin-TypeProduct">
            <div>
                <HeaderText lable={detailBrand ? 'Cập nhật nhà xuất bản' : 'Thêm mới nhà xuất bản'}>
                    <Link to={config.routes.publisher}>
                        <GiReturnArrow />
                    </Link>
                </HeaderText>
                <div className="admim-create_type">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputCustomer lable="Tên nhà xuất bản">
                            <input
                                {...register('name')}
                                placeholder="Nhập tên nhà xuất bản"
                                autoComplete="off"
                                defaultValue={detailBrand ? detailBrand.name : ''}
                            ></input>
                        </InputCustomer>
                        <InputCustomer lable="Hình ảnh">
                            {detailBrand ? (
                                <input
                                    type="file"
                                    {...register('image')}
                                    onChange={handleFileImageChange}
                                    defaultValue={detailBrand ? detailBrand.image : ''}
                                ></input>
                            ) : (
                                <input type="file" {...register('image')} onChange={handleFileImageChange}></input>
                            )}
                        </InputCustomer>
                        {stateFile ? (
                            <ImageCreate src={stateFile} />
                        ) : detailBrand ? (
                            <ImageCreate src={detailBrand.img} />
                        ) : (
                            ''
                        )}
                        <div onClick={() => SetVisible()} className="d-flex py-4 align-items-center">
                            <Checkbox
                                checked={(detailBrand && detailBrand.visible) || visible}
                                size="large"
                                style={{
                                    lineHeight: '40px',
                                    paddingRight: '6px',
                                }}
                            />
                            <div
                                style={{ fontSize: '1.6rem', fontWeight: '600', userSelect: 'none', cursor: 'pointer' }}
                            >
                                Hiển thị nhà xuất bản
                            </div>
                        </div>
                        <ButtonCustomer type="submit">
                            {detailBrand ? 'Cập nhật nhà xuất bản' : 'Thêm nhà xuất bản'}
                        </ButtonCustomer>
                    </form>
                </div>
            </div>
        </div>
    )
}
