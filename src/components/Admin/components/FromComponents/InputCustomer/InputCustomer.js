import './InputCustomer.css'

function InputCustomer({ children, lable }) {
    return (
        <div className="item-input">
            <label>{lable}</label>
            <div className="input-admin">{children}</div>
        </div>
    )
}

export default InputCustomer
