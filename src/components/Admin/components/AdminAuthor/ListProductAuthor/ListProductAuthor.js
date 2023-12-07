import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getAuthorById, removeAuthorById } from '../../../../../redux/actions/AuthorAction'

import config from '../../../../../config'

import ProductAuthor from './ProductAuthor'
import HeaderText from '../../TextAdmin/HeaderText/HeaderText'

import { GiReturnArrow } from 'react-icons/gi'
import './ListProductAuthor.css'

function ListProductAuthor() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const detailAuthor = useSelector((state) => state.getAuthorById.author)

    useEffect(() => {
        if (id) {
            dispatch(getAuthorById(id))
        }

        return () => {
            dispatch(removeAuthorById())
        }
    }, [dispatch, id])

    return (
        <div>
            <HeaderText lable={detailAuthor ? `Các tác phẩm của tác giả  ${detailAuthor.name}` : ''}>
                <Link to={config.routes.author}>
                    <GiReturnArrow />
                </Link>
            </HeaderText>
            <div className="list_product_author">
                <ProductAuthor authorName={detailAuthor ? detailAuthor.name : ''} />
            </div>
        </div>
    )
}

export default ListProductAuthor
