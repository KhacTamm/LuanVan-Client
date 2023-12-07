import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { calculateCreatedTime, getFirstCharacterUser } from '../../../untils'

import { useDispatch, useSelector } from 'react-redux'
import {
    // pinCommentProduct,

    repCommentProduct,
} from '../../../redux/actions/ProductAction'

import './Comment.css'
import { Col, Rate } from 'antd'
import { IoChatboxOutline } from 'react-icons/io5'
import { MdSend } from 'react-icons/md'

import AllRepComment from './AllRepComment'
import AvatarCustomer from '../../Account/AvatarCustomer/AvatarCustomer'
import './Comment.css'
import config from '../../../config'

function AllComment(props) {
    const { id } = useParams()
    const history = useNavigate()
    const { allComment } = props
    const dispatch = useDispatch()
    const [repCmt, setRepCmt] = useState({ key: '', status: false })
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    const [repValue, setRepValue] = useState('')
    const showRepComment = (id) => {
        setRepCmt({ key: id, status: !repCmt.status })
    }
    const handleRepComment = (value) => {
        if (userInfo) {
            const comment = {
                idComment: repCmt.key,
                isAdmin: userInfo.isAdmin,
                content: repValue,
                nameUser: userInfo.name,
            }
            dispatch(repCommentProduct(id, comment))
            setRepValue('')
            setRepCmt({ key: '', status: false })
        } else {
            history(config.routes.login)
        }
    }

    // const PinComment = (comment) => {
    //     const UpdateComment = { ...comment, status: 'pin' }
    //     dispatch(pinCommentProduct(id, UpdateComment))
    // }

    return (
        <div className="all-comment">
            {allComment.map((comment, index) => (
                <div key={index} className="all-comment-wraper">
                    <Col span={24} style={{ marginTop: '1rem' }}>
                        <div className="all-comment-info">
                            <div style={{ display: 'flex' }}>
                                {comment.isAdmin ? (
                                    <AvatarCustomer src="https://res.cloudinary.com/dwaped9da/image/upload/v1695713100/kpsqnzorrkushhw2pnot.png" />
                                ) : (
                                    <p className="all-comment-info-name">
                                        {comment.avatar ? (
                                            <AvatarCustomer
                                                className="all-comment-info-name-img"
                                                src={comment.avatar}
                                                alt="img"
                                            />
                                        ) : (
                                            <span className="all-comment-info-name-noimg">
                                                {getFirstCharacterUser(comment.author)}
                                            </span>
                                        )}
                                    </p>
                                )}
                                {comment.isAdmin ? (
                                    <strong>
                                        {comment.author} <span>QTV</span>
                                    </strong>
                                ) : (
                                    <div className="cmt_wrap">
                                        <p className="name" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                            {comment.author}
                                        </p>
                                        <p>
                                            <Rate
                                                style={{ color: 'orange', fontSize: '1.6rem' }}
                                                value={comment.star}
                                                disabled={true}
                                            />
                                        </p>
                                        <p className="cmt">
                                            <span>{comment.content}</span>
                                        </p>
                                        <p>
                                            <span className="day">{calculateCreatedTime(comment.createdAt)}</span>
                                            <IoChatboxOutline
                                                style={{
                                                    marginLeft: '24px',
                                                    fontSize: '2.6rem',
                                                    color: 'rgb(109,121,181)',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => showRepComment(comment._id)}
                                            />
                                            <span
                                                style={{
                                                    color: 'rgb(114,114,114)',
                                                    marginLeft: '8px',
                                                }}
                                            >
                                                {comment.replies.length}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    {repCmt.status === true && repCmt.key === comment._id ? (
                        <Col
                            span={24}
                            align="start"
                            style={{
                                alignItems: 'center',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginBottom: '12px',
                            }}
                        >
                            <div className="comment-header">
                                <input
                                    className="comment-input"
                                    placeholder="Nhập câu trả lời"
                                    vaule={repValue}
                                    onChange={(e) => setRepValue(e.target.value)}
                                ></input>
                                <div className="comment-send" onClick={() => handleRepComment()}>
                                    <MdSend />
                                </div>
                            </div>
                        </Col>
                    ) : (
                        ''
                    )}
                    {comment.replies.length > 0 ? (
                        <AllRepComment
                            allrepcomment={comment.replies.reverse()}
                            showRepComment={showRepComment}
                            id={comment._id}
                        ></AllRepComment>
                    ) : (
                        ''
                    )}
                </div>
            ))}
        </div>
    )
}

export default AllComment
