export const incrementCounter = (id) => ({
    type: 'INCREMENT_QUANTITY',
    id
})
export const decrementCounter = (id) => ({
    type: 'DECREMENT_QUANTITY',
    id
})

export const addItemToCart = (item) => ({
    type: 'ADD_ITEM',
    item,
})

export const removeItemFromCart = (id: any) => ({
    type: 'REMOVE_ITEM',
    id,
})

export const setCart = (cart:any) => ({
    type: 'SET_CART',
    cart,
})

export const setAddress = (address:any) => ({
    type: 'SET_ADDRESS',
    address,
})

export const setOrders = (orders:any) => ({
    type: 'SET_ORDERS',
    orders,
})

export const addOrders = (order:any) => ({
    type: 'ADD_ORDER',
    order,
})