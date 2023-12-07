const images = {
    //Nó trả về một object có thuộc tính default là địa chỉ của hình nên cần phải .default để lấy ra

    logo: require('../../src/assets/images/logo/logo.png').default,
    logoAdmin: require('../../src/assets/images/logo/logoadmin.png').default,
    avatarAdmin: require('../../src/assets/images/avatar/avatarAdmin.png').default,
    // shopping_basket: require('../../src/assets/images/shopping-basket-add-icon-removebg-preview.png').default,
    shopping_basket: require('../../src/assets/images/1710411-removebg-preview.png').default,
    bill_empty: require('../../src/assets/images/cart-removebg-preview.png').default,
    voucher: require('../../src/assets/images/ticket.png').default,

    avatar: require('../../src/assets/images/avatar/no-avatar.png').default,
    background_login: require('../../src/assets/images/login/book-background-resize3_1.jpg').default,

    intro1: require('../../src/assets/images/intro/intro1.jpg').default,
    intro2: require('../../src/assets/images/intro/intro2.jpg').default,

    404: require('../../src/assets/images/404.png').default,
    empty: require('../../src/assets/images/empty.png').default,
    admin404: require('../../src/assets/images/404Ad.png').default,
}
export default images
