//Cau hinh
const routes = {
    //----------------------------admin------------------------//

    evaluate: '/admin/evaluate',

    createPromotion: '/admin/promotion/create',
    updatePromotion: '/admin/promotion/update/:id',
    promotion: '/admin/promotion',

    customer: '/admin/customer',
    createCustomer: '/admin/customer/create',
    orderAdminCustomer: '/admin/customer/order/:id',
    updateProfileCustomer: '/admin/customer/update/profile/:id',
    updateAddresssCustomer: '/admin/customer/update/address/:id',

    create: '/admin/product/create',
    updateId: '/admin/product/update/:id',
    reviewProduct: '/admin/product/reviewProduct/:id',
    product: '/admin/product',

    createType: '/admin/typeList/create',
    category: '/admin/typeList',
    updateType: '/admin/typeList/update/:id',

    post: '/admin/post',
    creatPost: '/admin/post/create',
    updatePost: '/admin/post/update/:id',

    blog: '/post/:id',

    createPublisher: '/admin/publisher/create',
    publisher: '/admin/publisher',
    updatePublisher: '/admin/publisher/update/:id',

    author: '/admin/author',
    createAuthor: '/admin/author/create',
    updateAuthor: '/admin/author/update/:id',
    listProductAuthor: '/admin/author/listProduct/:id',

    order: '/admin/order',
    orderPedding: '/admin/order/pendding',
    orderShipping: '/admin/order/shipping',
    orderDelivery: '/admin/order/delivery',
    orderPaid: '/admin/order/paid',
    orderCancel: '/admin/order/cancel',

    chat: '/admin/chat',
    admin: '/admin/',

    //----------------------------customer------------------------//
    search: '/search/:name',
    searchType: '/search/type/:id',
    searchBrand: '/search/brand/:id',
    authorPage: '/author/:id',

    login: '/login',
    register: '/register',
    cart: '/cart',
    MyOrder: '/myOrder',
    orderCustomer: '/order',
    payment: '/payment',
    chatCustomer: '/chat',
    productCustomer: '/product',
    productDetailCustomer: '/product/detail/:id',

    inrtroduce: '/introduce',
    allAuthor: '/author',
    account: '/account/:id',
    addressUser: '/account/address/:id',

    MyOrderPendding: '/myOrder/pendding',
    MyOrderShipping: '/myOrder/shipping',
    MyOrderDelivery: '/myOrder/delivery',
    MyOrderCancel: '/myOrder/cancel',
    MyOrderPaid: '/myOrder/paid',
    orderSuccess: '/orderSuccess',
    home: '/',
}

export default routes
