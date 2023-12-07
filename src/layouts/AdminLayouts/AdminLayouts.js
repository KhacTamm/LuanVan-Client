import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Sidebar from '../../components/Admin/components/sidebar/Sidebar'
import './AdminLayouts.css'
import AccountAdmin from '../../components/Admin/components/AccountAdmin/AccountAdmin'

function AdminLayout({ children }) {
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    const history = useNavigate()

    // const handleSignout = () => {
    //     dispatch(SignoutUser())
    // }

    if (!userInfo || !userInfo.isAdmin) {
        history('/')
    }
    return (
        <div className={`layout`}>
            <Sidebar />
            <div className="layout__content">
                <AccountAdmin />
                <div className="layout__content-container">
                    <div className="admin-content">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
