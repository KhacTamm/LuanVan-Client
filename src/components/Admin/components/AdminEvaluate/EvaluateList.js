import Evaluate from './Evaluate'
import './Evaluate.css'

function EvaluateList(props) {
    const { rate } = props

    return (
        <div className="list_evaluate">
            <table>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Xếp hạng</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Ngày</th>
                        <th colSpan="2" style={{ textAlign: 'center' }}>
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(rate) && rate.length
                        ? rate.map((item, index) => <Evaluate rate={item} key={item._id} number={index}></Evaluate>)
                        : ''}
                </tbody>
            </table>
        </div>
    )
}

export default EvaluateList
