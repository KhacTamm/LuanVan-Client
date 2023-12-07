const initialState = {
    cartItems: [],
    quantity: 0,
    totalPrice: 0,
    voucher: 0,
}

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            return {
                ...state,
                quantity: state.quantity + action.payload,
            }
        }

        case 'GET_ALL_CART': {
            let totalQty = 0
            for (const i of action.payload) {
                totalQty += i.qty
            }
            return {
                ...state,
                cartItems: action.payload,
                quantity: totalQty,
            }
        }

        case 'DELETE_TO_CART': {
            // const qty = action.payload
            let totalQty = 0
            for (const i of action.payload) {
                totalQty += i.qty
            }
            return {
                ...state,
                cartItems: action.payload,
                quantity: totalQty,
            }
        }

        case 'DELETE_ALL_TO_CART': {
            let newList = []
            return {
                ...state,
                quantity: 0,
                cartItems: newList,
            }
        }
        case 'DECREASE_QTY_CART': {
            let newQty = state.quantity
            if (newQty > 0) {
                newQty--
            }
            return {
                ...state,
                quantity: newQty,
            }
        }

        case 'INCREASE_QTY_CART': {
            return {
                ...state,
                quantity: state.quantity + 1,
            }
        }

        case 'CART_EMTY': {
            return {
                ...state,
                quantity: 0,
                cartItems: [],
            }
        }

        case 'UPDATE_TOTAL_PRICE_CART': {
            return {
                ...state,
                totalPrice: action.payload,
            }
        }

        case 'APPLY_VOUCHER': {
            return {
                ...state,
                voucher: action.payload,
            }
        }
        case 'RESET_VOUCHER': {
            return {
                ...state,
                voucher: 0,
            }
        }

        default:
            return state
    }
}
