import SortByPrice from '../SortByPrice/SortByPrice'
import './HeaderFilter.css'

function HeaderFilter({ name, product }) {
    return (
        <div className="header_filter">
            <div className="title_filter">{name}</div>
            <div className="display_allProduct">
                <span className="nav_title">Sắp xếp theo</span>
                <SortByPrice products={product ? product : ''} />
            </div>
        </div>
    )
}

export default HeaderFilter
