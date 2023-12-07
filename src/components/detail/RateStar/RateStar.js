import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { commentProduct } from '../../../redux/actions/ProductAction'

import config from '../../../config'

import { Rate, Row, Col, Progress, Modal } from 'antd'
import './RateStar.css'
import AllComment from '../Comment/AllComment'
import { AiTwotoneStar } from 'react-icons/ai'

function RateStar() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useNavigate()

    const [star, setStar] = useState(0)
    const [showRate, setShowRate] = useState(false)
    const [showEvaluate, setShowEvalute] = useState(false)
    const [evaluate, setEvaluate] = useState('')

    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    let allComment = useSelector((state) => state.getProductById.product.comments)
    const product = useSelector((state) => state.getProductById.product)

    const countReview = product.comments.length
    let averageRate = (product.comments.reduce((a, c) => a + c.star, 0) / countReview).toFixed(1)

    if (userInfo) {
        var existsUser = product.comments.find((x) => x.author === userInfo.name)
    }

    const allCommentReverse = useMemo(() => {
        return allComment.reverse()
    }, [allComment])

    const fiveStar = Math.round((product.comments.filter((x) => x.star === 5).length / countReview) * 100)
    const fourStar = Math.round((product.comments.filter((x) => x.star === 4).length / countReview) * 100)
    const threeStar = Math.round((product.comments.filter((x) => x.star === 3).length / countReview) * 100)
    const twoStar = Math.round((product.comments.filter((x) => x.star === 2).length / countReview) * 100)
    const oneStar = Math.round((product.comments.filter((x) => x.star === 1).length / countReview) * 100)

    const numberFiveStar = Math.round(product.comments.filter((x) => x.star === 5).length)
    const numberFourStar = Math.round(product.comments.filter((x) => x.star === 4).length)
    const numberThreeStar = Math.round(product.comments.filter((x) => x.star === 3).length)
    const numberTwoStar = Math.round(product.comments.filter((x) => x.star === 2).length)
    const numberOneStar = Math.round(product.comments.filter((x) => x.star === 1).length)

    const onFinish = () => {
        const comment = {
            author: userInfo.name,
            avatar: userInfo.image,
            star: star,
            isAdmin: userInfo.isAdmin,
            content: evaluate,
            byUser: userInfo._id,
        }
        dispatch(commentProduct(id, comment))
        setEvaluate('')
        setShowEvalute(false)
        setShowRate(false)
    }

    const setRate = (value) => {
        setStar(value)
        setShowEvalute(true)
    }
    const toLogin = () => {
        history(`${config.routes.login}`)
    }

    const handleCancel = () => {
        setShowRate(false)
        setShowEvalute(false)
        setStar(0)
    }

    return (
        <div className="">
            <Row>
                <Col span={18} xs={24} sm={24} md={24} style={{ minWidth: '100%' }}>
                    <h4 className="rate-star-title">Đánh giá & nhận xét {product.name}</h4>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="rate">
                        <div className="rate-info">
                            <Row>
                                <Col
                                    span={6}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <p className="star-average-num">
                                        <span style={{ marginBottom: 0, fontSize: '2.8rem' }}>
                                            {isNaN(averageRate) ? 0 : averageRate}
                                        </span>
                                        <span style={{ marginBottom: 0, fontSize: '2.3rem' }}>trên 5</span>
                                    </p>
                                    <p
                                        className="star-average"
                                        style={{
                                            textTransform: 'uppercase',
                                            fontSize: '18px',
                                            lineHeight: '3rem',
                                            fontWeight: '500',
                                        }}
                                    >
                                        sao trung bình
                                    </p>
                                    <p
                                        className="start-number"
                                        style={{ fontSize: '1.6rem', lineHeight: '3.2rem', fontWeight: '350' }}
                                    >
                                        <strong>{product.comments.length}</strong> đánh giá từ khách hàng
                                    </p>
                                </Col>
                                <Col span={12}>
                                    <div className="thongke">
                                        <div className="numstar">
                                            5
                                            <AiTwotoneStar
                                                style={{
                                                    fontSize: '1.8rem',
                                                    color: 'rgb(255, 120, 30)',
                                                    margin: '0 12px 0 5px',
                                                }}
                                            ></AiTwotoneStar>
                                        </div>
                                        <p className="percent" style={{ display: 'flex' }}>
                                            <Progress
                                                status="active"
                                                percent={fiveStar}
                                                strokeColor="rgb(255, 120, 30)"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    fontSize: '15px',
                                                    fontWeight: '700',
                                                }}
                                            />
                                        </p>
                                        <p className="numberStar"> {numberFiveStar} đánh giá</p>
                                    </div>
                                    <div className="thongke">
                                        <div className="numstar">
                                            4
                                            <AiTwotoneStar
                                                style={{
                                                    fontSize: '1.8rem',
                                                    color: 'rgb(255, 120, 30)',
                                                    margin: '0 12px 0 5px',
                                                }}
                                            ></AiTwotoneStar>
                                        </div>
                                        <p className="percent" style={{ display: 'flex' }}>
                                            <Progress
                                                status="active"
                                                percent={fourStar}
                                                strokeColor="rgb(255, 120, 30)"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    fontSize: '15px',
                                                    fontWeight: '700',
                                                }}
                                            />
                                        </p>
                                        <p className="numberStar"> {numberFourStar} đánh giá</p>
                                    </div>
                                    <div className="thongke">
                                        <div className="numstar">
                                            3
                                            <AiTwotoneStar
                                                style={{
                                                    fontSize: '1.8rem',
                                                    color: 'rgb(255, 120, 30)',
                                                    margin: '0 12px 0 5px',
                                                }}
                                            ></AiTwotoneStar>
                                        </div>
                                        <p className="percent" style={{ display: 'flex' }}>
                                            <Progress
                                                status="active"
                                                percent={threeStar}
                                                strokeColor="rgb(255, 120, 30)"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    fontSize: '15px',
                                                    fontWeight: '700',
                                                }}
                                            />
                                        </p>
                                        <p className="numberStar"> {numberThreeStar} đánh giá</p>
                                    </div>
                                    <div className="thongke">
                                        <div className="numstar">
                                            2
                                            <AiTwotoneStar
                                                style={{
                                                    fontSize: '1.8rem',
                                                    color: 'rgb(255, 120, 30)',
                                                    margin: '0 12px 0 5px',
                                                }}
                                            ></AiTwotoneStar>
                                        </div>
                                        <p className="percent" style={{ display: 'flex' }}>
                                            <Progress
                                                status="active"
                                                percent={twoStar}
                                                strokeColor="rgb(255, 120, 30)"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    fontSize: '15px',
                                                    fontWeight: '700',
                                                }}
                                            />
                                        </p>
                                        <p className="numberStar"> {numberTwoStar} đánh giá</p>
                                    </div>
                                    <div className="thongke">
                                        <div className="numstar">
                                            1
                                            <AiTwotoneStar
                                                style={{
                                                    fontSize: '1.8rem',
                                                    color: 'rgb(255, 120, 30)',
                                                    margin: '0 12px 0 5px',
                                                }}
                                            ></AiTwotoneStar>
                                        </div>
                                        <p className="percent" style={{ display: 'flex' }}>
                                            <Progress
                                                status="active"
                                                percent={oneStar}
                                                strokeColor="rgb(255, 120, 30)"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    fontSize: '15px',
                                                    fontWeight: '700',
                                                }}
                                            />
                                        </p>
                                        {<p className="numberStar"> {numberOneStar} đánh giá</p>}
                                    </div>
                                </Col>
                                {existsUser || !userInfo ? (
                                    ''
                                ) : (
                                    <Col
                                        span={6}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <button
                                            className="danhgia"
                                            onClick={() => {
                                                userInfo ? setShowRate(true) : toLogin()
                                            }}
                                        >
                                            Đánh giá sản phẩm
                                        </button>
                                    </Col>
                                )}
                            </Row>
                        </div>
                        <Modal
                            centered
                            title="Đánh giá sản phẩm"
                            open={showRate}
                            footer={null}
                            onOk={() => setShowRate(false)}
                            onCancel={handleCancel}
                            width={650}
                        >
                            <div className="modal-star">
                                <img alt="img-product" className="modal-star-img" src={product.image} />
                                <p className="modal-star-name">{product.name}</p>
                                <Rate
                                    style={{
                                        fontSize: '4rem',
                                    }}
                                    onChange={setRate}
                                />
                                {showEvaluate ? (
                                    <div className="rate-send">
                                        <div className="rate-send_content">
                                            <textarea
                                                className="rate-comment"
                                                placeholder="Hãy cho chúng tôi biết cảm nhận của bạn về sản phẩm "
                                                onChange={(e) => setEvaluate(e.target.value)}
                                            ></textarea>
                                            <div
                                                className="guidanhgia"
                                                style={{ marginTop: '12px' }}
                                                onClick={() => onFinish()}
                                            >
                                                <p style={{ width: '100%', textAlign: 'center' }}>Gửi đánh giá</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </Modal>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: '1rem' }}>
                <div className="all-start">
                    {product.comments.length ? (
                        <AllComment allComment={allCommentReverse} />
                    ) : (
                        <Col span={24} align="start">
                            <div className="noEvaluate">Hãy cho chúng tôi đánh giá của bạn về sản phẩm</div>
                        </Col>
                    )}
                </div>
            </Row>
        </div>
    )
}

export default RateStar
