import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {View,Image,Text} from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout( () => {
      const user = auth().currentUser;
      if(user && user.phoneNumber){
        AsyncStorage.getItem("@location").then((value) => {
          if(value) navigation.navigate("App"); else navigation.navigate("App");
        })
      } else {
        navigation.navigate("Auth");
      }
    },3000);

  }, [])
  return (
    <View style={styles.container}>
      <Image source={require('./assets/round.png')} style={styles.photo} />
      <Text style={{ marginHorizontal: 8, fontSize: 26,fontWeight:'bold',marginTop:5 }}>Jodhpur Dhani Mart</Text>
      <Text style={{ marginHorizontal: 8, fontSize: 16,fontWeight:'bold' }}>best online deals ka anand</Text>
    </View>
  );
}

export default SplashScreen;
