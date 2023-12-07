import { message } from 'antd'
import { BsCheckCircle } from 'react-icons/bs'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import './Message.css'

export const success = (title) => {
    message.success({
        content: title,
        duration: 1,
        icon: <BsCheckCircle />,
        className: 'custom-class',
        style: {
            position: 'absolute',
            left: '35%',
            top: '280px',
            zIndex: '999',
        },
    })
}

export const failure = (msg) => {
    message.error({
        content: msg,
        icon: <HiOutlineEmojiSad />,
        duration: 1,
        className: 'custom-class',
        style: {
            position: 'absolute',
            left: '35%',
            top: '280px',
            zIndex: '999',
        },
    })
}
