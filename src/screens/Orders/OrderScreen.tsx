import React, { useEffect,useState } from 'react';
import { FlatList, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Card, Text, Avatar, ListItem, Icon, Divider } from 'react-native-elements';
import { useSelector,useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { Counter } from '../../components/Counter/Counter';
import { cellWidth } from '../../resources/Constants';
import { setAddress,setCart,setOrders } from '../../actions';
import { Menu } from '../Menu/components/Menu';
import Moment from 'moment';
import auth from '@react-native-firebase/auth';



function cartTotal(cartList) {
  let total: number = 0;
  for (const key in cartList) {
    total = parseInt(cartList[key].sale_price)*parseInt(cartList[key].quantity) + total;
  }
  return total;
}

export default function OrderScreen({navigation,props}) {
  const cartList = useSelector(state => state.cart);
  const address = useSelector(state => state.address);
  const [loading, setLoading] = useState(false);
  const total = cartTotal(cartList);
  const deliveryCharge = 20;
  const grandTotal = total + deliveryCharge;

  const dispatch = useDispatch();

  useEffect(() => {
    const user = auth().currentUser;
    if(user && user.phoneNumber){
      firestore()
      .collection('UserAddress')
      .doc(user.phoneNumber)
      .get()
      .then(querySnapshot => {
        if(querySnapshot.exists){
          // cart exists
          dispatch(setAddress(querySnapshot.data().data));
        }
      });
    }

    return;
  }, [])

  const onPressAddress = () => {
    navigation.navigate("Address")
  }

  const onPressPlaceOrder = async () => {
    if(!cartList || !cartList.length){
      Alert.alert('Please add items to place order')
      return
    }

    if(!address || !address.addressLine2){
      Alert.alert('Please add address')
      return
    }

    // place order
    setLoading(true)
    const user = await auth().currentUser;
    let number = user.phoneNumber ? user.phoneNumber : '';
    if(user && number){
      let order = {
        number:number,
        address:address,
        cart:cartList,
        status:'placed',
        totalPrice:grandTotal,
        createdAt:Moment().unix(),
        restroNumber:'7062656332'
      }
      console.log(order)
      firestore().collection('Orders').add(order)
        .then((ref) => {
          firestore().collection('UserCart').doc(number).set({data:{}})
          .then((ref) => {
            dispatch(setCart(null));
            firestore()
            .collection('Orders')
            .orderBy('createdAt','desc')
            .where('number', '==', number)
            .get()
            .then(querySnapshot => {
              console.log('Total users: ', querySnapshot.size);
              if(querySnapshot.size > 0){
                setLoading(false)
                let orderList = [];
                querySnapshot.docs.map(doc => orderList.push(doc.data()))
                dispatch(setOrders(orderList))
                navigation.pop()
                navigation.navigate("My Orders")
                
              }
            });
            
          }); 
        });
    }

  }

  if(loading){
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    )
  }

  return (
    <ScrollView>
      <View>
        {
          (cartList)
          ?
          <FlatList
            data={cartList}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item, index }) => (
              <Menu item={item} horizontal/>
            )}
          /> : null
        }

        <Card>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text>Item Total</Text>
            <Text>{`₹ ${total}`}</Text>
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text>Delivery Charges</Text>
            <Text>{`₹ ${parseFloat(deliveryCharge).toFixed(2)}`}</Text>
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text>Grand Total</Text>
            <Text>{`₹ ${grandTotal}`}</Text>
          </View>
        </Card>
        <Card>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Icon
            name="map-marker-outline"
            type="material-community"
            color="gray"
          />
          <View style={{width:10,height:10}}/>
            <ListItem.Content>
              <ListItem.Title>{address.addressLine1}</ListItem.Title>
              <ListItem.Subtitle>{address.addressLine2 ? address.addressLine2 : 'Please add address'}</ListItem.Subtitle>
              <ListItem.Subtitle>{address.landmark}</ListItem.Subtitle>
            </ListItem.Content>
          <TouchableOpacity
            onPress={onPressAddress}>
            <Text style={{ color: "white",backgroundColor:'#0b3679',padding:10,borderRadius:3,fontWeight:'bold' }}>Add Address</Text>
          </TouchableOpacity>
          </View>
        </Card>
        <TouchableOpacity
            onPress={onPressPlaceOrder}>
          <ListItem containerStyle={{ backgroundColor: "#0b3679", margin: 12 }}>
            <ListItem.Content>
              <ListItem.Title style={{ color: "white", fontSize: 16 }}>{`₹ ${grandTotal}`}</ListItem.Title>
              <ListItem.Subtitle style={{ color: "white", fontSize: 16 }}>TOTAL</ListItem.Subtitle>
            </ListItem.Content>
            <Text style={{ color: "white", fontWeight: '100', fontSize: 20 }}>Place Order</Text>
            <Icon
              name='arrow-forward' color="white" />
          </ListItem>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
