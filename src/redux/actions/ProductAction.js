import axios from 'axios'
import actions from './product.action'
import { BASE_URL } from '../../constants/UserConstant'
// import { axiosClient } from '../services/config.services'
// import { BASE_URL } from '../constants/UserConstant'
import { axiosClient } from '../../services/config.services'

export const filterProductByType = (type) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/products/type?type=${type}`)
        dispatch({ type: 'FILTER_PRODUCT_BY_TYPE', payload: data })
    } catch (error) {
        dispatch({ type: 'FILTER_PRODUCT_BY_TYPE_FAIL', payload: error.message })
    }
}

export const filterProductByRandomField = (infoProduct) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/products/filter/random`, infoProduct)
        dispatch({ type: 'FILTER_PRODUCT_BY_RANDOM_FIELD', payload: data })
    } catch (error) {}

    // dispatch({ type: "FILTER_PRODUCT_BY_RANDOM_FIELD", payload: infoProduct });
}

export const getAllProduct = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/products/`)
        dispatch({ type: 'GET_ALL_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_ALL_PRODUCT_FAIL', payload: error.message })
    }
}

export const removeCurrentProductFilter = () => async (dispatch, getState) => {
    dispatch({ type: 'REMOVE_CURRENT_PRODUCT_FILTER' })
}

export const getAllProductByType = (type, filter, page) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/products/search/${page}/type?type=${type}`)
        if (filter) {
            dispatch({ type: 'GET_ALL_PRODUCT_BY_TYPE_FILTER', payload: data })
        } else {
            dispatch({ type: 'GET_ALL_PRODUCT_BY_TYPE', payload: data })
        }
    } catch (error) {
        dispatch({ type: 'GET_ALL_PRODUCT_BY_TYPE_FAIL', payload: error.message })
    }
}

export const getAllProductByBrand = (brand, filter) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/products/search/publisher?publisher=${brand}`)
        if (filter) {
            dispatch({ type: 'GET_ALL_PRODUCT_BY_BRAND_FILTER', payload: data })
        } else {
            dispatch({ type: 'GET_ALL_PRODUCT_BY_BRAND', payload: data })
        }
    } catch (error) {
        dispatch({ type: 'GET_ALL_PRODUCT_BY_BRAND_FAIL', payload: error.message })
    }
}

export const getAllProductByAuthor = (author) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/products/search/author?author=${author}`)
        dispatch({ type: 'GET_ALL_PRODUCT_BY_AUTHOR', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_ALL_PRODUCT_BY_AUTHOR_FAIL', payload: error.message })
    }
}
// ==========================================================================================
export const getAllProductSimilar = (productName) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/products/alsolikeproduct/name?name=${productName}`)
        dispatch({ type: 'GET_ALL_PRODUCT_SIMILAR', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_ALL_PRODUCT_SIMILAR_FAIL', payload: error.message })
    }
}
// ==========================================================================================

export const searchProduct = (name) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/products/search/product?name=${name}`)
        dispatch({ type: 'SEARCH_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'SEARCH_PRODUCT_FAIL', payload: error.message })
    }
}

export const removeSearchProduct = () => async (dispatch) => {
    dispatch({ type: 'REMOVE_SEARCH_PRODUCT' })
}

export const searchAuthor = (author) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/products/search/author?author=${author}`)
        dispatch({ type: 'SEARCH_PRODUCT_AUTHOR', payload: data })
    } catch (error) {
        dispatch({ type: 'SEARCH_PRODUCT_AUTHOR_FAIL', payload: error.message })
    }
}

export const filterProductByPrice = (startPrice, endPrice) => async (dispatch, getState) => {
    dispatch({
        type: actions.FILTER_PRODUCT_BY_PRICE,
        payload: { startPrice, endPrice },
    })
    // try {
    //     const { data } = await axios.get(
    //         `http://localhost:4000/products/filter/${startPrice}/endPrice?endPrice=${endPrice}`,
    //     )
    //     console.log(data)
    //     dispatch({ type: 'FILTER_PRODUCT_BY_PRICE', payload: data })
    // } catch (error) {}
}

export const ascendingProduct = (products) => async (dispatch, getState) => {
    dispatch({ type: 'ASCENDING_PRODUCT' })
}

export const descendingProduct = (products) => async (dispatch, getState) => {
    dispatch({ type: 'DESCENDING_PRODUCT' })
}

export const filterProduct = (name) => async (dispatch, getState) => {
    dispatch({ type: 'FILTER_PRODUCT', payload: name })
}

export const editCurrentPage = (page) => async (dispatch) => {
    dispatch({ type: 'EDIT_CURRENT_PAGE', payload: page })
}

