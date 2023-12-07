import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import config from '../../config'

import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../redux/actions/UserAction'

import './Login.css'
// import Error from '../error/error'
import Error from '../error/error'

function Login(props) {
    const dispatch = useDispatch()
    const history = useNavigate()
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm()

    // const user = useSelector((state) => state.userSignin)
    // const { userInfo, error } = user
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo, error } = userSignin

    const onSubmit = (data) => {
        dispatch(login(data))
    }

    // useEffect(() => {
    //     if (userInfo) {
    //         history('/')
    //     }
    // })

    useEffect(() => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                history('/admin')
            } else {
                history('/')
            }
        }
    })

    return (
        <>
            <div className="login-content">
                <h2> ĐĂNG NHẬP </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <input {...register('email')} placeholder="Email" required></input>
                    <input {...register('password')} placeholder="Mật khẩu" type="password" required></input>

                    <input type="submit" value="Đăng Nhập"></input>
                    <div></div>
                    {error ? (
                        <Error error={error} style={{ fontSize: '1.6rem', textAlign: 'start', margin: '1rem' }} />
                    ) : (
                        <></>
                    )}
                </form>
                <div className="redirect">
                    <p>Bạn chưa có tài khoản?</p>
                    <Link to={config.routes.register}> Đăng Ký</Link>
                </div>
            </div>
        </>
    )
}

export default Login
