import axios from 'axios'

export const savePromotion = (voucher) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        if (!voucher.get('_id')) {
            const { data } = await axios.post('http://localhost:4000/promotion/create', voucher, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            dispatch({ type: 'SAVE_PROMOTION', payload: data })
        } else {
            const { data } = await axios.put(`http://localhost:4000/promotion/update`, voucher, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })

            dispatch({ type: 'SAVE_PROMOTION', payload: data })
        }
    } catch (error) {
        dispatch({ type: 'SAVE_PROMOTION_FAIL', payload: error.message })
    }
}

export const getAllPromotion = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/promotion`)
        dispatch({ type: 'GET_ALL_PROMOTION', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_ALL_PROMOTION_FAIL', payload: error.message })
    }
}

export const getPromotionById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/promotion/detail/${id}`)
        dispatch({ type: 'GET_PROMOTION_BY_ID', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_PROMOTION_BY_ID_FAIL', payload: error.message })
    }
}

export const deletePromotion = (voucher) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/promotion/delete/${voucher}`)
        dispatch({ type: 'DELETE_PROMOTION', payload: data })
    } catch (error) {}
}

export const removePromotionById = () => async (dispatch) => {
    dispatch({ type: 'REMOVE_PROMOTION_BY_ID' })
}

export const updatePromotionVisible = (state, id) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.put(`http://localhost:4000/promotion/update/visible/${id}`, state, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'UPDATE_VISIBLE_PROMOTION', payload: data })
    } catch (error) {
        dispatch({ type: 'UPDATE_VISIBLE_PROMOTION_FAIL', payload: error.message })
    }
}

export const updateCurrentVoucher = (voucher) => async (dispatch) => {
    dispatch({ type: 'SET_PROMOTION_ID', payload: voucher })
}

export const resetIdPromotion = (voucher) => async (dispatch) => {
    dispatch({ type: 'RESET_PROMOTION_ID' })
}

export const HandlePaymentPromotion = (voucher) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.put(`http://localhost:4000/promotion/handlepayment`, voucher, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'HANDLE_PAYMENT_VOUCHER', payload: data })
    } catch (error) {
        dispatch({ type: 'HANDLE_PAYMENT_VOUCHER_FAIL', payload: error.message })
    }
}
