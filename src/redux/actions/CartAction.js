//Action đơn giản là một object
//payload được sử dụng khi mún cái state đc tính toán dựa trên payload
//Action creater: action tạo ra một fuction
//DisPATH: là một fuction là cách duy nhất cập nhật state trong store là sử dụng dispath
// --------------------------------------------------------------------------------
//dispath(function(action))
//Nguyên lý hoạt động:
//Khi dispath thì nó sẽ bắn đi một action kèm theo thông tin trong action đó (type, payload)
// sau store. Reducer trong store sẽ nhận được dữ liệu.
import axios from 'axios'

export const AddToCart = (product) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        await axios.post(`http://localhost:4000/cart/addCart/${userInfo}`, product, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'ADD_TO_CART', payload: product.count })
    } catch {}
    // dispatch({ type: 'ADD_TO_CART', payload: product })
}

export const getAllCart = (idUser) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.get(`http://localhost:4000/cart/${idUser}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'GET_ALL_CART', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_ALL_CART_FAIL', payload: error.message })
    }
}

export const DeleteToCart = (product) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.delete(`http://localhost:4000/cart/delete/${product._id}/${product.idUser}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'DELETE_TO_CART', payload: data })
    } catch (error) {
        dispatch({ type: 'DELETE_CART_FAIL', payload: error.message })
    }
}

export const DeleteAllToCart = (userID) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.delete(`http://localhost:4000/cart/delete/${userID}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'DELETE_ALL_TO_CART', payload: data })
    } catch (error) {
        dispatch({ type: 'DELETE_ALL_CART_FAIL', payload: error.message })
    }
}

// export const DeleteQtyProduct = (product) => async (dispatch) => {
//     dispatch({ type: 'DELETE_QTY_PRODUCT', payload: product })
// }

export const DecreaseQtyProduct = (IDproduct) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        await axios.put(`http://localhost:4000/cart/decreaseqty/${IDproduct}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'DECREASE_QTY_CART' })
    } catch (error) {
        dispatch({ type: 'DECREASE_QTY_FAIL', payload: error.message })
    }
}

export const IncreaseQtyProduct = (product) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        await axios.post(`http://localhost:4000/cart/addCart/${userInfo}`, product, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'INCREASE_QTY_CART' })
    } catch (error) {}
    // dispatch({ type: 'ADD_TO_CART', payload: product })
}

export const updateTotalPriceCart = (totalPrice) => async (dispatch) => {
    dispatch({ type: 'UPDATE_TOTAL_PRICE_CART', payload: totalPrice })
}

export const applyVoucher = (voucher) => async (dispatch) => {
    dispatch({ type: 'APPLY_VOUCHER', payload: voucher })
}

export const resetVoucher = (voucher) => async (dispatch) => {
    dispatch({ type: 'RESET_VOUCHER' })
}
