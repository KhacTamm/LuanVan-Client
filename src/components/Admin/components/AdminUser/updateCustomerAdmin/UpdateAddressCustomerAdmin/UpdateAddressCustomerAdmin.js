import { Link, useParams } from 'react-router-dom'
import HeaderText from '../../../TextAdmin/HeaderText/HeaderText'
import { GiReturnArrow } from 'react-icons/gi'
import { Checkbox, Modal } from 'antd'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { GetAllDistrict, GetAllProvince, GetAllWard } from '../../../../../../redux/actions/OrderAction'
import { addAddress, getUserById, removeUserById } from '../../../../../../redux/actions/UserAction'
import FormUpdateCustomer from '../../UserForm/FormUpdateCustomer/FormUpdateCustomer'

function UpdateAddressCustomerAdmin() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector((state) => state.getUserById.userId)

    const [open, setOpen] = useState(false)
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

    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id))
        }

        return () => {
            dispatch(removeUserById())
        }
    }, [dispatch, id])

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

    const showModal = () => {
        setOpen(true)
    }

    const SetDefault = () => {
        setIsdefault(!isdefault)
    }

    const onSubmit = async (data, e) => {
        const admin = true
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
            await dispatch(addAddress(user._id, formData, admin))
            setChooseProvince({ name: 'Tỉnh / TP' })
            setChooseDistrict({ name: 'Quận / Huyện' })
            setChooseWard({ name: 'Phường / Xã' })
            reset()
        }
        setOpen(false)
    }
    const handleCancel = () => {
        setOpen(false)
    }
    return (
        <div className="admin-customer-page">
            <HeaderText lable={id ? 'Cập nhật thông tin khách hàng' : 'Thêm mới khách hàng'}>
                <Link onClick={() => window.history.back()}>
                    <GiReturnArrow />
                </Link>
            </HeaderText>
            <div className="admin-customer">
                <div className="account_content">
                    <div className="account_address">
                        <div className="account_title">
                            <span>Địa chỉ</span>
                            <button onClick={showModal} className="btn-create-address">
                                <AiOutlinePlus />
                                Thêm địa chỉ mới
                            </button>
                        </div>
                        <Modal
                            title="Địa Chỉ Mới"
                            open={open}
                            onOk={handleSubmit(onSubmit)}
                            onCancel={handleCancel}
                            okText="Hoàn thành"
                            cancelText="Trở lại"
                        >
                            <form
                                className="account_address_user-form"
                                onSubmit={handleSubmit(onSubmit)}
                                encType="multipart/form-data"
                            >
                                <div className="account_address_user_input">
                                    <input
                                        {...register('userNameDelivery')}
                                        required
                                        placeholder="Họ và tên"
                                        // autoComplete="off"
                                    ></input>
                                </div>
                                <div className="account_address_user_input">
                                    <input {...register('userNamePhone')} required placeholder="Số điện thoại" />
                                </div>
                                <div className="account_address_user_province">
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
                                <div className="account_address_user_province">
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
                                <div className="account_address_user_province">
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
                                <div className="pt-4">
                                    <Checkbox
                                        style={{ paddingRight: '12px' }}
                                        onClick={() => SetDefault()}
                                        checked={isdefault}
                                    />
                                    <label>Định làm địa mặt định</label>
                                </div>
                            </form>
                        </Modal>
                        <div className="row">
                            {user && user.address && user.address.length
                                ? user.address.map((item, index) => (
                                      <FormUpdateCustomer addressItem={item} userID={user._id} key={index} />
                                  ))
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateAddressCustomerAdmin
