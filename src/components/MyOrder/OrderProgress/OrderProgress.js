import { TfiReload } from 'react-icons/tfi'
import { BsBoxSeam, BsCheck2 } from 'react-icons/bs'
import { MdOutlineLocalShipping } from 'react-icons/md'
import './OrderProgress.css'

function OrderProgress({ status }) {
    return (
        <div className="order-progress">
            <div className={status === 'pendding' ? 'order-progress-item active' : 'order-progress-item'}>
                <div className="order-progress-content">
                    <div className="order-progress_icon">
                        <TfiReload />
                    </div>
                    <p>Chờ xác nhận</p>
                </div>
                <p className="line"></p>
            </div>
            <div className={status === 'shipping' ? 'order-progress-item active' : 'order-progress-item'}>
                <div className="order-progress-content">
                    <div className="order-progress_icon">
                        <BsBoxSeam />
                    </div>
                    <p>Chờ lấy hàng</p>
                </div>
                <p className="line"></p>
            </div>
            <div className={status === 'paid' ? 'order-progress-item active' : 'order-progress-item'}>
                <div className="order-progress-content">
                    <div className="order-progress_icon">
                        <MdOutlineLocalShipping />
                    </div>
                    <p>Đang vận chuyển</p>
                </div>
                <p className="line"></p>
            </div>
            <div className={status === 'finish' ? 'order-progress-item active' : 'order-progress-item'}>
                <div className="order-progress-content">
                    <div className="order-progress_icon">
                        <BsCheck2 />
                    </div>
                    <p>Đã nhận hàng</p>
                </div>
            </div>
        </div>
    )
}

export default OrderProgress
