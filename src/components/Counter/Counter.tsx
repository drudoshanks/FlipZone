import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, decrementCounter, incrementCounter, removeItemFromCart } from '../../actions';

export interface CounterProps {
    item: any
}

function selectCartItem(cartItems, item) {
    for (const key in cartItems) {
        const cartItem = cartItems[key];
        if (cartItem.id === item.id) {
            return cartItem.quantity;
        }
    }
    return 0;

}

export function Counter({ item }: CounterProps) {
    const cartItems = useSelector(state => state.cart);
    const quantity = selectCartItem(cartItems, item);
    const dispatch = useDispatch();


    function decrement() {
        if(quantity != 0){
            if (quantity === 1) {
                dispatch(removeItemFromCart(item.id))
            } else {
                dispatch(decrementCounter(item.id))
            }
        }
    }

    function increment() {
        if (quantity === 0) {
            dispatch(addItemToCart(item))
        } else {
            dispatch(incrementCounter(item.id))
        }
    }

    return (
        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="plus-circle-outline" size={22} onPress={increment} />
            <Text style={{ marginHorizontal: 8, fontSize: 16 }}>{quantity}</Text>
            <Icon name="minus-circle-outline" size={22} onPress={decrement} />
        </View>
    );
}
