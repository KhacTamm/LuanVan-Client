import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListProduct from '../../allProduct/ListProduct/ListProduct'
import { getAllProductSimilar } from '../../../redux/actions/ProductAction'
import { handlePercentDiscount } from '../../../untils'

function AlsoLikeProduct(props) {
    const dispatch = useDispatch()
    const {
        productName,
        // author, currentProduct
    } = props
    const { productSimilar } = useSelector((state) => state.allProduct)
    // const { productAuthour } = useSelector((state) => state.allProduct)

    // useEffect(() => {
    //     dispatch(getAllProductByAuthor(author))
    // }, [author])

    // const SimilarProduct = handleDataProduct(productAuthour).filter((item) => item._id !== currentProduct)

    useEffect(() => {
        dispatch(getAllProductSimilar(productName))
    }, [dispatch, productName])

    return (
        <>
            {Array.isArray(productSimilar) && productSimilar.length ? (
                <ListProduct
                    HotSaleProducts={handlePercentDiscount(productSimilar)}
                    title="Sản phẩm tương tự"
                    pagedetail
                />
            ) : (
                // ) : SimilarProduct.length ? (
                //     <ListProduct HotSaleProducts={SimilarProduct} title="Cùng tác giả" pagedetail slider />
                ''
            )}
        </>
    )
}

export default AlsoLikeProduct
