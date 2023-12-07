import React from 'react'
// import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'

export default function VnPaySuccess() {
    // const location = useLocation()

    // useEffect(() => {
    //     const getResultVNPay = async () => {
    //         const query = location.search
    //         const { data } = await axios.get(`http://localhost:4000/payment/vnpay_return${query}`)
    //     }

    //     getResultVNPay()
    // }, [])
    return (
        <section id="order-success">
            <div className="order-success">
                <div className="order-success_header">
                    <FaCheckCircle style={{ marginRight: '12px' }} /> <p>Đặt hàng thành công</p>
                </div>
                <h2 style={{ margin: '25px 0 35px 0', fontSize: '2.6rem' }}>
                    Cảm ơn bạn đã tin tưởng và lựa chọn Velastro
                </h2>
                <div className="links">
                    <Link to="/myOrder">Xem lại đơn hàng</Link>
                    <Link to="/">Trang chủ</Link>
                </div>
            </div>
        </section>
    )
}
