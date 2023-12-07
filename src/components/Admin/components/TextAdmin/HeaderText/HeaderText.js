import './HeaderText.css'

function HeaderText({ children, lable, style }) {
    return (
        <div className="header-admin">
            <span style={style}>{lable}</span>
            <div className="header-admin_icon">{children}</div>
        </div>
    )
}

export default HeaderText
