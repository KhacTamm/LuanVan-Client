const initialState = {
    product: [],
    productOne: {},
    productSimilar: [],
    currentPage: 1,
    productAuthour: [],
    productFilter: undefined,
    rateList: [],
}

export const getAllProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PRODUCT':
            return { ...state, product: action.payload }

        case 'GET_ALL_PRODUCT_FAIL':
            return { ...state, error: action.payload }

        case 'GET_ALL_PRODUCT_BY_TYPE':
            return { ...state, product: action.payload }

        case 'GET_ALL_PRODUCT_BY_TYPE_FILTER':
            return { ...state, productFilter: action.payload }

        case 'REMOVE_CURRENT_PRODUCT_FILTER':
            return { ...state, productFilter: undefined }

        case 'GET_ALL_PRODUCT_BY_TYPE_FAIL':
            return { ...state, error: action.payload }

        case 'GET_ALL_PRODUCT_BY_BRAND':
            return { ...state, product: action.payload }

        case 'GET_ALL_PRODUCT_BY_BRAND_FILTER':
            return { ...state, productFilter: action.payload }

        case 'GET_ALL_PRODUCT_BY_BRAND_FAIL':
            return { ...state, error: action.payload }

        case 'GET_ALL_PRODUCT_BY_AUTHOR':
            return { ...state, productAuthour: action.payload }

        case 'GET_ALL_PRODUCT_BY_AUTHOR_FAIL':
            return { ...state, error: action.payload }

        case 'GET_ALL_PRODUCT_SIMILAR':
            return { ...state, productSimilar: action.payload }

        case 'GET_ALL_PRODUCT_SIMILAR_FAIL':
            return { ...state, error: action.payload }

        case 'ASCENDING_PRODUCT': {
            let newList
            if (state.product.products) {
                newList = [...state.product.products]
            } else {
                newList = [...state.product]
            }

            newList = {
                pages: state.product.pages,
                current: state.product.current || 1,
                products: newList.sort((a, b) => b.salePrice - a.salePrice),
            }

            return { ...state, product: newList }
        }

        case 'DESCENDING_PRODUCT': {
            let newList
            if (state.product.products) {
                newList = [...state.product.products]
            } else {
                newList = [...state.product]
            }
            newList = {
                pages: state.product.pages,
                current: state.product.current || 1,
                products: newList.sort((a, b) => a.salePrice - b.salePrice),
            }
            return { ...state, product: newList }
        }

        case 'FILTER_PRODUCT': {
            let newList = [...state.product]
            newList = newList.filter((item) => item.type === action.payload)
            return { ...state, product: newList }
        }

        case 'FILTER_PRODUCT_BY_PRICE': {
            // return { ...state, product: action.payload }
            let newList
            if (state.product.products) {
                newList = [...state.product.products]
            } else {
                newList = [...state.product]
            }
            newList = newList.filter(
                (item) => item.salePrice >= action.payload.startPrice && item.salePrice <= action.payload.endPrice,
            )
            return { ...state, product: newList }
        }

        case 'FILTER_PRODUCT_BY_RANDOM_FIELD': {
            return { ...state, product: action.payload }
        }

        case 'ASCENDING_FILTERPRODUCT': {
            let newList = [...action.payload]
            newList = newList.sort((a, b) => b.salePrice - a.salePrice)
            return { ...state, product: newList }
        }

        case 'DESCENDING_FILTERPRODUCT': {
            let newList = [...action.payload]
            newList = newList.sort((a, b) => a.salePrice - b.salePrice)

            return { ...state, product: newList }
        }

        case 'ASCENDING_FILTERPRODUCTHOME': {
            let newList = [...action.payload]
            newList = newList.sort((a, b) => b.salePrice - a.salePrice)
            return { ...state, productFilter: newList }
        }

        case 'DESCENDING_FILTERPRODUCTHOME': {
            let newList = [...action.payload]
            newList = newList.sort((a, b) => a.salePrice - b.salePrice)

            return { ...state, productFilter: newList }
        }

        case 'SAVE_PRODUCT': {
            return { ...state, product: action.payload }
        }

        case 'SAVE_PRODUCT_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'DELETE_PRODUCT': {
            return { ...state, productOne: action.payload }
        }
        case 'DELETE_ALL_PRODUCT': {
            return { ...state, product: action.payload }
        }

        case 'DELETE_PRODUCT_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'EDIT_CURRENT_PAGE': {
            return { ...state, currentPage: action.payload }
        }

        case 'PAGINATION_PRODUCT':
            return { ...state, product: action.payload }

        default:
            return state
    }
}

export const getProductByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_BY_ID': {
            return { ...state, product: action.payload }
        }

        case 'REMOVE_PRODUCT_BY_ID': {
            return {}
        }

        case 'REVIEW_PRODUCT': {
            return { ...state, product: action.payload }
        }

        case 'REVIEW_PRODUCT_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'COMMENT_PRODUCT': {
            return { ...state, product: action.payload }
        }

        case 'COMMENT_PRODUCT_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'REP_COMMENT_PRODUCT': {
            return { ...state, product: action.payload }
        }

        case 'REP_COMMENT_PRODUCT_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'PIN_COMMENT_PRODUCT': {
            return { ...state, product: action.payload }
        }

        case 'PIN_COMMENT_PRODUCT_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'BLOG_PRODUCT': {
            return { ...state, product: action.payload }
        }

        case 'BLOG_PRODUCT_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'UPDATE_VISIBLE_PRODUCT': {
            return { ...state, product: action.payload }
        }

        case 'UPDATE_VISIBLE_PRODUCT_FAIL': {
            return { ...state, error: action.payload }
        }

        default:
            return state
    }
}

export const searchProductReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_PRODUCT': {
            return { ...state, searchProductResult: action.payload }
        }
        case 'REMOVE_SEARCH_PRODUCT': {
            return { ...state, searchProductResult: undefined }
        }

        case 'SEARCH_TYPE_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'DESCENDING_SEARCH_PRODUCT': {
            let newList = [...action.payload]
            newList = newList.sort((a, b) => b.salePrice - a.salePrice)
            return { ...state, searchProductResult: newList }
        }

        case 'ASCENDING_SEARCH_PRODUCT': {
            let newList = [...action.payload]
            newList = newList.sort((a, b) => a.salePrice - b.salePrice)

            return { ...state, searchProductResult: newList }
        }

        default:
            return state
    }
}

// ------------------------------
export const searchTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_TYPE': {
            return { ...state, products: action.payload }
        }

        case 'ASCENDING_FILTERPRODUCT': {
            let newList = [...action.payload]
            newList = newList.sort((a, b) => b.salePrice - a.salePrice)
            return { ...state, products: newList }
        }

        case 'DESCENDING_FILTERPRODUCT': {
            let newList = [...action.payload]
            newList = newList.sort((a, b) => a.salePrice - b.salePrice)
            return { ...state, products: newList }
        }

        case 'SEARCH_TYPE_FAIL': {
            return { ...state, error: action.payload }
        }

        default:
            return state
    }
}

export const searchProductBrandReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EARCH_PRODUCT_BRAND': {
            return { ...state, products: action.payload }
        }

        case 'EARCH_PRODUCT_BRAND_FAIL': {
            return { ...state, error: action.payload }
        }

        default:
            return state
    }
}

export const rateProduct = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_RATE_PRODUCT': {
            return { ...state, rateList: action.payload }
        }

        case 'GET_ALL_RATE_PRODUCT_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'DELETE_RATE_PRODUCT': {
            return { ...state }
        }

        default:
            return state
    }
}