export const paginationProduct = (page, perPage) => async (dispatch, getState) => {
    try {
        if (!perPage) {
            perPage = 4
        }
        const data = await axiosClient.get(`/products/pagination/${page}/${perPage}`)
        dispatch({ type: 'PAGINATION_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'PAGINATION_PRODUCT_FAIL', payload: error.message })
    }
}

export const getproductById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/products/detail/${id}`)
        dispatch({ type: 'GET_PRODUCT_BY_ID', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_PRODUCT_BY_ID_FAIL', payload: error.message })
    }
}

export const removeProductById = (id) => async (dispatch) => {
    dispatch({ type: 'REMOVE_PRODUCT_BY_ID' })
}

export const saveProduct = (product) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        if (!product.get('_id')) {
            const { data } = await axios.post('http://localhost:4000/products/create', product, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            dispatch({ type: 'SAVE_PRODUCT', payload: data })
        } else {
            const { data } = await axios.put(`http://localhost:4000/products/update`, product, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })

            dispatch({ type: 'SAVE_PRODUCT', payload: data })
        }
    } catch (error) {
        dispatch({ type: 'SAVE_PRODUCT_FAIL', payload: error.message })
    }
}

export const updateVisible = (state, idProduct) => async (dispatch, getState) => {
    try {
        const { data } = await axios.put(`http://localhost:4000/products/update/visible/${idProduct}`, state)

        dispatch({ type: 'UPDATE_VISIBLE_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'UPDATE_VISIBLE_FAIL', payload: error.message })
    }
}

export const DeleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.delete(`http://localhost:4000/products/delete/${productId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'DELETE_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'DELETE_PRODUCT_FAIL', payload: error.message })
    }
}

export const DeleteAllProduct = () => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.delete(`http://localhost:4000/products/delete/all`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'DELETE_ALL_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'DELETE_ALL_PRODUCT_FAIL', payload: error.message })
    }
}

export const HandlePaymentProduct = (product) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.put(`http://localhost:4000/products/handlepayment`, product, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'HANDLE_PAYMENT_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'HANDLE_PAYMENT_FAIL', payload: error.message })
    }
}

// --------------------------------------------------------------
// export const DeleteAllProduct = (productId) => async (dispatch, getState) => {
//     try {
//         const {
//             getUsers: { userInfo },
//         } = getState()
//         const { data } = await axios.delete(`http://localhost:4000/products/delete/${productId}`, {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         })
//         dispatch({ type: 'DELETE_PRODUCT', payload: data })
//     } catch (error) {
//         dispatch({ type: 'DELETE_PRODUCT_FAIL', payload: error.message })
//     }
// }
// --------------------------------------------------------------

// ----------------------------------------Type----------------------------------------------

export const descendingFilterProduct = (products) => async (dispatch) => {
    dispatch({ type: 'DESCENDING_FILTERPRODUCTHOME', payload: products })
}

export const ascendingFilterProduct = (products) => async (dispatch) => {
    dispatch({ type: 'ASCENDING_FILTERPRODUCTHOME', payload: products })
}

export const descendingSearchProduct = (products) => async (dispatch) => {
    dispatch({ type: 'DESCENDING_SEARCH_PRODUCT', payload: products })
}

export const ascendingSearchProduct = (products) => async (dispatch) => {
    dispatch({ type: 'ASCENDING_SEARCH_PRODUCT', payload: products })
}

export const reviewProduct = (id, review) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`http://localhost:4000/products/rate/${id}`, review)
        dispatch({ type: 'REVIEW_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'REVIEW_PRODUCT_FAIL', payload: error })
    }
}

export const commentProduct = (id, comment) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`http://localhost:4000/products/comment/${id}`, comment)
        dispatch({ type: 'COMMENT_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'COMMENT_PRODUCT_FAIL', payload: error })
    }
}

export const repCommentProduct = (id, comment) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`http://localhost:4000/products/rep/comment/${id}`, comment)
        dispatch({ type: 'REP_COMMENT_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'REP_COMMENT_PRODUCT_FAIL', payload: error })
    }
}

export const pinCommentProduct = (id, comment) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`http://localhost:4000/products/pin/comment/${id}`, comment)
        dispatch({ type: 'PIN_COMMENT_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'PIN_COMMENT_PRODUCT_FAIL', payload: error })
    }
}

export const getAllRateProduct = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get('http://localhost:4000/products/rate')
        dispatch({ type: 'GET_ALL_RATE_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_ALL_RATE_PRODUCT_FAIL', payload: error })
    }
}

export const DeleteRateProduct = (idProduct, idRate) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.delete(`http://localhost:4000/products/rate/delete/${idProduct}/${idRate}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'DELETE_RATE_PRODUCT', payload: data })
    } catch (error) {
        dispatch({ type: 'DELETE_RATE_PRODUCT_FAIL', payload: error.message })
    }
}

// export const searchBrands = (brand) => async (dispatch, getState) => {
//     try {
//         const { data } = await axios.get(`http://localhost:4000/products/search/brand?brand=${brand}`)
//         dispatch({ type: 'SEARCH_PRODUCT_BRAND', payload: data })
//     } catch (error) {
//         dispatch({ type: 'EARCH_PRODUCT_BRAND_FAIL', payload: error.message })
//     }
// }
