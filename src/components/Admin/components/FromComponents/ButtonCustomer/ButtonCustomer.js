import './ButtonCustomer.css'

function ButtonCustomer({ type, children }) {
    // console
    return (
        <div className="admin-create">
            <button className="btn" type={type}>
                {children}
            </button>
        </div>
    )
}

export default ButtonCustomer
