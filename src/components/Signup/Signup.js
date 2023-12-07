import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import config from '../../config'

import { useDispatch } from 'react-redux'
import { SignupUser } from '../../redux/actions/UserAction'

import './Signup.css'

function Login(props) {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const history = useNavigate()

    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        if (password === confirmPassword) {
            dispatch(SignupUser(data))
            history('/login')
        } else {
            alert('wrong repeat password')
        }
    }

    return (
        <div className="login-content">
            <h2>ĐĂNG KÝ</h2>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} placeholder="Tên tài khoản" required></input>
                <input {...register('email')} placeholder="Email" type="email" required></input>
                <input
                    {...register('password')}
                    placeholder="Mật khẩu"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                <input
                    {...register('repeat password')}
                    placeholder="Nhập lại mật khẩu"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                ></input>
                <input type="submit" value="Đăng Ký"></input>
            </form>
            <div className="redirect">
                <p>Bạn đã có tài khoản?</p>
                <Link to={config.routes.login}> Đăng nhập</Link>
            </div>
        </div>
    )
}

export default Login
