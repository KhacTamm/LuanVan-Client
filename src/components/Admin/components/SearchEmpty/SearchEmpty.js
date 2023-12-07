import './SearchEmpty.css'
import images from '../../../../assets'

function SearchEmpty({ title, keySearch, GoBack, titleBtn, create }) {
    if (keySearch === '') {
        GoBack()
    }

    return (
        <>
            {!create ? (
                <div className="admin-search-empty">
                    <img className="admin-search-empty_img" alt="img" src={images.admin404} />
                    <div className="admin-search-empty_title">
                        Không tìm thấy {title} "{keySearch}"
                    </div>
                    <button className="admin-search-empty_btn" onClick={GoBack}>
                        {titleBtn}
                    </button>
                </div>
            ) : (
                <div style={{ color: 'rgb(225,27,30)' }}>Không tìm thấy kết quả phù hợp</div>
            )}
        </>
    )
}

export default SearchEmpty
