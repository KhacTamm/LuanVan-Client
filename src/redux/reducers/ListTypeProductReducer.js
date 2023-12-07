const initialState = {
    typeProduct: [],
    typeId: {},
    currentPage: 1,
    error: '',
}

export const getAllTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_TYPE_PRODUCT': {
            return { ...state, typeProduct: action.payload }
        }

        case 'SAVE_TYPE': {
            return { ...state, typeProduct: action.payload }
        }

        case 'SAVE_TYPE_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'DELETE_TYPE': {
            return { ...state, typeProduct: action.payload }
        }

        case 'DELETE_ALL_TYPE': {
            return { ...state, typeProduct: action.payload }
        }

        case 'DELETE_TYPE_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'EDIT_CURRENT_PAGE_TYPE': {
            return { ...state, currentPage: action.payload }
        }

        case 'PAGINATION_TYPE':
            return { ...state, typeProduct: action.payload }

        default:
            return state
    }
}

export const getTypeByIdReducer = (state = {}, action) => {
    switch (action.type) {
        // case 'CREATE_NEW_TYPE_PRODUCT': {
        //     return { ...state, typeProduct: action.payload }
        // }
        case 'GET_TYPE_BY_ID': {
            return { ...state, typeId: action.payload }
        }
        case 'UPDATE_VISIBLE_TYPE': {
            return { ...state, typeId: action.payload }
        }
        case 'UPDATE_VISIBLE_TYPE_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'REMOVE_TYPE_BY_ID': {
            return { ...state, typeId: undefined }
        }

        default:
            return state
    }
}

export const searchTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_TYPE': {
            return { ...state, searchTypeResult: action.payload }
        }

        case 'SEARCH_TYPE_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'REMOVE_SEARCH_TYPE': {
            return { ...state, searchTypeResult: undefined }
        }

        default:
            return state
    }
}
