import './IconCustomer.css'

function IconCustomer({ children, isDelete, style }) {
    return (
        <td style={style ? style : { width: '45px' }}>
            <p className={isDelete ? 'icon delete-product' : 'icon update-product'}>{children}</p>
        </td>
    )
}

export default IconCustomer
