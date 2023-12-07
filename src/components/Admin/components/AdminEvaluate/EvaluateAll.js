import HeaderText from '../TextAdmin/HeaderText/HeaderText'
import EvaluateList from './EvaluateList'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllRateProduct } from '../../../../redux/actions/ProductAction'
import Loading from '../../../Loading/Loading'

function EvaluateAll() {
    const dispatch = useDispatch()
    const { rateList } = useSelector((state) => state.allRateProduct)

    useEffect(() => {
        dispatch(getAllRateProduct())
    }, [dispatch])

    return (
        <div className="admin-evaluate">
            <HeaderText lable="Quản lý đánh giá"></HeaderText>

            {rateList ? <EvaluateList rate={rateList} /> : <Loading style={{ height: '550px' }} />}
        </div>
    )
}

export default EvaluateAll
