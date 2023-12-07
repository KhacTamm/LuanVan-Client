const initialState = {
    authorList: [],
    author: {},
    error: '',
    currentPage: 1,
    SearchAuthorResult: undefined,
}

export const getAllAuthorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_AUTHOR': {
            return { ...state, authorList: action.payload }
        }

        case 'SAVE_AUTHOR': {
            return { ...state, authorList: action.payload }
        }

        case 'SAVE_AUTHOR_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'DELETE_AUTHOR': {
            return { ...state, authorList: action.payload }
        }

        case 'DELETE_ALL_AUTHOR': {
            return { ...state, authorList: action.payload }
        }

        case 'DELETE_AUTHOR_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'EDIT_AUTHOUR_CURRENT_PAGE': {
            return { ...state, currentPage: action.payload }
        }

        case 'PAGINATION_AUTHOR':
            return { ...state, authorList: action.payload }

        default:
            return state
    }
}

export const getAuthorByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_AUTHOR_BY_ID': {
            return { ...state, author: action.payload }
        }
        case 'UPDATE_VISIBLE_AUTHOR': {
            return { ...state, author: action.payload }
        }
        case 'UPDATE_VISIBLE_AUTHOR_FAIL': {
            return { ...state, error: action.payload }
        }
        case 'REMOVE_AUTHOR_BY_ID': {
            return { ...state, author: undefined }
        }

        default:
            return state
    }
}

export const searchAuthorReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_AUTHOR': {
            return { ...state, SearchAuthorResult: action.payload }
        }

        case 'SEARCH_AUTHOR_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'REMOVE_SEARCH_AUTHOUR': {
            return { ...state, SearchAuthorResult: undefined }
        }

        default:
            return state
    }
}
