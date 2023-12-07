import './ReceiptManagement.css'
import { TfiReload } from 'react-icons/tfi'
import { BsBoxSeam } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'
import { ImCancelCircle } from 'react-icons/im'
import { FaRegCheckCircle } from 'react-icons/fa'

function ReceiptManagement({ orderShipping, orderPendding, orderCancel }) {
    return (
        <div className="receipt-management">
            <div className="receipt-management_title">Trạng thái đơn hàng</div>
            <div>
                <div className="receipt-management_progress">
                    <TfiReload></TfiReload>
                    <p>Chờ xác nhận</p>
                    <div className="progress">
                        <div
                            className="progress-bar "
                            style={{ width: `${orderPendding}%`, backgroundColor: 'rgb(205, 0, 0)' }}
                        ></div>
                    </div>
                    <div className="total-receipt"> {orderPendding} đơn</div>
                </div>
                <div className="receipt-management_progress">
                    <BsBoxSeam></BsBoxSeam>
                    <p>Chờ lấy hàng</p>
                    <div className="progress">
                        <div
                            className="progress-bar bg-success"
                            style={{ width: `${orderShipping}%`, backgroundColor: 'green' }}
                        ></div>
                    </div>
                    <div className="total-receipt">{orderShipping} đơn</div>
                </div>
                <div className="receipt-management_progress">
                    <TbTruckDelivery></TbTruckDelivery>
                    <p>Đang vận chuyển</p>
                    <div className="progress">
                        <div
                            className="progress-bar "
                            style={{ width: '0%', backgroundColor: 'rgb(109, 121, 181)' }}
                        ></div>
                    </div>
                    <div className="total-receipt">0 đơn</div>
                </div>
                <div className="receipt-management_progress">
                    <FaRegCheckCircle></FaRegCheckCircle>
                    <p>Đã giao hàng</p>
                    <div className="progress">
                        <div
                            className="progress-bar "
                            style={{ width: '0%', backgroundColor: 'rgb(109, 121, 181)' }}
                        ></div>
                    </div>
                    <div className="total-receipt">0 đơn</div>
                </div>
                <div className="receipt-management_progress">
                    <ImCancelCircle></ImCancelCircle>
                    <p>Đơn hủy</p>
                    <div className="progress">
                        <div
                            className="progress-bar "
                            style={{ width: `${orderCancel}%`, backgroundColor: '#666666' }}
                        ></div>
                    </div>
                    <div className="total-receipt">{orderCancel} đơn</div>
                </div>
            </div>
        </div>
    )
}

export default ReceiptManagement
