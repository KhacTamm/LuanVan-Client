import { AdminLayout } from '../layouts'
import config from '../config'

//----------------------------admin------------------------//
import DashBoard from '../components/Admin/components/DashBoard/DashBoard'
import AdminProduct from '../components/Admin/components/AdminProduct/AdminProduct'
import AdminCreate from '../components/Admin/components/AdminProduct/CreateProduct/AdminCreate'

import AdminOrderAll from '../components/Admin/components/AdminOrder/AdminOrderAll/AdminOrderAll'
import AdminPenddingOrder from '../components/Admin/components/AdminOrder/AdminPenddingOrder/AdminPenddingOrder'
import AdminShippingOrder from '../components/Admin/components/AdminOrder/AdminShippingOrder/AdminShippingOrder'
import AdminPaidOrder from '../components/Admin/components/AdminOrder/AdminPaidOrder/AdminPaidOrder'
import AdminCancelOrder from '../components/Admin/components/AdminOrder/AdminCancelOrder/AdminCancelOrder'

import AdminUser from '../components/Admin/components/AdminUser/AdminUser'
import createCustomerAdmin from '../components/Admin/components/AdminUser/createCustomerAdmin/createCustomerAdmin'

import AllTypeProduct from '../components/Admin/components/AdminTypeProduct/AllTypeProduct'
import FormType from '../components/Admin/components/AdminTypeProduct/FormTypeProduct/FormType'

import AllPublisher from '../components/Admin/components/AdminPublisher/AllPublisher'
import FormPublisher from '../components/Admin/components/AdminPublisher/FormPublisher/FormPublisher'

import AllAuthor from '../components/Admin/components/AdminAuthor/AllAuthor'
import FormAuthour from '../components/Admin/components/AdminAuthor/FormAuthour/FormAuthour'

import ListProductAuthor from '../components/Admin/components/AdminAuthor/ListProductAuthor/ListProductAuthor'
import AdminDelivery from '../components/Admin/components/AdminOrder/AdminDelivery/AdminDelivery'
import UpdateProfileCustomerAdmin from '../components/Admin/components/AdminUser/updateCustomerAdmin/UpdateProfileCustomerAdmin/updateCustomerAdmin'
import UpdateAddressCustomerAdmin from '../components/Admin/components/AdminUser/updateCustomerAdmin/UpdateAddressCustomerAdmin/UpdateAddressCustomerAdmin'
import OrderUser from '../components/Admin/components/AdminUser/OrderUser/OrderUser'
import PromotionAll from '../components/Admin/components/Promotion/PromotionAll'
import FormPromotion from '../components/Admin/components/Promotion/CreatePromotion/FormPromotion'
import EvaluateAll from '../components/Admin/components/AdminEvaluate/EvaluateAll'

const adminRoutes = [
    //-----------------------------------oder-----------------------------------------//
    { path: config.routes.order, component: AdminOrderAll, layout: AdminLayout },
    { path: config.routes.orderPedding, component: AdminPenddingOrder, layout: AdminLayout },
    { path: config.routes.orderShipping, component: AdminShippingOrder, layout: AdminLayout },
    { path: config.routes.orderDelivery, component: AdminDelivery, layout: AdminLayout },
    { path: config.routes.orderPaid, component: AdminPaidOrder, layout: AdminLayout },
    { path: config.routes.orderCancel, component: AdminCancelOrder, layout: AdminLayout },
    //-----------------------------------admin-----------------------------------------//

    { path: config.routes.admin, component: DashBoard, layout: AdminLayout },

    { path: config.routes.customer, component: AdminUser, layout: AdminLayout },
    { path: config.routes.orderAdminCustomer, component: OrderUser, layout: AdminLayout },
    { path: config.routes.createCustomer, component: createCustomerAdmin, layout: AdminLayout },
    { path: config.routes.updateProfileCustomer, component: UpdateProfileCustomerAdmin, layout: AdminLayout },
    { path: config.routes.updateAddresssCustomer, component: UpdateAddressCustomerAdmin, layout: AdminLayout },

    { path: config.routes.create, component: AdminCreate, layout: AdminLayout },
    { path: config.routes.product, component: AdminProduct, layout: AdminLayout },
    { path: config.routes.updateId, component: AdminCreate, layout: AdminLayout },

    { path: config.routes.category, component: AllTypeProduct, layout: AdminLayout },
    { path: config.routes.createType, component: FormType, layout: AdminLayout },
    { path: config.routes.updateType, component: FormType, layout: AdminLayout },

    { path: config.routes.publisher, component: AllPublisher, layout: AdminLayout },
    { path: config.routes.createPublisher, component: FormPublisher, layout: AdminLayout },
    { path: config.routes.updatePublisher, component: FormPublisher, layout: AdminLayout },

    { path: config.routes.author, component: AllAuthor, layout: AdminLayout },
    { path: config.routes.createAuthor, component: FormAuthour, layout: AdminLayout },
    { path: config.routes.updateAuthor, component: FormAuthour, layout: AdminLayout },
    { path: config.routes.listProductAuthor, component: ListProductAuthor, layout: AdminLayout },

    { path: config.routes.promotion, component: PromotionAll, layout: AdminLayout },
    { path: config.routes.createPromotion, component: FormPromotion, layout: AdminLayout },
    { path: config.routes.updatePromotion, component: FormPromotion, layout: AdminLayout },

    { path: config.routes.evaluate, component: EvaluateAll, layout: AdminLayout },

    // { path: config.routes.brand, component: AllTypeProduct, layout: AdminLayout },
    //-----------------------------------admin---------------------------------------------//
]

export { adminRoutes }
