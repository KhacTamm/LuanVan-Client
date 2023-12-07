import Header from './Header'
import './HeaderOnly.css'
import { useLocation } from 'react-router-dom'

function HeaderOnly({ children }) {
    let location = useLocation()
    return (
        <div className="headerOnly">
            <Header title={location.pathname === '/register' ? 'Đăng Ký' : 'Đăng Nhập'} />
            <div className="headerOnly_wrap">
                <div className="headerOnly_cont">
                    <div className="headerOnly_inner">
                        <div className="login-page">
                            {children}
                            {/* <div className="img">
                                <img className="img-login" src={images.login} alt="image" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderOnly
