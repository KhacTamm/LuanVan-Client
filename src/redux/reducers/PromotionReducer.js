const initialState = {
    voucher: [],
    voucherId: {},
    quantity: 0,
    idVoucher: '',
}

export const getAllPromotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PROMOTION': {
            return { ...state, voucher: action.payload }
        }

        case 'SAVE_PROMOTION': {
            return {
                ...state,
                voucher: action.payload,
            }
        }

        default:
            return state
    }
}

export const getPromotionByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PROMOTION_BY_ID': {
            return { ...state, voucherId: action.payload }
        }

        case 'REMOVE_PROMOTION_BY_ID': {
            return { ...state, voucherId: undefined }
        }

        case 'UPDATE_VISIBLE_PROMOTION': {
            return { ...state, voucherId: action.payload }
        }
        case 'UPDATE_VISIBLE_PROMOTION_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'SET_PROMOTION_ID': {
            return { ...state, idVoucher: action.payload }
        }

        case 'RESET_PROMOTION_ID': {
            return { ...state, idVoucher: '' }
        }

        default:
            return state
    }
}
