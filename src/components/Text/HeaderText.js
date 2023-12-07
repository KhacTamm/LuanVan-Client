import './HeaderText.css'

function HeaderText(props) {
    const { title } = props

    return (
        <>
            <strong className="categories-title">{title}</strong>
        </>
    )
}

export default HeaderText
