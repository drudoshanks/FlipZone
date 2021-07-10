import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Text, Avatar, ListItem, Button,Input, Divider } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../actions';

import auth from '@react-native-firebase/auth';


export default function Address({navigation,props}) {
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [landmark, setLandmark] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const diapatch = useDispatch();
    const address = useSelector(state => state.address);
    
    useEffect(() => {
        setAddressLine1(address.addressLine1)
        setAddressLine2(address.addressLine2)
        setLandmark(address.landmark ? address.landmark : 'Search')
        return;
      }, [])

    const addAddressPress = async () => {
        if(addressLine1 == '' || addressLine2 == '' || landmark == ''){
            Alert.alert('please add complete address');
            return
        }

        let data = {addressLine1,addressLine2,landmark}
        const user = await auth().currentUser;
        if(user && user.phoneNumber){
            firestore().collection('UserAddress').doc(user.phoneNumber).set({data:data})
            .then((ref) => {
                diapatch(setAddress(data))
                navigation.navigate("Cart") 
            });
          } else {
            navigation.navigate("Auth");
          }
    }

    return (
        <View style={{flex:1}}>
            <Input
                placeholder={"Address Line 1"}
                autoCapitalize='none'
                value={addressLine1}
                placeholderTextColor="black"
                labelStyle={{ color: "black", fontWeight: "100" }}
                onChangeText={text => setAddressLine1(text)}
            />
            <Input
                placeholder={"Address Line 2"}
                autoCapitalize='none'
                value={addressLine2}
                placeholderTextColor="black"
                labelStyle={{ color: "black", fontWeight: "100" }}
                onChangeText={text => setAddressLine2(text)}
            />
            <View style={{marginHorizontal:10,flex:1}}>
                <GooglePlacesAutocomplete
                    placeholder={landmark}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setLandmark(data.description)
                    }}
                    query={{
                        key: 'AIzaSyCxmYJYhOj4klxDnQpzpRKEdvr4_ZexYFk',
                        language: 'en',
                    }}
                />
            </View>

            <TouchableOpacity
                style={styles.addressButton}
                onPress={addAddressPress}>
                <Text style={{ color: "white",backgroundColor:'#0b3679',padding:10,borderRadius:3,fontWeight:'bold',fontSize:15 }}>CONFIRM</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addressButton: {
        justifyContent:'center',
        alignItems:'center'
    },
});
