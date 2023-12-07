import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUserById, saveAddressUser } from '../../../../../../redux/actions/UserAction'
import { GetAllDistrict, GetAllProvince, GetAllWard } from '../../../../../../redux/actions/OrderAction'

import { useForm } from 'react-hook-form'

import { Checkbox } from 'antd'
import './FormAddressCustomer.css'

function FormAddressCustomer(props) {
    const { userID, showCreateAddress, handleShowCreateAddress } = props

    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm()

    const [isdefault, setIsdefault] = useState(false)

    const allProvince = useSelector((state) => state.address.province)
    const allDistrict = useSelector((state) => state.address.district)
    const allWard = useSelector((state) => state.address.ward)
    const [listProvince, setListProvince] = useState(false)
    const [listDistrict, setListDistrict] = useState(false)
    const [listWard, setListWard] = useState(false)

    const [chooseProvince, setChooseProvince] = useState({ name: 'Tỉnh / TP' })
    const [chooseDistrict, setChooseDistrict] = useState({ name: 'Quận / Huyện' })
    const [chooseWard, setChooseWard] = useState({ name: 'Phường / Xã' })

    useEffect(() => {
        dispatch(GetAllProvince())
    }, [dispatch])

    useEffect(() => {
        dispatch(GetAllDistrict(202))
    }, [dispatch])

    const handleListProvince = (e) => {
        e.preventDefault()
        setListProvince(!listProvince)
    }
    const handleListDistrict = (e) => {
        e.preventDefault()
        setListDistrict(!listDistrict)
    }
    const handleListWard = (e) => {
        e.preventDefault()
        setListWard(!listWard)
    }

    const handleSelectProvince = (name, id) => {
        setChooseProvince({ name, id })
        setListProvince(!listProvince)
        dispatch(GetAllDistrict(id))
    }

    const handleSelectDistrict = (name, id) => {
        setChooseDistrict({ name, id })
        setListDistrict(!listDistrict)
        dispatch(GetAllWard(id))
    }

    const handleSelectWard = (name, id) => {
        setChooseWard({ name, id })
        setListWard(!listWard)
    }

    const SetDefault = () => {
        setIsdefault(!isdefault)
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()

        let formData = new FormData()

        formData.append('userNameDelivery', data.userNameDelivery ? data.userNameDelivery : '')
        formData.append('userNamePhone', data.userNamePhone ? data.userNamePhone : '')

        formData.append('to_ward_code', chooseWard ? chooseWard.id : '')
        formData.append('to_district_id', chooseDistrict ? chooseDistrict.id : '')

        formData.append('province', chooseProvince ? chooseProvince.name : '')
        formData.append('district', chooseDistrict ? chooseDistrict.name : '')
        formData.append('ward', chooseWard ? chooseWard.name : '')
        formData.append('detail', data.more ? data.more : '')
        formData.append('isDefault', isdefault)

        if (
            chooseProvince.name !== 'Tỉnh / TP' &&
            chooseDistrict.name !== 'Quận / Huyện' &&
            chooseWard.name !== 'Phường / Xã'
        ) {
            await dispatch(saveAddressUser(userID, formData))
            await dispatch(getUserById(userID))
            setChooseProvince({ name: 'Tỉnh / TP' })
            setChooseDistrict({ name: 'Quận / Huyện' })
            setChooseWard({ name: 'Phường / Xã' })
            reset()
        }
        handleShowCreateAddress()
    }

    return (
        <>
            {showCreateAddress ? (
                <>
                    <form
                        className="account_address_user_admin-form"
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
                        <div className="account_address_user_admin_input">
                            <input
                                {...register('userNameDelivery')}
                                required
                                placeholder="Họ và tên"
                                autoComplete="off"
                            ></input>
                        </div>
                        <div className="account_address_user_admin_input">
                            <input {...register('userNamePhone')} required placeholder="Số điện thoại" />
                        </div>
                        <div className="account_address_user_admin_address">
                            <div className="account_address_user_admin_address-item">
                                {allProvince ? (
                                    <button className="" onClick={(e) => handleListProvince(e)}>
                                        {chooseProvince.name}
                                    </button>
                                ) : (
                                    <button className="" onClick={(e) => handleListProvince(e)}>
                                        {chooseProvince.name}
                                    </button>
                                )}
                                {listProvince ? (
                                    <div className="select">
                                        <div className="select-list">
                                            <aside>
                                                {allProvince
                                                    ? allProvince.data.map((item, index) => (
                                                          <span
                                                              key={index}
                                                              onClick={() =>
                                                                  handleSelectProvince(
                                                                      item.ProvinceName,
                                                                      item.ProvinceID,
                                                                  )
                                                              }
                                                          >
                                                              {item.ProvinceName}
                                                          </span>
                                                      ))
                                                    : ''}
                                            </aside>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="account_address_user_admin_address-item">
                                {chooseProvince ? (
                                    <button className="" onClick={(e) => handleListDistrict(e)}>
                                        {chooseDistrict.name}
                                    </button>
                                ) : (
                                    <button className="" onClick={(e) => handleListProvince(e)} disabled="disabled">
                                        {chooseDistrict.name}
                                    </button>
                                )}
                                {listDistrict ? (
                                    <div className="select">
                                        <div className="select-list">
                                            <aside>
                                                {allDistrict
                                                    ? allDistrict.data.map((item, index) => (
                                                          <span
                                                              key={index}
                                                              onClick={() =>
                                                                  handleSelectDistrict(
                                                                      item.DistrictName,
                                                                      item.DistrictID,
                                                                  )
                                                              }
                                                          >
                                                              {item.DistrictName}
                                                          </span>
                                                      ))
                                                    : ''}
                                            </aside>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        <div className="account_address_user_address">
                            <div className="account_address_user_admin_address-item">
                                {chooseWard ? (
                                    <button className="" onClick={(e) => handleListWard(e)}>
                                        {chooseWard.name}
                                    </button>
                                ) : (
                                    <button className="" onClick={(e) => handleListWard(e)} disabled>
                                        {chooseWard.name}
                                    </button>
                                )}
                                {listWard ? (
                                    <div className="select">
                                        <div className="select-list">
                                            <aside>
                                                {allWard && allWard.data !== null
                                                    ? allWard.data.map((item, index) => (
                                                          <span
                                                              key={index}
                                                              onClick={() =>
                                                                  handleSelectWard(item.WardName, item.WardCode)
                                                              }
                                                          >
                                                              {item.WardName}
                                                          </span>
                                                      ))
                                                    : ''}
                                            </aside>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="account_address_user_input more">
                                <input
                                    {...register('more')}
                                    required
                                    placeholder="Số nhà, đường ..."
                                    defaultValue={''}
                                ></input>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Checkbox
                                style={{ paddingRight: '8px' }}
                                onClick={() => SetDefault()}
                                checked={isdefault}
                            />
                            <label>Định làm địa mặt định</label>
                        </div>
                        <div className="d-flex justify-content-end" style={{ width: '100%' }}>
                            <button className="create_address_customer" type="submit">
                                Thêm mới
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                ''
            )}
        </>
    )
}

export default FormAddressCustomer
