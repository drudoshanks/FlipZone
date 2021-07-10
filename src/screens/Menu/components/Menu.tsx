import React, { useEffect, useState } from 'react';
import { Text, View, Linking } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { Counter } from '../../../components/Counter/Counter';
import { cellHeight, cellWidth, tabHeight } from '../../../resources/Constants';
import Icon from 'react-native-vector-icons/Ionicons';

export interface MenuProps {
    item: any
}


export function Menu({ item,horizontal }: MenuProps) {
    // console.log(item) three types of tags 1. shop(a. delivery b. no_delivery) 2. service 3. product
    console.log(item.tags)
    let isProduct = false;
    let phone = '7062656332';
    let whatsapp = '7062656332';
    item.tags.map(obj => {
        if(obj.name=='product'){
            isProduct = true;
        }
        if(obj.name.includes("phone")){
            phone = obj.name.split('_')[1];
        }
        if(obj.name.includes("whatsapp")){
            whatsapp = obj.name.split('_')[1];
        }
    });
    if(!item || !item.images || !item.images.length) return <View />
    if(horizontal){
        return (
            <View style={{ justifyContent: 'space-between', alignItems: 'center', margin: 12, flexDirection: "row", flex:1 }}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Avatar
                        source={{ uri: item.images[0].src }} 
                        size={cellWidth} 
                        avatarStyle={{ borderWidth: 2, borderColor: 'white', borderRadius: 20 }}/>
                    <View style={{marginLeft:14,alignItems:'flex-start'}}>
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                        <Counter item={item} defaultValue={item.value} />
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold' }}>{'₹' + (item.sale_price*item.quantity)}</Text>
            </View>
        );
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 12, height: cellHeight-20 }} >
            <Avatar
                 source={{ uri: item.images[0].src }} 
                 size={cellWidth} 
                 avatarStyle={{ borderWidth: 2, borderColor: 'white', borderRadius: 20 }}/>
            <Text style={{ fontSize:12,width: cellWidth, height: tabHeight / 3, textAlign: 'center' }}>{item.name}</Text>
            {
                (isProduct)
                ?
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize:10}}>{'price : ₹' + item.sale_price}</Text>
                    <Counter item={item} />
                </View>
                :
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize:10}}>{phone}</Text>
                    <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="call" size={22} onPress={() =>Linking.openURL(`tel:${phone}`)} />
                        <Text style={{ marginHorizontal: 8, fontSize: 16 }}>{' '}</Text>
                        <Icon name="logo-whatsapp" size={22} onPress={() => Linking.openURL('whatsapp://send?text=Hi.. JD Mart&phone=+91'+whatsapp)} />
                    </View>
                </View>
            }

        </View>
    );


}
