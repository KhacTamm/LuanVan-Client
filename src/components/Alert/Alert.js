import React from 'react'
import './Alert.css'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCheck } from 'react-icons/ai'

function Alert(props) {
    const history = useNavigate()
    const backHome = () => {
        history('/')
    }
    return (
        <div className="alert">
            <div className="alert-content">
                <div className="alert-content-icon">
                    <AiOutlineCheck />
                </div>
                <h2>Đặt hàng thành công</h2>
                <button className="alert-content-button" onClick={() => backHome()}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default Alert
