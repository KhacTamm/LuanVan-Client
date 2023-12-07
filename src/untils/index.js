// export const SortProductByDiscount = (products) => {
//     products.sort((a, b) => {
//         return b.price - b.salePrice - (a.price - a.salePrice)
//     })
//     const newSaleProducts = products.slice(0, 5)

//     return handlePercentDiscount(newSaleProducts)
// }

export const handlePercentDiscount = (products) => {
    const newList = products.map((product) => {
        const percentDiscount = 100 - Math.round((product.salePrice * 100) / product.price)
        return { ...product, percentDiscount: percentDiscount }
    })
    return newList
}

export const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('vi')
    return formatter.format(price)
}

export const formatTimeDate = (date) => {
    const dt = new Date(date)
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }
    return dt.toLocaleString('vi-VN', options)
}

export const formatDate = (date) => {
    const dt = new Date(date)
    return dt.toLocaleDateString()
}

export const calculateCreatedTime = (createdAt) => {
    let periods = {
        năm: 365 * 30 * 24 * 60 * 60 * 1000,
        tháng: 30 * 24 * 60 * 60 * 1000, //2592000000
        tuần: 7 * 24 * 60 * 60 * 1000, //604800000
        ngày: 24 * 60 * 60 * 1000, //86400000
        giờ: 60 * 60 * 1000,
        phút: 60 * 1000,
    }

    let diff = Date.now() - +new Date(`${createdAt}`)

    for (const key in periods) {
        if (diff >= periods[key]) {
            let result = Math.floor(diff / periods[key])
            return `${result} ${result === 1 ? key : key}`
        }
    }

    return 'Vừa xong'
}

export const calculateTime = (createdAt, limit) => {
    let diff = Date.now() - +new Date(`${createdAt}`)
    let result = Math.floor(diff / limit)
    return result
}

export const getFirstCharacterUser = (name) => {
    const arrCharacter = name.split('')[0]
    return arrCharacter
}

export const formatDateOrderPaypal = (timestamp) => {
    const d = new Date(timestamp)
    const date = d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString()
    return date
}

export const isExpired = (day) => {
    const expirationDate = new Date(day) // Ngày hết hạn cần kiểm tra
    const currentDate = new Date() // Ngày hiện tại

    // Chuyển đổi ngày hiện tại và ngày hết hạn thành timestamp (milliseconds since Unix epoch)
    const expirationTimestamp = expirationDate.getTime()
    const currentTimestamp = currentDate.getTime()

    if (currentTimestamp > expirationTimestamp) {
        return true
    } else {
        return false
    }
}

export const isComeSoon = (day) => {
    const dueDate = new Date(day) // Ngày hết hạn cần kiểm tra
    const currentDate = new Date() // Ngày hiện tại

    const dueDateTimestamp = dueDate.getTime()
    const currentTimestamp = currentDate.getTime()

    if (currentTimestamp === dueDateTimestamp) {
        return true
    } else {
        return false
    }
}

export const isDaypromotion = (dayStart, dayEnd) => {
    // Giả sử bạn có ngày cần kiểm tra
    const dateToCheck = new Date()

    // Giả sử bạn có ngày bắt đầu và ngày kết thúc của khoảng thời gian
    const startDate = new Date(dayStart)
    const endDate = new Date(dayEnd)

    // Kiểm tra xem ngày đó có nằm trong khoảng thời gian hay không
    if (dateToCheck >= startDate && dateToCheck <= endDate) {
        return true
    } else {
        return false
    }
}

export const handleDataAuthor = (authorList) => {
    if (authorList.authorLists !== undefined && JSON.stringify(authorList.authorLists) !== '{}') {
        return authorList.authorLists
    }
    return authorList
}

export const handleDataType = (typeProduct) => {
    if (typeProduct.typeProducts !== undefined && JSON.stringify(typeProduct.typeProducts) !== '{}') {
        return typeProduct.typeProducts
    }
    return typeProduct
}

export const handleDataBrand = (ListBrannd) => {
    if (ListBrannd.ListBrannd !== undefined && JSON.stringify(ListBrannd.ListBrannd) !== '{}') {
        return ListBrannd.ListBrannd
    }
    return ListBrannd
}

export const handleDataProduct = (product) => {
    if (product && product.products !== undefined && JSON.stringify(product.products) !== '{}') {
        return product.products
    }
    return product
}
