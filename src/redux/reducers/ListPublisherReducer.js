const initialState = {
    ListBrannd: [],
    brandId: {},
    SearchBrandReuslt: [],
    error: '',
    currentPage: 1,
}

export const getAllBrandReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_BRAND_PRODUCT': {
            return { ...state, ListBrannd: action.payload }
        }

        case 'SAVE_BRAND': {
            return { ...state, ListBrannd: action.payload }
        }

        case 'SAVE_BRAND_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'DELETE_BRAND': {
            return { ...state, ListBrannd: action.payload }
        }

        case 'DELETE_ALL_BRAND': {
            return { ...state, ListBrannd: action.payload }
        }

        case 'DELETE_BRAND_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'EDIT_CURRENT_PAGE_BARND': {
            return { ...state, currentPage: action.payload }
        }

        case 'PAGINATION_BRAND':
            return { ...state, ListBrannd: action.payload }

        default:
            return state
    }
}

export const getBrandByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_BRAND_BY_ID': {
            return { ...state, brandId: action.payload }
        }

        case 'REMOVE_BRAND_BY_ID': {
            return { ...state, brandId: undefined }
        }
        case 'UPDATE_VISIBLE_BRAND': {
            return { ...state, brandId: action.payload }
        }

        default:
            return state
    }
}

export const searchBrandReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_BRAND': {
            return { ...state, SearchBrandReuslt: action.payload }
        }

        case 'SEARCH_BRAND_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'REMOVE_SEARCH_BRAND': {
            return { ...state, SearchBrandReuslt: undefined }
        }

        default:
            return state
    }
}
