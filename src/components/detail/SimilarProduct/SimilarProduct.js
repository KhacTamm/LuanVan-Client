import { useEffect } from 'react'
import ListProduct from '../../allProduct/ListProduct/ListProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductByType } from '../../../redux/actions/ProductAction'
import { handleDataProduct } from '../../../untils'

function SimilarProduct({ author, currentProduct }) {
    const dispatch = useDispatch()
    const { productAuthour } = useSelector((state) => state.allProduct)

    useEffect(() => {
        dispatch(getAllProductByType(author))
    }, [dispatch, author])

    const SimilarProduct = handleDataProduct(productAuthour).filter((item) => item._id !== currentProduct)

    return (
        <>
            {SimilarProduct.length ? (
                <ListProduct HotSaleProducts={SimilarProduct} title="Cùng tác giả" pagedetail slider />
            ) : (
                ''
            )}
        </>
    )
}

export default SimilarProduct
