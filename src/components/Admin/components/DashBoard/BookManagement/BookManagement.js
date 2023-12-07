import { Button, Modal } from 'antd'
import './BookManagement.css'
import { useMemo, useState } from 'react'
import { calculateTime, handleDataProduct } from '../../../../../untils'
import DashBoardProductList from '../Component/DashBoardProduct/DashBoardProductList'
import DashBoardProductEmpty from '../Component/DashBoardProductEmpty/DashBoardProductEmpty'

function BookManagement({ products }) {
    const product = handleDataProduct(products)
    // const [modal1Open, setModal1Open] = useState(false)
    const [modal2Open, setModal2Open] = useState(false)
    const [modal3Open, setModal3Open] = useState(false)
    const [modal4Open, setModal4Open] = useState(false)

    // const recentCreateProduct = useMemo(() => {
    //     const result = product.length ? product.filter((items) => calculateTime(items.createdAt, 777600000) <= 1) : []
    //     return result
    // }, [product])

    const runOutOfProduct = useMemo(() => {
        const result = product.length ? product.filter((items) => items.amount === 0) : []
        return result
    }, [product])

    const almostRunOutOfProduct = useMemo(() => {
        const result = product.length ? product.filter((items) => items.amount <= 5) : []
        return result
    }, [product])

    const bestSeller = useMemo(() => {
        const result = product.length
            ? product.filter((items) => calculateTime(items.updatedAt, 604800000) <= 1 && items.rating >= 3500)
            : //   .sort((a, b) => b.rating - a.rating)
              //   .slice(0, 10)
              []
        return result
    }, [product])

    return (
        <div className="book-management">
            <div className="book-management_title">Quản lý kho hàng</div>
            <table style={{ textAlign: 'center', width: '100%' }}>
                <tr>
                    <th>STT</th>
                    <th>Trạng thái</th>
                    <th>Số sản phẩm</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Bán chạy</td>

                    <Button
                        type="primary"
                        style={{
                            background:
                                // 'linear-gradient(45deg, rgb(253,100,8), rgb(255,159,11))'
                                'green',
                            margin: '4px',
                        }}
                        onClick={() => setModal4Open(true)}
                    >
                        {bestSeller.length} sản phẩm
                    </Button>
                    <Modal
                        title="Bán chạy"
                        centered
                        open={modal4Open}
                        onOk={() => setModal4Open(false)}
                        onCancel={() => setModal4Open(false)}
                        footer={null}
                        width={650}
                    >
                        <div className="modal-book-new">
                            {bestSeller.length > 0 ? (
                                bestSeller.map((item, index) => <DashBoardProductList book={item} key={index} />)
                            ) : (
                                <DashBoardProductEmpty titleAll="Chưa có sản phẩm!!!!" />
                            )}
                        </div>
                    </Modal>
                </tr>
                {/* <tr>
                    <td>1</td>
                    <td>Sách mới</td>
                    <td>
                        <Button type="primary" onClick={() => setModal1Open(true)} style={{ background: 'green' }}>
                            {recentCreateProduct.length} sản phẩm
                        </Button>
                    </td>
                    <Modal
                        title="Sách mới"
                        centered
                        open={modal1Open}
                        onOk={() => setModal1Open(false)}
                        onCancel={() => setModal1Open(false)}
                        footer={null}
                        width={650}
                    >
                        <div className="modal-book-new">
                            {recentCreateProduct.length > 0 ? (
                                recentCreateProduct.map((item, index) => (
                                    <DashBoardProductList book={item} key={index} />
                                ))
                            ) : (
                                <DashBoardProductEmpty titleAll="Chưa có sản phẩm!!!!" />
                            )}
                        </div>
                    </Modal>
                </tr> */}
                <tr>
                    <td>2</td>
                    <td>Còn 5 sản phẩm</td>
                    <Button
                        onClick={() => setModal2Open(true)}
                        type="primary"
                        style={{ background: 'rgb(255,182,28)', margin: '4px' }}
                    >
                        {almostRunOutOfProduct.length} sản phẩm
                    </Button>
                    <Modal
                        title="Còn 5 sản phẩm"
                        centered
                        open={modal2Open}
                        onOk={() => setModal2Open(false)}
                        onCancel={() => setModal2Open(false)}
                        footer={null}
                        width={650}
                    >
                        <div className="modal-book-new">
                            {almostRunOutOfProduct.length > 0 ? (
                                almostRunOutOfProduct.map((item, index) => (
                                    <DashBoardProductList book={item} key={index} />
                                ))
                            ) : (
                                <DashBoardProductEmpty titleAll="Chưa có sản phẩm!!!!" />
                            )}
                        </div>
                    </Modal>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Hết hàng</td>

                    <Button
                        type="primary"
                        style={{ background: '#CD0000', margin: '4px' }}
                        onClick={() => setModal3Open(true)}
                    >
                        {runOutOfProduct.length} sản phẩm
                    </Button>
                    <Modal
                        title="Hết hàng"
                        centered
                        open={modal3Open}
                        onOk={() => setModal3Open(false)}
                        onCancel={() => setModal3Open(false)}
                        footer={null}
                        width={650}
                    >
                        <div className="modal-book-new">
                            {runOutOfProduct.length > 0 ? (
                                runOutOfProduct.map((item, index) => <DashBoardProductList book={item} key={index} />)
                            ) : (
                                <DashBoardProductEmpty titleAll="Chưa có sản phẩm!!!!" />
                            )}
                        </div>
                    </Modal>
                </tr>
            </table>
        </div>
    )
}

export default BookManagement
