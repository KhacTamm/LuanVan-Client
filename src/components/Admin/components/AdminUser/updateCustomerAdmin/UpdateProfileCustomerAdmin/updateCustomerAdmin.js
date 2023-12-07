import { Link, useParams } from 'react-router-dom'

import config from '../../../../../../config'

import HeaderText from '../../../TextAdmin/HeaderText/HeaderText'

import './UpdateProfileCustomerAdmin.css'
import { GiReturnArrow } from 'react-icons/gi'
import UserForm from '../../UserForm/UserForm'

function UpdateProfileCustomerAdmin() {
    const { id } = useParams()

    return (
        <div className="admin-customer-page">
            <HeaderText lable={id ? 'Cập nhật thông tin khách hàng' : 'Thêm mới khách hàng'}>
                <Link to={config.routes.customer}>
                    <GiReturnArrow />
                </Link>
            </HeaderText>
            <div className="admin-customer">
                <UserForm update />
            </div>
        </div>
    )
}

export default UpdateProfileCustomerAdmin
