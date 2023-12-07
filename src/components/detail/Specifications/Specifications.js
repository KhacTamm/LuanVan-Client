import './Specifications.css'

function Specifications(props) {
    const { product } = props

    return (
        <ul className="technical-content">
            {product.type !== 'undefined' && product.type ? (
                <li className="technical-content-item">
                    <p>Thể loại</p>
                    <span>{product.type}</span>
                </li>
            ) : (
                ''
            )}
            {product.author !== 'undefined' && product.author ? (
                <li className="technical-content-item">
                    <p>Tác giả</p>
                    <span>{product.author}</span>
                </li>
            ) : (
                ''
            )}
            {product.translator !== 'undefined' && product.translator ? (
                <li className="technical-content-item">
                    <p>Dịch giả</p>
                    <span>{product.translator}</span>
                </li>
            ) : (
                ''
            )}
            {product.publisher !== 'undefined' && product.type ? (
                <li className="technical-content-item">
                    <p>Nhà xuất bản</p>
                    <span>{product.publisher}</span>
                </li>
            ) : (
                ''
            )}
            {product.size !== 'undefined' && product.size ? (
                <li className="technical-content-item">
                    <p>Kích thước</p>
                    <span>{product.size}</span>
                </li>
            ) : (
                ''
            )}
            {product.page !== 'undefined' && product.page ? (
                <li className="technical-content-item">
                    <p>Số trang</p>
                    <span>{product.page}</span>
                </li>
            ) : (
                ''
            )}
            {product.coverType !== 'undefined' && product.coverType ? (
                <li className="technical-content-item">
                    <p>Loại bìa</p>
                    <span>{product.coverType}</span>
                </li>
            ) : (
                ''
            )}
            {product.datePublisher !== 'undefined' && product.author ? (
                <li className="technical-content-item">
                    <p>Ngày xuất bản</p>
                    <span>{product.datePublisher}</span>
                </li>
            ) : (
                ''
            )}
        </ul>
    )
}

export default Specifications
