import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { DeleteProduct, getAllProduct, updateVisible } from '../../../../../redux/actions/ProductAction'

import { formatPrice } from '../../../../../untils'

import IconCustomer from '../../FromComponents/IconCustomer/IconCustomer'

import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import './ListProductAuthor.css'
import { FaRegEdit } from 'react-icons/fa'

function ProductAuthorItem(props) {
    const { product, number } = props
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(product.visible)

    const handleDeleteProduct = async (product) => {
        await dispatch(DeleteProduct(product._id))
        await dispatch(getAllProduct())
    }

    const handleVisisble = async (product) => {
        await setVisible(!visible)
        const dataVisible = { visible: !visible }
        await dispatch(updateVisible(dataVisible, product._id))
        await dispatch(getAllProduct())
    }

    return (
        <tr>
            <td>{number + 1}</td>
            <td style={{ width: '220px' }}>
                <img alt="img" src={product.image}></img>
            </td>
            <td>{product.name}</td>
            <td className="admin_price">
                {product.price ? formatPrice(product.price) : formatPrice(product.salePrice)} ₫
            </td>
            <td className="admin_price">{formatPrice(product.salePrice)} ₫</td>
            <td>{product.amount}</td>
            <td className="show">
                <Link onClick={(e) => handleVisisble(product)}>
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </Link>
            </td>
            <IconCustomer>
                <Link to={`/admin/product/update/${product._id}`}>
                    {/* <EditOutlined></EditOutlined> */}
                    <FaRegEdit></FaRegEdit>
                </Link>
            </IconCustomer>

            <IconCustomer isDelete>
                <DeleteOutlined onClick={(e) => handleDeleteProduct(product)} />
            </IconCustomer>
        </tr>
    )
}

export default ProductAuthorItem
