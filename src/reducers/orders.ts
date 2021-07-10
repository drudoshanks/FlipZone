const orders = (state = [], action) => {
switch (action.type) {
        case 'SET_ORDERS':{
            return action.orders;
        }
        case 'ADD_ORDER':{
            console.log('action:=== '+JSON.stringify(action))
            state.unshift(action.order);
            console.log('_state:=== '+state.length)
            return state;
        }
        default:
            return state
    }
}
  
export default orders