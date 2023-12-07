import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { NavLink, Link } from 'react-router-dom'
import config from '../../config'

import { useDispatch, useSelector } from 'react-redux'
import { SignoutUser } from '../../redux/actions/UserAction'
import { searchProduct } from '../../redux/actions/ProductAction'
import { getAllCart } from '../../redux/actions/CartAction'

import { BiUser } from 'react-icons/bi'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { SearchOutlined } from '@ant-design/icons'
import images from '../../assets'
import './Header.css'
import { Avatar } from 'antd'
import AvatarCustomer from '../Account/AvatarCustomer/AvatarCustomer'

function Header() {
    const dispatch = useDispatch()
    const history = useNavigate()

    const [showAccount, setShowAccount] = useState(false)
    const [showAccount2, setShowAccount2] = useState(false)

    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    const [search, setSearch] = useState('')
    const { quantity } = useSelector((state) => state.cart)
    const amount = quantity

    useEffect(() => {
        if (userInfo) {
            const action = getAllCart(userInfo._id)
            dispatch(action)
        }
    }, [dispatch, userInfo])

    const toCart = () => {
        if (userInfo) {
            history('/cart')
        } else {
            history('/login')
        }
    }

    const [menu, setMenu] = useState(true)

    const handleSignout = () => {
        dispatch(SignoutUser())
    }

    const SearchProduct = async (e) => {
        e.preventDefault()
        if (search.replaceAll(' ', '') && search !== '') {
            await history(`/search/${search.trim()}`)
            dispatch(searchProduct(search.trim()))
        }
    }

    return (
        <div className="header">
            <div className="header-content">
                <div className="container-xxl">
                    <section id="menu">
                        <Link to="/" className="logo">
                            <img src={images.logo} alt="logo" />
                        </Link>
                        <div className="search">
                            <form onSubmit={(e) => SearchProduct(e)}>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Tìm kiếm ..."
                                    spellCheck={false}
                                    autoComplete="off"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <SearchOutlined className="search-btn scale" onClick={(e) => SearchProduct(e)} />
                            </form>
                        </div>
                        <ul className="menu-list" id={menu ? 'hidden' : ''}>
                            <li className="list-item">
                                <p>Hotline</p>
                                <b>099 999 9999</b>
                            </li>
                            {userInfo && userInfo.isAdmin ? (
                                ''
                            ) : (
                                <li className="list-item user">
                                    <p className="navNoUser">
                                        <li className="shopcart " onClick={() => toCart()}>
                                            <NavLink
                                                className={({ isActive }) =>
                                                    isActive ? 'active shop-cart' : 'noActive shop-cart'
                                                }
                                                to={config.routes.cart}
                                                end
                                            >
                                                <AiOutlineShoppingCart
                                                    style={{ fontSize: '30px' }}
                                                ></AiOutlineShoppingCart>
                                                <span className="count"> {amount} </span>
                                            </NavLink>
                                        </li>
                                        Giỏ Hàng
                                    </p>
                                </li>
                            )}

                            <li className="list-item user">
                                {userInfo ? (
                                    <p>
                                        <li onClick={() => setShowAccount2(!showAccount2)}>
                                            <p className="user_name avatar">
                                                {userInfo.image ? (
                                                    <AvatarCustomer src={userInfo.image} />
                                                ) : (
                                                    <Avatar size="large" icon={<BiUser />} />
                                                )}
                                                <p className="account">
                                                    {userInfo.name}
                                                    {/* <DownOutlined style={{ fontSize: '1.2rem' }} /> */}
                                                </p>
                                            </p>

                                            {showAccount2 ? (
                                                <p className="menu-drop">
                                                    {userInfo.isAdmin ? (
                                                        <Link to={config.routes.admin}>Admin</Link>
                                                    ) : (
                                                        <>
                                                            <Link to={`/account/${userInfo._id}`}>
                                                                Tài khoản của tôi
                                                            </Link>
                                                            <Link to={config.routes.MyOrder}>Đơn hàng của tôi</Link>
                                                        </>
                                                    )}

                                                    <Link onClick={() => handleSignout()}>Đăng Xuất</Link>
                                                </p>
                                            ) : (
                                                ''
                                            )}
                                        </li>
                                    </p>
                                ) : (
                                    <p className="navNoUser">
                                        <li onClick={() => setShowAccount(!showAccount)}>
                                            <BiUser></BiUser>
                                            {showAccount ? (
                                                <p className="menu-drop">
                                                    <Link to={config.routes.register}>Đăng Ký</Link>
                                                    <Link to={config.routes.login}>Đăng Nhập</Link>
                                                </p>
                                            ) : (
                                                ''
                                            )}
                                        </li>
                                        Tài Khoản
                                    </p>
                                )}
                            </li>
                        </ul>
                        <div className="bar" onClick={() => setMenu(!menu)}>
                            <span className="line"></span>
                            <span className="line"></span>
                            <span className="line"></span>
                        </div>
                    </section>
                </div>
            </div>
            <NavHeader />
        </div>
    )
}

function NavHeader() {
    return (
        <div className="nav-header">
            <ul className="nav-container container-xxl">
                <li className="nav-item scale">
                    <NavLink
                        className={({ isActive }) => (isActive ? 'active' : 'noActive')}
                        to={config.routes.home}
                        end
                    >
                        Trang Chủ
                    </NavLink>
                </li>
                <li className="nav-item scale">
                    <NavLink
                        className={({ isActive }) => (isActive ? 'active' : 'noActive')}
                        to={config.routes.productCustomer}
                    >
                        Tủ Sách
                    </NavLink>
                </li>
                <li className="nav-item scale">
                    <NavLink
                        className={({ isActive }) => (isActive ? 'active' : 'noActive')}
                        to={config.routes.allAuthor}
                    >
                        Tác giả
                    </NavLink>
                </li>
                <li className="nav-item scale">
                    <NavLink
                        // className="noActive"
                        className={({ isActive }) => (isActive ? 'active' : 'noActive')}
                        to={config.routes.inrtroduce}
                        end
                    >
                        Giới Thiệu
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Header
