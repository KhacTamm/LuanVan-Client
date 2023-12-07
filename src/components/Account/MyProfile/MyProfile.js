import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUserById, removeUserById, updateUser } from '../../../redux/actions/UserAction'

import { useForm } from 'react-hook-form'

import images from '../../../assets'

import { Card } from 'antd'
import { AiOutlineCamera } from 'react-icons/ai'
import './MyProfile.css'

import { failure, success } from '../../Message/Message'

function MyProfile() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id))
        }

        return () => {
            dispatch(removeUserById())
        }
    }, [dispatch, id])

    const user = useSelector((state) => state.getUserById.userId)

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

            if (user) {
                if (user.name || user.phone) {
                    await dispatch(updateUser(formData))
                    await success('Cập nhật thông tin tài khoản thành công')
                } else {
                    failure('Vui lòng nhập đầy đủ thông tin')
                }
            } else {
                if (!data.name || !data.phone) {
                    failure('Vui lòng nhập đầy đủ thông tin')
                } else {
                    await dispatch(updateUser(formData))
                    await success('Thêm tài khoản thành công')
                }
            }
            setstateChangePass(false)
        } else {
            alert('wrong repeat password')
        }
    }

    return (
        <div className="account_content">
            <div className=" my_profile">
                <div className="account_title">
                    <span>Hồ sơ của tôi</span>
                </div>
                <div className="row">
                    <div className="col-8 account-in4">
                        <form className="account_items" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <div className="account_item">
                                <h4>Email</h4>
                                <div className="account-input">
                                    <input
                                        required
                                        style={{
                                            userSelect: 'none',
                                        }}
                                        {...register('email')}
                                        disabled={user ? true : false}
                                        defaultValue={user ? user.email : ''}
                                        placeholder="email"
                                    ></input>
                                </div>
                            </div>

                            <div className="account_item">
                                <h4>Tên tài khoản</h4>
                                <div className="account-input">
                                    <input
                                        {...register('name')}
                                        defaultValue={user ? user.name : ''}
                                        placeholder="Tên tài khoản"
                                    ></input>
                                </div>
                            </div>
                            <div className="account_item">
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
                            <div className="account_item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4>Mật khẩu </h4>
                                    {user ? (
                                        <h4 className="updatePass" onClick={() => setstateChangePass(!stateChangePass)}>
                                            Đổi mật khẩu
                                        </h4>
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
                                    <div className="account_item">
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
                                    <div className="account_item">
                                        <h4>Xác nhận mật khẩu</h4>
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
                            <button type="submit" className="btn_account">
                                Cập nhật
                            </button>
                        </form>
                    </div>
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
                </div>
            </div>
        </div>
    )
}

export default MyProfile
