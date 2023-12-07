import './AvatarCustomer.css'

function AvatarCustomer({ src, style }) {
    return (
        <div className="avatar-customer" style={style ? style : { width: '50px', height: '50px' }}>
            <img alt="img-avatar" src={src} />
        </div>
    )
}

export default AvatarCustomer
