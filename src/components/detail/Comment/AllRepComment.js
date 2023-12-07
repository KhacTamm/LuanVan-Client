import React from 'react'
// import { getFirstCharacterUser } from '../../untils'
import './Comment.css'
import { calculateCreatedTime, getFirstCharacterUser } from '../../../untils'
import AvatarCustomer from '../../Account/AvatarCustomer/AvatarCustomer'
import { BsPatchCheckFill } from 'react-icons/bs'
import './Comment.css'

function AllRepComment(props) {
    const { allrepcomment } = props

    return (
        <div className="all-comment-rep-list">
            {allrepcomment.map((repComment, index) => (
                <div key={index} className="all-comment-rep-list-item">
                    <div className="all-comment-info">
                        {repComment.isAdmin ? (
                            <AvatarCustomer src="https://res.cloudinary.com/dwaped9da/image/upload/v1695713100/kpsqnzorrkushhw2pnot.png" />
                        ) : (
                            <p className="all-comment-info-name">
                                {repComment.avatar ? (
                                    <AvatarCustomer
                                        className="all-comment-info-name-img"
                                        src={repComment.avatar}
                                        alt="img"
                                    />
                                ) : (
                                    <span className="all-comment-info-name-noimg">
                                        {getFirstCharacterUser(repComment.nameUser)}
                                    </span>
                                )}
                            </p>
                        )}
                        {repComment.isAdmin ? (
                            <div className="cmt_wrap">
                                <p className="name" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                    Velastro Book Store <BsPatchCheckFill style={{ color: '#0000FF' }} />
                                </p>
                                <p className="cmt">
                                    <span>{repComment.content}</span>
                                </p>
                                <p>
                                    <span className="day">{calculateCreatedTime(repComment.createdAt)}</span>
                                </p>
                            </div>
                        ) : (
                            <div className="cmt_wrap">
                                <p className="name" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                    {repComment.nameUser}
                                </p>
                                <p className="cmt">
                                    <span>{repComment.content}</span>
                                </p>
                                <p>
                                    <span className="day">{calculateCreatedTime(repComment.createdAt)}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllRepComment
