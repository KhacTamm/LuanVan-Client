import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editCurrentPage, paginationAuthor } from '../../redux/actions/AuthorAction'
import './AllAuthorUser.css'
import AuthorUser from './AuthorUser/AuthorUser'
import PaginationCustomer from '../Pagination/PaginationCustomer'

function AllAuthorUser() {
    const dispatch = useDispatch()
    const currentPage = useSelector((state) => state.allAuthor.currentPage)
    const { authorLists } = useSelector((state) => state.allAuthor.authorList)
    const { pages } = useSelector((state) => state.allAuthor.authorList)

    useEffect(() => {
        dispatch(paginationAuthor(currentPage, 12))
    }, [dispatch, currentPage])

    const HandleChangePage = async (number) => {
        await dispatch(paginationAuthor(number, 12))
        await dispatch(editCurrentPage(number))
    }

    return (
        <div className="row d-flex flex-column align-items-end justify-content-between all-author-user">
            <div>
                <div className="header-filter-all-author">
                    <div className="title_filter">Tác giả</div>
                </div>
                <div className="all-author-user-list-product">
                    {authorLists ? authorLists.map((item, index) => <AuthorUser key={index} items={item} />) : ''}
                </div>
            </div>

            <div
                className="pagination"
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
            >
                {authorLists ? (
                    <PaginationCustomer
                        defaultCurrent={1}
                        currentPage={currentPage}
                        pages={pages}
                        HandleChangePage={HandleChangePage}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default AllAuthorUser
