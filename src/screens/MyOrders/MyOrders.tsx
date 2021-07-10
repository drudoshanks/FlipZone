import React, { useRef, useState, useEffect } from 'react';
import {
    FlatList, View, TouchableOpacity, Dimensions
} from 'react-native';
import { Divider, Button, Image, ListItem, Text } from 'react-native-elements';
import { Container } from '../../components/Container';
import ViewPager from '@react-native-community/viewpager';
import { styles } from "./MyOrdersStyles";
import { useSelector,useDispatch } from 'react-redux';
import { _WooCommerceAPI } from "../../services/Api";
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import { cellHeight, cellWidth, tabHeight } from '../../resources/Constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setOrders } from '../../actions';
import Moment from 'moment';
const appColor = '#0b3679';
import auth from '@react-native-firebase/auth';

export interface MyOrdersProps {
}

export default function MyOrders({ navigation }: MyOrdersProps) {
  const orderList = useSelector(state => state.orders);
  const [isLoading, setIsLoading] = useState(false)
  const [noorders, setNoorders] = useState(false)

  const dispatch = useDispatch();

    useEffect(() => {
      const user = auth().currentUser;
        if(user && user.phoneNumber){
          setIsLoading(true)
          firestore()
          .collection('Orders')
          .orderBy('createdAt','desc')
          .where('number', '==', user.phoneNumber)
          .get()
          .then(querySnapshot => {
            console.log('Total users: ', querySnapshot.size);
            setIsLoading(false)
            if(querySnapshot.size > 0){
              let orderList = [];
              querySnapshot.docs.map(doc => orderList.push(doc.data()))
              dispatch(setOrders(orderList))
              setNoorders(false)
            } else {
              setNoorders(true)
            }
          });
        }
        return;
      }, [])

    return (
      <Container isLoading={isLoading}>
        <View style={{ flex: 1 }}>    
            <View style={{height:'8%',width:'100%',backgroundColor:appColor,justifyContent:'center'}}>
                <Text style={{ marginHorizontal: '5%', fontSize: 18, color:'white',fontWeight:'bold' }}>My orders</Text>
            </View>
            {
              (orderList && orderList.length)
              ?
              <FlatList
                  data={orderList}
                  contentContainerStyle={{marginVertical:'1%',paddingBottom:cellHeight}}
                  keyExtractor={(item, index) => 'key'+index}
                  ItemSeparatorComponent={() => <View style={{height:10,width:'100%'}} />}
                  renderItem={({ item, index }) => {
                      let itemList = '';
                      item.cart.map(item => {
                        itemList += item.quantity + ' ' +item.name+',';
                      })
                      itemList = itemList.slice(0, -1); 
                      return (
                        <View style={{ borderRadius:2,borderColor:'#AAAAAA80',borderWidth:1, marginHorizontal:'1%', justifyContent: 'center', alignItems: 'center'}} >
                            <View style={{flex:1,width:'100%',padding:5,justifyContent:'center'}}>
                              <Text style={{fontSize:12}}>{'status '}
                              <Text style={{fontSize:12,fontWeight:'bold'}}>{item.status}
                              </Text>
                              </Text>
                            </View>
                            <View style={{flex:2,width:'100%',padding:5,justifyContent:'center'}}>
                              <Text style={{fontSize:12}}>{'items'}</Text>
                              <Text style={{fontSize:14}}>{itemList}</Text>
                            </View>
                            <View style={{flex:1,width:'100%',padding:5,justifyContent:'center'}}>
                              <Text style={{ fontSize:12 }}>{'Phone Number '+item.number}</Text>
                              <Text style={{fontSize:10}}>{'total price : ₹' + item.totalPrice}</Text>
                              <Text style={{fontSize:10}}>{'Placed On ' + Moment(item.createdAt*1000).format('hh:mm a DD MMM')}</Text>
                            </View>
                        </View>
                      )
                  }}
              /> 
              :
              (noorders)
              ?
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>No Orders Yet!</Text>
              </View>
              : 
              null
            }
        </View>
      </Container>
    );
}
