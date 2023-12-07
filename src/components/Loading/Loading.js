import { LoadingOutlined } from '@ant-design/icons'
import './Loading.css'

function Loading({ style }) {
    return (
        <div className="loading" style={style ? style : { height: '500px' }}>
            <LoadingOutlined />
        </div>
    )
}

export default Loading
