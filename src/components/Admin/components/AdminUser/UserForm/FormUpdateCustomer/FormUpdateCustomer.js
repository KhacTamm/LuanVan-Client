import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { GetAllDistrict, GetAllProvince, GetAllWard } from '../../../../../../redux/actions/OrderAction'
import {
    deleteAddressAdmin,
    getUserById,
    saveAddressUser,
    setDefaultAddressAdmin,
} from '../../../../../../redux/actions/UserAction'

import { useForm } from 'react-hook-form'

import IconCustomer from '../../../FromComponents/IconCustomer/IconCustomer'
import ModalCustomer from '../../../../../Modal/ModalCustomer'

import { FiTrash, FiEdit } from 'react-icons/fi'
import { Button, Checkbox, Modal, Tag } from 'antd'
import './FormUpdateCustomer.css'

function FormUpdateCustomer({ userID, addressItem }) {
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const [openUpdatForm, setOpenUpdatForm] = useState(false)
    const [isdefault, setIsdefault] = useState(addressItem.isDefault)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const allProvince = useSelector((state) => state.address.province)
    const allDistrict = useSelector((state) => state.address.district)
    const allWard = useSelector((state) => state.address.ward)
    const [listProvince, setListProvince] = useState(false)
    const [listDistrict, setListDistrict] = useState(false)
    const [listWard, setListWard] = useState(false)

    const [chooseProvince, setChooseProvince] = useState({ name: addressItem.province })
    const [chooseDistrict, setChooseDistrict] = useState({ name: addressItem.district })
    const [chooseWard, setChooseWard] = useState({ name: addressItem.ward })

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

    const showModalEdit = () => {
        setOpenUpdatForm(true)
    }

    const handleCancelEdit = () => {
        setOpenUpdatForm(false)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const SetDefault = () => {
        setIsdefault(!isdefault)
    }

    const handleRemoveAddress = async (item) => {
        await dispatch(deleteAddressAdmin(userID, item))
        await dispatch(getUserById(userID))
        setIsModalOpen(false)
    }

    const chooseDefault = async (id) => {
        await dispatch(setDefaultAddressAdmin(userID, id, { isdefault: !isdefault }))
        await dispatch(getUserById(userID))
    }

    const onSubmitUpdateAddress = async (data, e) => {
        e.preventDefault()
        let formData = new FormData()

        if (
            chooseProvince.name !== 'Tỉnh / TP' &&
            chooseDistrict.name !== 'Quận / Huyện' &&
            chooseWard.name !== 'Phường / Xã'
        ) {
            formData.append('_id', addressItem ? addressItem._id : '')
            formData.append('userNameDelivery', data.userNameDelivery ? data.userNameDelivery : '')
            formData.append('userNamePhone', data.userNamePhone ? data.userNamePhone : '')

            formData.append('to_ward_code', chooseWard.id ? chooseWard.id : addressItem.to_ward_code)
            formData.append('to_district_id', chooseDistrict.id ? chooseDistrict.id : addressItem.to_district_id)

            formData.append('province', chooseProvince ? chooseProvince.name : '')
            formData.append('district', chooseDistrict ? chooseDistrict.name : '')
            formData.append('ward', chooseWard ? chooseWard.name : '')
            formData.append('detail', data.more ? data.more : '')
            formData.append('isDefault', isdefault)
            await dispatch(saveAddressUser(userID, formData, addressItem._id))
            await dispatch(getUserById(userID))
        }
        setOpenUpdatForm(false)
    }

    return (
        <div className="list-address-admin">
            <div>
                <div className="list-address-admin_item">{addressItem.userNameDelivery}</div>
                <div className="list-address-admin_item">
                    <strong style={{ color: '#727272' }}>Số điện thoại: </strong>
                    <span>{addressItem.userNamePhone}</span>
                </div>
                <div className="list-address-admin_item">
                    <strong style={{ color: '#727272' }}>Địa chỉ: </strong>
                    <span>{`${addressItem.detail}, ${addressItem.ward}, ${addressItem.district}, ${addressItem.province}`}</span>
                </div>
                {JSON.parse(addressItem.isDefault) ? (
                    <div style={{ paddingTop: '6px' }} className="list-address-admin_item">
                        <Tag style={{ padding: '6px 10px', fontSize: '1.4rem' }} color="success">
                            Mặc định
                        </Tag>
                    </div>
                ) : (
                    <Button
                        style={{
                            marginTop: '10px',
                            padding: '6px 10px',
                            height: '100%',
                            lineHeight: '2.1rem',
                            cursor: 'pointer',
                            fontSize: '1.4rem',
                        }}
                        onClick={() => chooseDefault(addressItem._id)}
                    >
                        Thiết lập mặt định
                    </Button>
                )}
            </div>
            <div className="d-flex flex-column  align-items-center">
                <Modal
                    title="Cập Nhật Lại Địa Chỉ"
                    okText="Cập nhật"
                    cancelText="Trở lại"
                    open={openUpdatForm}
                    onOk={handleSubmit(onSubmitUpdateAddress)}
                    onCancel={handleCancelEdit}
                    width={440}
                >
                    <form className="account_address_user-form">
                        <div className="account_address_user_input">
                            <input
                                {...register('userNameDelivery')}
                                required
                                placeholder="Họ và tên"
                                autoComplete="off"
                                defaultValue={addressItem ? addressItem.userNameDelivery : ''}
                            ></input>
                        </div>
                        <div className="account_address_user_input">
                            <input
                                {...register('userNamePhone')}
                                required
                                placeholder="Số điện thoại"
                                defaultValue={addressItem ? addressItem.userNamePhone : ''}
                            ></input>
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
                                                              handleSelectProvince(item.ProvinceName, item.ProvinceID)
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
                                                              handleSelectDistrict(item.DistrictName, item.DistrictID)
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
                                                          onClick={() => handleSelectWard(item.WardName, item.WardCode)}
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
                                defaultValue={addressItem.detail}
                            ></input>
                        </div>
                        {JSON.parse(addressItem.isDefault) ? (
                            ''
                        ) : (
                            <div className="pt-4">
                                <Checkbox
                                    style={{ paddingRight: '12px' }}
                                    onClick={() => SetDefault()}
                                    checked={isdefault}
                                />
                                <label>Định làm địa mặt định</label>
                            </div>
                        )}
                    </form>
                </Modal>
                <IconCustomer>
                    <FiEdit onClick={showModalEdit} />
                </IconCustomer>
                {JSON.parse(addressItem.isDefault) ? (
                    ''
                ) : (
                    <>
                        <IconCustomer isDelete>
                            <FiTrash onClick={showModal} />
                        </IconCustomer>
                        <ModalCustomer
                            isModalOpen={isModalOpen}
                            handleCancel={handleCancel}
                            handleFunction={() => handleRemoveAddress(addressItem)}
                            lable="địa chỉ"
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default FormUpdateCustomer
