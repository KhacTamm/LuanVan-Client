import { Link, useParams } from 'react-router-dom'
import HeaderText from '../../TextAdmin/HeaderText/HeaderText'
import { GiReturnArrow } from 'react-icons/gi'

import { useDispatch, useSelector } from 'react-redux'

import EmptyOrder from '../../AdminOrder/EmptyOrder/EmptyOrder'
import { formatPrice, formatTimeDate } from '../../../../../untils'
import { getOrderByUser } from '../../../../../redux/actions/OrderAction'
import { useEffect } from 'react'
import { getUserById, removeUserById } from '../../../../../redux/actions/UserAction'

import './OrderUser.css'

function OrderUser() {
    const dispatch = useDispatch()
    const { myOrders } = useSelector((state) => state.orderByUser)
    const user = useSelector((state) => state.getUserById.userId)

    const { id } = useParams()

    useEffect(() => {
        dispatch(getOrderByUser(id))
        dispatch(getUserById(id))
    }, [dispatch, id])

    const handleBack = async () => {
        dispatch(removeUserById())
        window.history.back()
    }

    return (
        <>
            <div className="admin-customer-page">
                <HeaderText lable={`Lịch sử mua hàng của khách hàng ${user ? user.name : ''}`}>
                    <Link onClick={handleBack}>
                        <GiReturnArrow />
                    </Link>
                </HeaderText>
                <div className="myorder-item-admin">
                    <div>
                        <div className="all-myorder">
                            {myOrders && myOrders.length > 0 ? (
                                myOrders.map((item, index) => orderParent(item, index))
                            ) : (
                                <EmptyOrder></EmptyOrder>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const orderItem = (item) => (
    <div className="all-myorder-item">
        <div className="all-myorder-item-img">
            <img alt="image" src={item.image}></img>
        </div>
        <div className="all-myorder-item-name">
            <p>{item.name}</p>
            <div className="all-myorder-item-price">{formatPrice(item.salePrice)}₫</div>
            <span>Số lượng: {item.qty}</span>
        </div>
    </div>
)

export const orderParent = (item, index) => (
    <div key={index} className="all-myorder-parent-item">
        <div className="all-myorder-header">
            <div className="time-order">
                <p>Đã đặt đơn hàng vào</p>
                <div>{formatTimeDate(item.createdAt)}</div>
            </div>
            <div className="totalPrice-order">
                <p>Tổng số tiền </p>
                <strong style={{ color: '#d70018' }}>{formatPrice(item.totalPriceFeeShip)}₫</strong>
            </div>
        </div>
        <div className="all-myorder-list">
            <div className="all-myorder-product">{item.orderItems.map((item) => orderItem(item))}</div>
        </div>
        {item.cancelOrder ? (
            <div
                style={{
                    textAlign: 'end',
                    padding: '12px',
                    fontWeight: '600',
                    color: 'rgb(109, 121, 181)',
                    fontSize: '1.8rem',
                }}
            >
                Đã hủy
            </div>
        ) : (
            <div
                style={{
                    textAlign: 'end',
                    padding: '12px',
                    fontWeight: '600',
                    color: 'rgb(109, 121, 181)',
                    fontSize: '1.8rem',
                }}
            >
                {item.status === 'pendding' ? ' Chờ xác nhận' : ''}
                {item.status === 'shipping' ? ' Chờ lấy hàng' : ''}
                {item.status === 'delivery' ? ' Đang vận chuyển' : ''}
                {item.status === 'paid' ? ' Đã nhận hàng' : ''}
            </div>
        )}
    </div>
)

export default OrderUser
