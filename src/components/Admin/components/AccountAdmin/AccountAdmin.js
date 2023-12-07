import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { SignoutUser } from '../../../../redux/actions/UserAction'
import images from '../../../../assets'

import './AccountAdmin.css'

import { MdLogout } from 'react-icons/md'

function AccountAdmin() {
    const dispatch = useDispatch()
    const handleSignout = () => {
        dispatch(SignoutUser())
    }

    return (
        <div className="header-layout-content">
            <Link to="/">
                <img alt="img logo" className="logo-admin" src={images.logoAdmin} />
            </Link>
            <div className="header-layout-content_account">
                <div className="header-layout-content_account-admin" onClick={() => handleSignout()}>
                    Đăng xuất <MdLogout />
                </div>
            </div>
        </div>
    )
}

export default AccountAdmin
