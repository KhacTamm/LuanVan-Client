import React from 'react'
import User from './User'

function ListUser(props) {
    const { users, search } = props

    return (
        <div className="admin-user-list">
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên tài khoản</th>
                        <th style={{ textAlign: 'center' }}>Email</th>
                        <th style={{ textAlign: 'center' }}>Số điện thoại</th>
                        <th style={{ textAlign: 'center' }}>Đơn hàng</th>
                        <th style={{ textAlign: 'center' }}>Ngày lập tài khoản</th>
                        <th colSpan="2" style={{ textAlign: 'center', paddingRight: '4px' }}>
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) =>
                        item.isAdmin === false ? <User key={index} user={item} number={index} /> : '',
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListUser
