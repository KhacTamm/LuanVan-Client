import './error.css'

function Error(props) {
    const { error, style } = props
    return (
        <div className="error">
            <span style={style}>{error}</span>
        </div>
    )
}

export default Error
