import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../../../../redux/actions/ProductAction'
import EmptyProduct from '../../../../Search/EmptyProduct/EmptyProduct'

import ProductAuthorItem from './ProductAuthorItem'
import './ListProductAuthor.css'

function ProductAuthor({ authorName }) {
    const dispatch = useDispatch()
    const { product } = useSelector((state) => state.allProduct)

    useEffect(() => {
        dispatch(getAllProduct())
    }, [dispatch])

    const listProduct = product && product.length ? product.filter((item) => item.author === authorName) : ''

    return (
        <div className="admin-product-list" style={{ height: '550px' }}>
            {listProduct && listProduct.length ? (
                <table>
                    <thead>
                        <tr className="admin-product-list_header">
                            <th scope="col">STT</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Giá gốc</th>
                            <th scope="col">Giá bán</th>
                            <th scope="col">Số lượng</th>
                            <th colSpan={3}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct.map((item, index) => (
                            <ProductAuthorItem product={item} key={item._id} update={item._id} number={index} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyProduct title="Tác giả" style={{ height: '600px' }} />
            )}
        </div>
    )
}

export default ProductAuthor
