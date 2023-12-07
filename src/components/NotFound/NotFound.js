import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
    return (
        <div className="container">
            <div className="wapper">
                <div className="NotFound_number">404</div>
                <div className="NotFound_text">
                    <h2>RẤT TIẾC, TRANG BẠN TÌM KIẾM KHÔNG TỒN TẠI</h2>
                    <p>Trang đã bị xóa hoặc địa chỉ url không đúng!!!</p>
                </div>
                <Link to="/" className="NotFound_back">
                    Trang chủ
                </Link>
            </div>
        </div>
    )
}

export default NotFound
