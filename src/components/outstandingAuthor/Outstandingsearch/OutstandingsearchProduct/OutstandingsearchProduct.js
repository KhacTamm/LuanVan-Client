import { useEffect } from 'react'
import { handleDataProduct, handlePercentDiscount } from '../../../../untils'
import ListProduct from '../../../allProduct/ListProduct/ListProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductByAuthor } from '../../../../redux/actions/ProductAction'

function OutstandingsearchProduct({ authorName, id }) {
    const dispatch = useDispatch()
    const { productAuthour } = useSelector((state) => state.allProduct)

    const { currentPage } = useSelector((state) => state.allProduct)

    useEffect(() => {
        if (authorName) {
            dispatch(getAllProductByAuthor(authorName))
        }
    }, [dispatch, authorName, currentPage])

    const productData = handleDataProduct(productAuthour)

    return (
        <div className="outstandingsearchAuthor_desc ">
            {productData && productData.length > 0 ? (
                <>
                    <ListProduct
                        slider
                        author={id}
                        HotSaleProducts={handlePercentDiscount(productData)}
                        title="Tác phẩm nổi bật"
                        pagedetail
                    />
                </>
            ) : (
                ''
            )}
        </div>
    )
}

export default OutstandingsearchProduct
