import { combineReducers } from 'redux'
import cart from './cart'
import profile from './profile'
import address from './address'
import orders from './orders'

const rootReducer = combineReducers({
    cart,
    address,
    orders,
    profile
})

export default rootReducer