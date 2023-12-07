import Promotion from './Promotion'

function PromotionList(props) {
    const { voucher } = props

    return (
        <div className="list_promotion">
            <table>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã khuyến mãi</th>
                        <th scope="col">Mức giảm</th>
                        <th scope="col">Đơn tối thiểu</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đã dùng</th>
                        <th scope="col">Ngày bắt đầu</th>
                        <th scope="col">Ngày hết hạn</th>
                        <th scope="col">Trạng thái</th>
                        <th colSpan="3" style={{ textAlign: 'center' }}>
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(voucher) && voucher.length
                        ? voucher.map((item, index) => (
                              <Promotion voucher={item} key={item._id} number={index}></Promotion>
                          ))
                        : ''}
                </tbody>
            </table>
        </div>
    )
}

export default PromotionList
