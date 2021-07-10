import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const { item } = action;
      item.quantity = 1;
      return item;
    case 'INCREMENT_QUANTITY':
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        quantity: state.quantity + 1
      }
    case 'DECREMENT_QUANTITY':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        quantity: state.quantity - 1
      }
    default:
      return state
  }
}

const cart = (state = [], action) => {
  switch (action.type) {
    case 'SET_CART':{
      return action.cart;
    }
    case 'ADD_ITEM':{
      let _state = [];
      state && state.length && state.map(t => {
        if(t && t.id) _state.push(t)
      });
      _state.push(todo(undefined, action));
      syncWithServer(_state)
      return _state;
    }
    case 'REMOVE_ITEM':{
      let _state = state.filter(item => item.id !== action.id);
      syncWithServer(_state)
      return _state;
    }
    case 'INCREMENT_QUANTITY':{
      let _state = state.map(t => todo(t, action));
      syncWithServer(_state)
      return _state;
    }
    case 'DECREMENT_QUANTITY':{
      let _state = state.map(t => todo(t, action));
      syncWithServer(_state)
      return _state;
    }
    default:
      return state
  }
}

const syncWithServer = (state) => {
  const user = auth().currentUser;
  if(user && user.phoneNumber){
    firestore().collection('UserCart').doc(user.phoneNumber).set({data:state})
    .then((ref) => { console.log(ref) });
  }
}

export default cart
