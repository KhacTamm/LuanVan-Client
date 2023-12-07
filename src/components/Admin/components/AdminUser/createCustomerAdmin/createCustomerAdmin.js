import { Link } from 'react-router-dom'

import config from '../../../../../config'

import HeaderText from '../../TextAdmin/HeaderText/HeaderText'

import { GiReturnArrow } from 'react-icons/gi'
import './createCustomerAdmin.css'
import UserForm from '../UserForm/UserForm'

function createCustomerAdmin() {
    return (
        <div className="admin-customer-page">
            <HeaderText lable="Thêm mới khách hàng">
                <Link to={config.routes.customer}>
                    <GiReturnArrow />
                </Link>
            </HeaderText>
            <div className="admin-customer">
                <UserForm admin />
            </div>
        </div>
    )
}

export default createCustomerAdmin
