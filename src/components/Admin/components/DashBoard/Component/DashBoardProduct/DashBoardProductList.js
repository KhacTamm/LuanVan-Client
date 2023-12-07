import { formatPrice } from '../../../../../../untils'
import './DashBoardProductList.css'

function DashBoardProductList(props) {
    const { book } = props
    return (
        <div className="dashboard-product-list">
            <div className="dashboard-product-list_col-1">
                <img src={book.image} alt="image" className="dashboard-product-list_col-1-image"></img>
            </div>
            <div className="dashboard-product-list_col-2">
                <p className="dashboard-product-list_col-2_name">{book.name} </p>
                {book.price ? (
                    <p className="dashboard-product-list_col-2_price high-price">{formatPrice(book.price)}₫</p>
                ) : (
                    ''
                )}
                <p className="dashboard-product-list_col-2_price sale-price">
                    {formatPrice(book.salePrice ? book.salePrice : '')}₫
                </p>
            </div>
        </div>
    )
}

export default DashBoardProductList
