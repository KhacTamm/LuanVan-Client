import images from '../../../assets'
import './EmptyProduct.css'

function EmptyProduct({ style, title, titleAll }) {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center empty-product"
            style={{ ...style }}
        >
            <img src={images.empty} alt="image-empty" />
            <p className="empty-product_text">{titleAll ? titleAll : `${title} chưa có sản phẩm nào.`}</p>
        </div>
    )
}

export default EmptyProduct
