import { Pagination } from 'antd'

import './PaginationCustomer.css'

function PaginationCustomer(props) {
    const { defaultCurrent, currentPage, pages, HandleChangePage } = props
    return (
        <div className="paginationCustomer">
            <Pagination
                defaultCurrent={defaultCurrent}
                current={currentPage}
                total={pages * 10}
                onChange={HandleChangePage}
                showLessItems
            />
        </div>
    )
}

export default PaginationCustomer
