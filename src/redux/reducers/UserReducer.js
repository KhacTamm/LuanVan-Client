const userInfoFromaLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : undefined

const initialState = {
    userInfo: userInfoFromaLocalStorage,
    users: [],
    userid: {},
}

export const UserSignupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_SIGNUP_SUCCESS':
            return { ...state, userInfo: action.payload }
        default:
            return state
    }
}

export const UserSignoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_SIGNOUT_SUCCESS':
            return { ...state }
        default:
            return state
    }
}

export const getAllUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            return { ...state, userInfo: action.payload }

        case 'USER_LOGIN_FAIL':
            return { ...state, error: action.payload }

        case 'GET_ALL_USER': {
            return { ...state, user: action.payload }
        }

        case 'ADRESS_USER': {
            return { ...state, userInfo: action.payload }
        }

        case 'UPDATE_ADRESS_USER': {
            return { ...state, userInfo: action.payload }
        }

        case 'SET_DEFAULT_ADRESS_USER': {
            return { ...state, userInfo: action.payload }
        }

        case 'DELETE_ADDRESS_USER': {
            return { ...state, userInfo: action.payload }
        }

        case 'UPDATE_USER': {
            return { ...state, userInfo: action.payload }
        }

        case 'UPDATE_USER_FAIL': {
            return { ...state, error: action.payload }
        }
        //  =========================================== Admin ===============================================

        case 'SAVE_USER': {
            return { ...state, userId: action.payload }
        }

        case 'SAVE_ADDRESS_USER': {
            return { ...state, userId: action.payload }
        }

        case 'SAVE_ADDRESS_USER_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'DELETE_ADDRESS_USER_ADMIN': {
            return { ...state, userId: action.payload }
        }

        case 'DELETE_ADDRESS_USER_ADMIN_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'SET_DEFAULT_ADRESS_USER_ADMIN': {
            return { ...state, userId: action.payload }
        }

        case 'SAVE_USER_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'DELETE_USER': {
            return { ...state }
        }

        default:
            return state
    }
}

export const getUserByIdReducer = (state = {}, action) => {
    switch (action.type) {
        // case 'GET_USER_BY_ID': {
        //     return {
        //         ...state,
        //         user: action.payload,
        //     }
        // }

        case 'GET_USER_BY_ID': {
            return { ...state, userId: action.payload }
        }

        case 'REMOVE_USER_BY_ID': {
            return {
                ...state,
                userId: undefined,
            }
        }
        default:
            return state
    }
}

export const searchUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_USER': {
            return { ...state, searchUserResult: action.payload }
        }

        case 'SEARCH_USER_FAIL': {
            return { ...state, error: action.payload }
        }

        case 'REMOVE_SEARCH_USER': {
            return { ...state, searchUserResult: undefined }
        }

        default:
            return state
    }
}
