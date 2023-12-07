import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthorById } from '../../../redux/actions/AuthorAction'
import { useParams } from 'react-router-dom'
import OutstandingsearchProduct from './OutstandingsearchProduct/OutstandingsearchProduct'
import OutstandingsearchAuthor from './OutstandingsearchAuthor/OutstandingsearchAuthor'
import './Outstandingsearch.css'

function Outstandingsearch() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { author } = useSelector((state) => state.getAuthorById)

    useEffect(() => {
        dispatch(getAuthorById(id))
    }, [dispatch, id])

    return (
        <div className="outstandingsearch">
            <div className="outstanding_author-item">
                <div className="outstanding_author-title">Tác giả {author ? author.name : ''}</div>
                <OutstandingsearchAuthor author={author ? author : ''} />
            </div>
            <OutstandingsearchProduct authorName={author ? author.name : ''} id={id} />
        </div>
    )
}

export default Outstandingsearch
