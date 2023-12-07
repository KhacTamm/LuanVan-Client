import './DashBoardProductEmpty.css'
import images from '../../../../../../assets'

function DashBoardProductEmpty({ style, title, titleAll }) {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center dash-board-product-empty"
            style={{ ...style }}
        >
            <img src={images.empty} alt="image" />
            <p className="dash-board-product-empty_text">{titleAll ? titleAll : `${title} chưa có sản phẩm nào.`}</p>
        </div>
    )
}

export default DashBoardProductEmpty
