import config from '../config'
import UserLayout from '../layouts/UserLayout/UserLayout'

import ListAddress from '../components/Account/ListAddress/ListAddress'
import MyProfile from '../components/Account/MyProfile/MyProfile'

import PaymentPage from '../pages/PaymentPage'
import OrderPage from '../pages/OrderPage'
import AllOrder from '../components/MyOrder/components/AllOrder/AllOrder'
import PenddingOrder from '../components/MyOrder/components/PenddingOrder/PenddingOrder'
import ShippingOrder from '../components/MyOrder/components/ShippingOrder/ShippingOrder'
import PaidOrder from '../components/MyOrder/components/PaidOrder/PaidOrder'
import DeliveryOrder from '../components/MyOrder/components/DeliveryOrder/DeliveryOrder'
import CancelOrder from '../components/MyOrder/components/CancelOrder/CancelOrder'
import OrderSuccessPage from '../pages/OrderSuccessPage'

// import ChatPage from '../pages/ChatPage'

const userRoutes = [
    // { path: config.routes.chatCustomer, component: ChatPage },

    { path: config.routes.account, component: MyProfile, layout: UserLayout },
    { path: config.routes.addressUser, component: ListAddress, layout: UserLayout },

    { path: config.routes.payment, component: PaymentPage },
    { path: config.routes.orderCustomer, component: OrderPage },
    { path: config.routes.MyOrder, component: AllOrder, layout: UserLayout },
    { path: config.routes.MyOrderPendding, component: PenddingOrder, layout: UserLayout },
    { path: config.routes.MyOrderShipping, component: ShippingOrder, layout: UserLayout },
    { path: config.routes.MyOrderDelivery, component: DeliveryOrder, layout: UserLayout },
    { path: config.routes.MyOrderCancel, component: CancelOrder, layout: UserLayout },
    { path: config.routes.MyOrderPaid, component: PaidOrder, layout: UserLayout },
    { path: config.routes.orderSuccess, component: OrderSuccessPage },
]

export { userRoutes }
