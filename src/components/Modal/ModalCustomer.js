import { Modal } from 'antd'
import './ModalCustomer.css'

function ModalCustomer({ handleFunction, handleCancel, isModalOpen, lable }) {
    return (
        <Modal
            centered
            okText="Xác nhận"
            cancelText="Hủy"
            title={`Xác nhận xóa ${lable}`}
            open={isModalOpen}
            onOk={handleFunction}
            onCancel={handleCancel}
            width={440}
        >
            <p className="modal-content">{`Bạn có chắc chắn muốn xóa ${lable} này?`}</p>
        </Modal>
    )
}

export default ModalCustomer
