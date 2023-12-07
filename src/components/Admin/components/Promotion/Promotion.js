import { Link } from 'react-router-dom'
import { formatDate, formatPrice, isExpired, isDaypromotion } from '../../../../untils'
import IconCustomer from '../FromComponents/IconCustomer/IconCustomer'

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { FiTrash, FiEdit } from 'react-icons/fi'

import { useState } from 'react'
import ModalCustomer from '../../../Modal/ModalCustomer'
import { useDispatch } from 'react-redux'
import { deletePromotion, getAllPromotion, updatePromotionVisible } from '../../../../redux/actions/PromotionAction'
import { Modal } from 'antd'
import { success } from '../../../Message/Message'

function Promotion(props) {
    const { voucher, number } = props
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(voucher.visible ? voucher.visible : '')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalVisibleOpen, setIsModalVisibleOpen] = useState(false)

    const handleRemoveItem = async (item) => {
        setIsModalOpen(false)
        await dispatch(deletePromotion(item))
        success('Xóa chương trình khuyến mãi thành công')
        await dispatch(getAllPromotion())
    }

    const handleVisisble = async (id) => {
        await setVisible(!visible)
        setIsModalVisibleOpen(false)
        const dataVisible = { visible: !visible }
        dispatch(updatePromotionVisible(dataVisible, id))
    }

    return (
        <tr>
            <td>{number + 1}</td>
            <td>{voucher.name}</td>
            <td>{formatPrice(voucher.limmit)}₫</td>
            <td>{formatPrice(voucher.condition)}₫</td>
            <td>{voucher.qty}</td>
            <td>{voucher.used}</td>
            <td>{formatDate(voucher.dayStart)}</td>
            <td>{formatDate(voucher.dayEnd)}</td>
            <td>
                {isDaypromotion(voucher.dayStart, voucher.dayEnd) ? (
                    voucher.qty > voucher.used ? (
                        <div style={{ fontWeight: '600', color: '#008000' }}> Đã Kích Hoạt</div>
                    ) : (
                        <div style={{ fontWeight: '600', color: 'rgb(205, 0, 0)' }}> Hết Mã</div>
                    )
                ) : isExpired(voucher.dayEnd) ? (
                    <div style={{ fontWeight: '600', color: 'rgb(205, 0, 0)' }}>Hết Hạn</div>
                ) : (
                    <div style={{ fontWeight: '600', color: 'rgb(255, 182, 28)' }}>Sắp Kích Hoạt</div>
                )}
            </td>
            <td className="show">
                <Link onClick={() => setIsModalVisibleOpen(true)}>
                    {isDaypromotion(voucher.dayStart, voucher.dayEnd) ? (
                        visible ? (
                            <EyeOutlined />
                        ) : (
                            <EyeInvisibleOutlined />
                        )
                    ) : (
                        ''
                    )}
                </Link>
                {visible ? (
                    <Modal
                        title="Xác nhận ẩn Voucher"
                        centered
                        open={isModalVisibleOpen}
                        onCancel={() => setIsModalVisibleOpen(false)}
                        onOk={() => handleVisisble(voucher._id)}
                        width={440}
                        okText="Ẩn"
                        cancelText="Hủy"
                    >
                        <p className="modal-content">Bạn có chắc chắn ẩn Voucher này ở phía khách hàng?</p>
                    </Modal>
                ) : (
                    <Modal
                        title="Xác nhận hiện Voucher"
                        centered
                        open={isModalVisibleOpen}
                        onCancel={() => setIsModalVisibleOpen(false)}
                        onOk={() => handleVisisble(voucher._id)}
                        width={440}
                        okText="Hiện"
                        cancelText="Hủy"
                    >
                        <p className="modal-content">Bạn có chắc chắn ẩn Voucher này ở phía khách hàng?</p>
                    </Modal>
                )}
            </td>
            <IconCustomer>
                <Link to={`/admin/promotion/update/${voucher._id}`}>
                    <FiEdit></FiEdit>
                </Link>
            </IconCustomer>
            <IconCustomer isDelete>
                <FiTrash onClick={() => setIsModalOpen(true)} />
            </IconCustomer>
            <ModalCustomer
                isModalOpen={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
                handleFunction={() => handleRemoveItem(voucher._id)}
                lable="voucher"
            />
        </tr>
    )
}

export default Promotion
