import images from '../../assets'
import './Introduce.css'

import { ImPhone } from 'react-icons/im'
import { SiGmail } from 'react-icons/si'
import { GrFacebook } from 'react-icons/gr'
import { BsInstagram } from 'react-icons/bs'
import { FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Introduce() {
    return (
        <div className="row d-flex flex-column align-items-center">
            <div className="col-10">
                <div className="introduce_header">
                    <img className="introduce_header-img" src={images.intro1} alt="img" />
                    <div className="introduce_header-text">Velastro Book Store</div>
                </div>
                <div className="pt-4">
                    <p className="pt-4">
                        <b style={{ fontSize: '1.8rem' }}>Velastro</b> là một hệ thống nhà sách mà từ lâu đã trở thành
                        một phần không thể thiếu trong cuộc sống của nhiều gia đình Việt Nam. Kể từ khi mở cửa cửa hàng
                        đầu tiên vào năm 2001, Velastro đã không ngừng phát triển và trở thành một điểm đến lý tưởng cho
                        những người yêu sách.
                    </p>
                    <p className="pt-4">
                        Tại Velastro, chúng tôi tự hào mang đến cho khách hàng một trải nghiệm mua sắm trực tuyến an
                        toàn và tiện lợi. Chúng tôi luôn nỗ lực không ngừng để hoàn thiện và nâng cao chất lượng sản
                        phẩm và dịch vụ của mình. Điều này bao gồm việc cung cấp một bộ sưu tập đa dạng các cuốn sách
                        hay từ nhiều thể loại khác nhau, xuất bản bởi các công ty sách uy tín trong và ngoài nước. Mua
                        sắm tại Velastro là một trải nghiệm dễ dàng và tiện lợi. Khách hàng có thể tìm thấy những cuốn
                        sách yêu thích của họ và đặt hàng một cách đơn giản. Chúng tôi cung cấp nhiều phương thức thanh
                        toán đa dạng để đảm bảo rằng mọi giao dịch được thực hiện một cách thuận tiện cho bạn. Chúng tôi
                        cũng chú trọng đến việc cung cấp dịch vụ chăm sóc khách hàng tận tình và chu đáo. Chúng tôi luôn
                        sẵn sàng lắng nghe ý kiến của bạn và giải quyết mọi vấn đề một cách nhanh chóng và hiệu quả.
                    </p>
                    <p className="pt-4">
                        Velastro tự hào là một phần của hành trình đọc sách và khám phá tri thức của bạn. Chúng tôi hi
                        vọng rằng bạn sẽ tìm thấy tại đây những cuốn sách thú vị và bổ ích, và chúng tôi luôn sẵn sàng
                        hỗ trợ bạn trong mọi khía cạnh của cuộc hành trình đó. Cảm ơn bạn đã ủng hộ Velastro suốt thời
                        gian qua.
                    </p>
                </div>
                <div className="intro">
                    <div className="intro-content">
                        <h2 style={{ fontWeight: 800, textAlign: 'center' }}>THÔNG TIN CHUNG</h2>
                        <div className="py-2">
                            <span style={{ fontSize: '2.4rem', fontWeight: '600', color: 'rgb(109, 121, 181)' }}>
                                08:00 AM - 22:00 PM
                            </span>
                            <p style={{ marginTop: '4px' }}>
                                Đại học Cần Thơ - Khu II, Đ.3/2, Q. Ninh Kiều, TP. Cần Thơ
                            </p>
                        </div>
                        <ul className="intro-content_item">
                            <li>
                                <Link href="tel: +91-999999999">
                                    <ImPhone />
                                    +(84) 999999999
                                </Link>
                            </li>
                            <li>
                                <Link href="mailto:Velastro@gmail.com">
                                    <SiGmail />
                                    Velastro@gmail.com
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <GrFacebook />
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <BsInstagram />
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <FaTiktok />
                                    Tiktok
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <img className="intro-img" src={images.intro2} alt="img" />
                </div>
            </div>
        </div>
    )
}

export default Introduce
