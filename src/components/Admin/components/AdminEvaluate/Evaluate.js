import { Link } from 'react-router-dom'
import { calculateCreatedTime, formatDate } from '../../../../untils'
import IconCustomer from '../FromComponents/IconCustomer/IconCustomer'
import ModalCustomer from '../../../Modal/ModalCustomer'
import { useState } from 'react'
import { MdOutlineQuickreply } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteRateProduct, getAllRateProduct, repCommentProduct } from '../../../../redux/actions/ProductAction'
import { success } from '../../../Message/Message'
import { Modal, Rate } from 'antd'
import { AiTwotoneStar } from 'react-icons/ai'
import AvatarCustomer from '../../../Account/AvatarCustomer/AvatarCustomer'
import { BsPatchCheckFill } from 'react-icons/bs'

import { FiTrash } from 'react-icons/fi'

function Evaluate(props) {
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    const { rate, number } = props
    const dispatch = useDispatch()
    const [repValue, setRepValue] = useState('')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenReplyRate, setIsModalOpenReplyRate] = useState(false)

    const handleDeleteRate = async (idProduct, idRate) => {
        setIsModalOpen(false)
        await dispatch(DeleteRateProduct(idProduct, idRate))
        await dispatch(getAllRateProduct())
        await success('Xóa đánh giá thành công')
    }

    const handleRepComment = async (idProduct, idRate) => {
        if (userInfo) {
            const comment = {
                idComment: idRate,
                isAdmin: userInfo.isAdmin,
                content: repValue,
                nameUser: userInfo.name,
            }

            try {
                // await setIsModalOpenReplyRate(false)
                await dispatch(repCommentProduct(idProduct, comment))
                await dispatch(getAllRateProduct())
                await setRepValue('')
                success('Phản hồi đánh giá thành công')
            } catch (error) {
                console.error('Đã xảy ra lỗi:', error)
            }
        }
    }
    return (
        <tr>
            <td>{number + 1}</td>
            <td className="image-product-evaluate" style={{ textAlign: 'center' }}>
                <img alt="image-product" src={rate.productImg}></img>
            </td>

            <td
                style={{
                    maxWidth: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                <Link className="rate-admin-name-product" to={`/product/detail/${rate.productId}`}>
                    {rate.productName}
                </Link>
            </td>
            <td style={{ textAlign: 'center' }}>
                {rate.commentData.star}
                <AiTwotoneStar
                    style={{
                        fontSize: '1.8rem',
                        color: 'rgb(255, 120, 30)',
                        margin: '0 12px 0 5px',
                    }}
                ></AiTwotoneStar>
            </td>
            <td
                style={{
                    textAlign: 'center',
                    maxWidth: '120px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {rate.commentData.content}
            </td>
            <td style={{ textAlign: 'center' }}>{rate.commentData.author}</td>
            <td style={{ textAlign: 'center' }}>{formatDate(rate.commentData.createdAt)}</td>

            <IconCustomer style={{ width: '50px' }}>
                <MdOutlineQuickreply onClick={() => setIsModalOpenReplyRate(true)}></MdOutlineQuickreply>
            </IconCustomer>
            <Modal
                title="Phản hồi đánh giá khách hàng"
                open={isModalOpenReplyRate}
                onOk={() => handleRepComment(rate.productId, rate.commentData._id)}
                onCancel={() => setIsModalOpenReplyRate(false)}
                width={650}
                okText="Phản hồi"
                cancelText="Hủy"
                style={{
                    top: '30px',
                }}
            >
                <div className="modal-reply-rate">
                    <div className="modal-reply-rate-user">
                        <AvatarCustomer src={rate.commentData.avatar}></AvatarCustomer>
                        <div className="modal-reply-rate-user_in4">
                            <div className="name" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                {rate.commentData.author}
                            </div>
                            <div>
                                <Rate
                                    style={{ color: 'orange', fontSize: '1.6rem' }}
                                    value={rate.commentData.star}
                                    disabled={true}
                                />
                            </div>
                            <div className="cmt">
                                <span>{rate.commentData.content}</span>
                            </div>
                            <div>
                                <span className="day">{calculateCreatedTime(rate.commentData.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-reply-rate-user-reply">
                        {rate.commentData.replies.length > 0
                            ? rate.commentData.replies.map((item, index) => (
                                  <div key={index} className="modal-reply-rate-user_replay-in4">
                                      <div>
                                          {item.isAdmin ? (
                                              <AvatarCustomer src="https://res.cloudinary.com/dwaped9da/image/upload/v1695713100/kpsqnzorrkushhw2pnot.png" />
                                          ) : (
                                              <AvatarCustomer
                                                  className="all-comment-info-name-img"
                                                  src={item.avatar}
                                                  alt="img"
                                              />
                                          )}
                                      </div>
                                      {item.isAdmin ? (
                                          <div className="cmt_wrap">
                                              <div className="name" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                                  Velastro Book Store <BsPatchCheckFill style={{ color: '#0000FF' }} />
                                              </div>
                                              <div className="cmt">
                                                  <span>{item.content}</span>
                                              </div>
                                              <div>
                                                  <span className="day">{calculateCreatedTime(item.createdAt)}</span>
                                              </div>
                                          </div>
                                      ) : (
                                          <div className="cmt_wrap">
                                              <div className="name" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                                  {item.nameUser}
                                              </div>
                                              <div className="cmt">
                                                  <span>{item.content}</span>
                                              </div>
                                              <div>
                                                  <span className="day">{calculateCreatedTime(item.createdAt)}</span>
                                              </div>
                                          </div>
                                      )}
                                  </div>
                              ))
                            : ''}
                    </div>
                    <div className="reply-admin-header">
                        <textarea
                            className="comment-input"
                            placeholder="Nhập câu trả lời"
                            value={repValue}
                            onChange={(e) => setRepValue(e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </Modal>
            <IconCustomer isDelete>
                <FiTrash onClick={() => setIsModalOpen(true)} />
            </IconCustomer>
            <ModalCustomer
                isModalOpen={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
                handleFunction={() => handleDeleteRate(rate.productId, rate.commentData._id)}
                lable="đánh giá"
            />
        </tr>
    )
}

export default Evaluate
