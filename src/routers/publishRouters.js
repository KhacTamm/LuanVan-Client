import config from '../config'
import { HeaderOnly } from '../layouts'

import HomePage from '../pages/HomePage'
import ProductPage from '../pages/ProductPage'
import DetailPage from '../pages/DetailPage'

import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

import SearchPage from '../pages/SearchPage'
import ProductFilter from '../components/Search/ProductFilter'
import Outstandingsearch from '../components/outstandingAuthor/Outstandingsearch/Outstandingsearch'

import IntroducePage from '../pages/IntroducePage'
import CartPage from '../pages/CartPage'
import AuthorPage from '../pages/AuthorPage'

const publishRoutes = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.allAuthor, component: AuthorPage },
    { path: config.routes.cart, component: CartPage },
    { path: config.routes.productCustomer, component: ProductPage },
    { path: config.routes.inrtroduce, component: IntroducePage },
    { path: config.routes.productDetailCustomer, component: DetailPage },

    { path: config.routes.search, component: SearchPage },
    { path: config.routes.searchType, component: ProductFilter },
    { path: config.routes.searchBrand, component: ProductFilter },
    { path: config.routes.authorPage, component: Outstandingsearch },

    { path: config.routes.login, component: LoginPage, layout: HeaderOnly },
    { path: config.routes.register, component: SignupPage, layout: HeaderOnly },
]

export { publishRoutes }
