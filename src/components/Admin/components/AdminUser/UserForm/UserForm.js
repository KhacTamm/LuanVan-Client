import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllUser, getUserById, removeUserById, saveUser } from '../../../../../redux/actions/UserAction'

import config from '../../../../../config'
import images from '../../../../../assets'

import FormAddressCustomer from './FormAddressCustomer/FormAddressCustomer'
import FormUpdateCustomer from './FormUpdateCustomer/FormUpdateCustomer'
import { success } from '../../../../Message/Message'

import { Button, Card, Modal } from 'antd'
import { AiOutlineCamera } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import './UserForm.css'

function UserForm(props) {
    const { update } = props
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams()
    const [showCreateAddress, setShowCreateAddress] = useState(false)
    const user = useSelector((state) => state.getUserById.userId)

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id))
        }

        return () => {
            dispatch(removeUserById())
        }
    }, [dispatch, id])

    const [passwordnew, setPasswordnew] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [stateChangePass, setstateChangePass] = useState(false)
    const [stateFile, setStateFile] = useState(user ? user.image : '')
    const [image, setImage] = useState('')

    const handleChange = (e) => {
        const file = e.target.files[0]
        const newFile = file ? URL.createObjectURL(file) : ''

        if (file) {
            setImage(file)
        }
        setStateFile(newFile)
    }

    const handleShowCreateAddress = () => {
        setShowCreateAddress(!showCreateAddress)
    }

    // ----------------------------------------------Modal---------------------------------------------------

    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
        setShowCreateAddress(!showCreateAddress)
    }

    // -----------------------------------------------------------------------------------------------------

    const onSubmit = async (data) => {
        let formData = new FormData()

        if (passwordnew === confirmPassword) {
            if (passwordnew !== '') {
                data.password = passwordnew
            }

            if (user) {
                formData.append('_id', user._id)
            }

            formData.append('email', data.email)
            formData.append('name', data.name ? data.name : user ? user.name : '')
            formData.append('phone', data.phone ? data.phone : user ? user.phone : '')
            formData.append('password', data.password ? data.password : user ? user.password : '')
            formData.append('image', image ? image : user ? user.image : '')

            if (id) {
                const Id = user._id
                await dispatch(saveUser(formData, Id))
            } else {
                await dispatch(saveUser(formData))
            }

            await success(user ? 'Cập nhật thông tin tài khoản thành công' : 'Thêm mới tài khoản thành công')
            await dispatch(getAllUser())

            history(config.routes.customer)
            setstateChangePass(false)
        } else {
            alert('wrong repeat password')
        }
    }

    return (
        <div className="row form-admin-create-customer">
            <div className="col-4 account-avatar">
                <Card className="account_avatar">
                    <input
                        {...register('image')}
                        color="primary"
                        accept="image/*"
                        type="file"
                        id="icon-button-photo"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="icon-button-photo" className="label-avatar">
                        {stateFile || user ? (
                            <div className="avatar-user">
                                <img alt="img" src={stateFile || user.image || images.avatar} />
                                <div className="changeImg">
                                    <div className="label_account">
                                        <p className="label_account-icon">
                                            <AiOutlineCamera />
                                        </p>
                                        <p className="label_account-text">Chọn ảnh</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="label_account">
                                <p className="label_account-icon">
                                    <AiOutlineCamera />
                                </p>
                                <p className="label_account-text">Chọn ảnh</p>
                            </div>
                        )}
                    </label>
                    <div className="account_avatar-sub">
                        Dụng lượng file tối đa 1 MB
                        <br /> Định dạng:.JPEG, .PNG
                    </div>
                </Card>
            </div>
            <div className="col-8 account-in4">
                <form className="account_items-admin" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div style={{ paddingRight: '24px' }}>
                        <div className="account_item-admin">
                            <h4>Email</h4>
                            <div className="account-input">
                                <input
                                    required
                                    {...register('email')}
                                    disabled={user ? true : false}
                                    defaultValue={user ? user.email : ''}
                                    placeholder="email"
                                ></input>
                            </div>
                        </div>

                        <div className="account_item-admin">
                            <h4>Tên tài khoản</h4>
                            <div className="account-input">
                                <input
                                    {...register('name')}
                                    defaultValue={user ? user.name : ''}
                                    placeholder="Tên tài khoản"
                                ></input>
                            </div>
                        </div>
                        <div className="account_item-admin">
                            <h4>Số điện thoại</h4>
                            <div className="account-input">
                                <input
                                    {...register('phone')}
                                    defaultValue={user ? user.phone : ''}
                                    type="number"
                                    placeholder="Nhập vào số điên thoại"
                                />
                            </div>
                        </div>
                        <div className="account_item-admin">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4>Mật khẩu </h4>
                                {user ? (
                                    <div className="updatePass" onClick={() => setstateChangePass(!stateChangePass)}>
                                        Đổi mật khẩu
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="pass">
                                <div className="account-input">
                                    <input
                                        {...register('password')}
                                        className="noneSelect"
                                        type="password"
                                        disabled={user ? true : false}
                                        defaultValue={user ? user.password : ''}
                                        placeholder="Mật khẩu"
                                    />
                                </div>
                            </div>
                        </div>
                        {stateChangePass ? (
                            <div className="passChange">
                                <div className="account_item-admin">
                                    <h4>Mật khẩu mới</h4>
                                    <div className="account-input">
                                        <input
                                            {...register('passwordnew')}
                                            placeholder="Nhập mật khẩu mới"
                                            type="password"
                                            onChange={(e) => setPasswordnew(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: '600', fontSize: '1.6rem', paddingBottom: '6px' }}>
                                        Xác nhận mật khẩu
                                    </h4>
                                    <div className="account-input">
                                        <input
                                            {...register('repeat password')}
                                            placeholder="Nhập lại mật khẩu mới"
                                            type="password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        {update ? (
                            <div className="address-customer" onClick={showModal}>
                                Địa chỉ khách hàng
                            </div>
                        ) : (
                            ''
                        )}
                        <button type="submit" className="btn_account">
                            {user ? 'Cập Nhật Tài Khoản' : 'Thêm Tài Khoản'}
                        </button>
                    </div>
                </form>
                <Modal
                    title="Địa chỉ khách hàng"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={650}
                    style={{ top: 20 }}
                    footer={null}
                >
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button className="modal-addaddress-customer" onClick={handleShowCreateAddress}>
                            <AiOutlinePlus />
                            <span>Thêm địa chỉ</span>
                        </Button>
                    </div>
                    <div className="list-address-customer">
                        <FormAddressCustomer
                            userID={user ? user._id : ''}
                            handleShowCreateAddress={handleShowCreateAddress}
                            showCreateAddress={showCreateAddress}
                        />
                        {user
                            ? user.address.map((item, index) => (
                                  <FormUpdateCustomer userID={user._id} addressItem={item} key={index} />
                              ))
                            : ''}
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default UserForm
