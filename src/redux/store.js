import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { getAllUserReducer, getUserByIdReducer, searchUserReducer, UserSignupReducer } from './reducers/UserReducer'
import {
    getAllProductReducer,
    getProductByIdReducer,
    rateProduct,
    searchProductBrandReducer,
    searchProductReducer,
} from './reducers/ProductReducer'

import { CartReducer } from './reducers/CartReducer'
import {
    addressReducer,
    getAllOrderReducer,
    getOrderByUserReducer,
    OrderInfoReducer,
    orderPayReducer,
} from './reducers/OrderReducer'
import { getAllTypeReducer, getTypeByIdReducer, searchTypeReducer } from './reducers/ListTypeProductReducer'
import { searchBrandReducer, getAllBrandReducer, getBrandByIdReducer } from './reducers/ListPublisherReducer'
import { InfoGhnReducer } from './reducers/GhnReducer'
import { getAuthorByIdReducer, getAllAuthorReducer, searchAuthorReducer } from './reducers/AuthorReducer'
import { getAllPromotionReducer, getPromotionByIdReducer } from './reducers/PromotionReducer'

const userInfoFromaLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : undefined

const initialState = {
    userSignin: {
        userInfo: userInfoFromaLocalStorage,
    },
}

const reducer = combineReducers({
    getUsers: getAllUserReducer,
    userSignup: UserSignupReducer,
    getUserById: getUserByIdReducer,
    searchUser: searchUserReducer,

    // -------------------------------------------------------- Product--------------------------------------------------
    allProduct: getAllProductReducer,
    getProductById: getProductByIdReducer,
    searchProduct: searchProductReducer,
    searchProductBrand: searchProductBrandReducer,
    allRateProduct: rateProduct,

    // -------------------------------------------------------- Type --------------------------------------------------

    allTypeProduct: getAllTypeReducer,
    getTypeById: getTypeByIdReducer,
    searchType: searchTypeReducer,
    // detailType: TypeProductReducer,

    // -------------------------------------------------------- Author --------------------------------------------------

    allAuthor: getAllAuthorReducer,
    getAuthorById: getAuthorByIdReducer,
    searchAuthor: searchAuthorReducer,

    // -------------------------------------------------------- Brand --------------------------------------------------

    allBrandProduct: getAllBrandReducer,
    getBrandById: getBrandByIdReducer,
    searchBrand: searchBrandReducer,

    // -------------------------------------------------------- Cart --------------------------------------------------

    cart: CartReducer,

    // -------------------------------------------------------- Order --------------------------------------------------

    allOrder: getAllOrderReducer,
    address: addressReducer,

    orderByUser: getOrderByUserReducer,
    orderInfo: OrderInfoReducer,
    payOrder: orderPayReducer,

    orderGhn: InfoGhnReducer,

    // -------------------------------------------------------- Chat --------------------------------------------------
    allPromotion: getAllPromotionReducer,
    getPromotionById: getPromotionByIdReducer,

    // selectList: SelectListReducer,
    // updateSelect: UpdateSelectListReducer,

    // allTypeProduct: ListTypeProductReducer,
    // detailType: TypeProductReducer,

    // allBrandProduct: ListBrandProductReducer,
    // detailBrand: BrandProductReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
