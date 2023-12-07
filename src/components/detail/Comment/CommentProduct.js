import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
// import { commentProduct, getproductById } from '../../actions/ProductAction'
import { commentProduct, getproductById } from '../../redux/actions/ProductAction'

import './Comment.css'
import { Col } from 'antd'
import { IoSend } from 'react-icons/io5'

import AllComment from './AllComment'

function CommentProduct(props) {
    const { id } = useParams()
    const history = useNavigate()
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const allComment = useSelector((state) => state.getProductById.product.comments)
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin

    const Comment = () => {
        if (userInfo) {
            const comment = {
                author: userInfo.name,
                isAdmin: userInfo.isAdmin,
                content: value,
                byUser: userInfo._id,
            }
            dispatch(commentProduct(id, comment))
            setValue('')
        } else {
            history(config.routes.login)
        }
    }
    useEffect(() => {
        dispatch(getproductById(id))
    }, [])

    return (
        <div className="comment">
            <Col span={24} align="start" style={{ alignItems: 'center' }}>
                <div className="comment-header">
                    <div className="comment-area" style={{ display: 'flex', alignItems: 'center' }}>
                        <textarea
                            placeholder="Xin mời để lại câu hỏi, Ba-Tê sẽ trả lời trong 1h từ 8h - 22h mỗi ngày."
                            rows={10}
                            cols={3}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="comment-send" onClick={() => Comment()}>
                        <IoSend />
                    </div>
                </div>
            </Col>

            <AllComment allComment={allComment}></AllComment>
        </div>
    )
}

export default CommentProduct
