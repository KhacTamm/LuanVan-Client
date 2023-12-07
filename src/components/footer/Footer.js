import { Link } from 'react-router-dom'

import { BsYoutube, BsInstagram } from 'react-icons/bs'
import { GrFacebook } from 'react-icons/gr'
import { FaTiktok } from 'react-icons/fa'

import './Footer.css'

function Footer() {
    return (
        <footer>
            <div className="cl1">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <h2 className="text-white mb-4">Liên hệ với chúng tôi</h2>
                            <div className="footer-links d-flex flex-column">
                                <address className="text-white py-2 mb-1">
                                    Đại học Cần Thơ - Khu II, Đ.3/2, Q. Ninh Kiều, TP. Cần Thơ
                                </address>
                                <Link className="mt-3 d-block mb-3 footer-text" href="tel: +91-999999999">
                                    +(84) 999999999
                                </Link>
                                <Link href="mailto:bate@gmail.com" className="footer-text py-2 mb-2">
                                    Velastro@gmail.com
                                </Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h2 className="text-white mb-4">Hỗ trợ khách hàng</h2>
                            <div className="footer-links d-flex flex-column">
                                <Link className="footer-text py-2 mb-1" to="">
                                    Chính sách vận chuyển
                                </Link>
                                <Link className="footer-text py-2 mb-1" to="">
                                    Chính sách đổi trả
                                </Link>
                                <Link className="footer-text py-2 mb-1" to="">
                                    Phương thức thanh toán
                                </Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h2 className="text-white mb-4">Tài khoản của bạn</h2>
                            <div className="footer-links d-flex flex-column">
                                <Link className="footer-text py-2 mb-1" to="">
                                    Cập nhật tài khoản
                                </Link>
                                <Link className="footer-text py-2 mb-1" to="">
                                    Giỏ hàng
                                </Link>
                                <Link className="footer-text py-2 mb-1" to="">
                                    Lịch sử giao dịch
                                </Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h2 className="text-white mb-4">Kết nối với Velastro Book Store</h2>
                            <div className="social_icons d-flex align-items-center gap">
                                <Link className="footer-text social_icon" href="#">
                                    <GrFacebook />
                                </Link>
                                <Link className="footer-text social_icon" href="#">
                                    <BsInstagram />
                                </Link>
                                <Link className="footer-text social_icon" href="#">
                                    <FaTiktok />
                                </Link>
                                <Link className="footer-text social_icon" href="#">
                                    <BsYoutube />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center mb-0 text-white">
                                &copy; {new Date().getFullYear()}: Bản quyền của Công Ty Cổ Phần Văn Hóa Velastro -
                                velastro.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
