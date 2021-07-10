import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import { LogBox,Text } from 'react-native';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import LoginScreen from '../screens/Login';
import MenuScreen from '../screens/Menu/MenuScreen';
import MyOrders from '../screens/MyOrders/MyOrders';
import Address from '../screens/Address/Address';
import { Locality } from '../screens/Locality/Locality';
import { Badge, Icon } from 'react-native-elements';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderScreen from '../screens/Orders/OrderScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector,useDispatch } from 'react-redux';
import SplashScreen from '../screens/Splash/SplashScreen';
import { setCart } from '../actions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();
const appColor = '#0b3679';

const CartIcon = ({ navigation }) => {
  const cartList = useSelector(state => state.cart);
  const dispatch = useDispatch();
  if(!cartList || !cartList.length || cartList.length == 0){
    // check online cart and set here
    const user = auth().currentUser;
    if(user && user.phoneNumber){
      firestore()
      .collection('UserCart')
      .doc(user.phoneNumber)
      .get()
      .then(querySnapshot => {
        if(querySnapshot.exists){
          // cart exists
          dispatch(setCart(querySnapshot.data().data));
        }
      });
    }
  }

  return (
    <TouchableOpacity style={{paddingLeft: 15,paddingTop: 12, paddingHorizontal: 24 }}
      onPress={() => {
        if(cartList && cartList.length && cartList.length>0){
          navigation.navigate("Cart")
        }
      }}>
      <Icon
        name='shopping-cart'
        type='font-awesome'
        color={"white"}
      />
      <Badge
        status="success"
        value={cartList && cartList.length}
        containerStyle={{ position: 'absolute', top: 4, right: 18 }}
      />
    </TouchableOpacity>
  )
}

const ChangeLocality = ({ navigation }) => {

  return (
    <TouchableOpacity style={{ paddingHorizontal: 24, paddingTop: 12 }}
      onPress={() => navigation.navigate("Locality")}>
      <Icon
        name='location-arrow'
        type='font-awesome'
        color={"white"}
      />
    </TouchableOpacity>
  )
}

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="JDM"
        component={MenuScreen}
        options={({ navigation, route }) => ({
          headerLeft: null,
          headerRight: () => (
            <View style={{ flexDirection: 'row',alignItems:'center' }}>

              <CartIcon navigation={navigation} />
              {/* <ChangeLocality navigation={navigation} /> */}

            </View>
          ),
          headerTitleAlign: "left",
          headerStyle: { elevation: 0, backgroundColor: appColor },
          headerTitleStyle: { color: "white" },
        })}
      />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Cart" component={OrderScreen} options={{
        headerTitleAlign: 'left',
        headerTitle: 'Cart',
        headerStyle: { elevation: 0, backgroundColor: appColor },
        headerTitleStyle: { color: "white" },
      }} />
      <Stack.Screen name="Address" component={Address} options={{
        headerTitleAlign: 'left',
        headerTitle: 'Add Address',
        headerStyle: { elevation: 0, backgroundColor: appColor },
        headerTitleStyle: { color: "white" },
      }} />
    </Stack.Navigator>
  );
}

const TabBarIconRender = (name,iconName,focused) => {
  return(
    <View>
      <Icon
        name={iconName}
        type='font-awesome'
        color={focused ? '#e8ff00' : 'white'} />
      <Text
        style={{
          fontSize: 12,
          fontWeight:focused ? 'bold' : '100',
          color:focused ? '#e8ff00' : 'white',
        }}>
        {name}
      </Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "white",
      tabStyle: {
        maxWidth: 140,
      },
      style: {
        alignItems: "center",
        backgroundColor: "black",
      },
      showLabel: false,
    }}>
      <Tab.Screen name="Home" options={{
        tabBarIcon: ({focused}) => (TabBarIconRender('Home','home',focused))
      }} component={MainNavigator} />
      <Tab.Screen name="My Orders" options={{
        tabBarIcon: ({focused}) => (TabBarIconRender('My Orders','history',focused))
      }} component={MyOrders} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: 'Welcome Back',
          headerTitleAlign: 'left',
          headerStyle: { elevation: 0 },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerTitle: '',
          headerStyle: { elevation: 0, backgroundColor: 'transparent' },
        }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen
        name="Locality"
        component={Locality}
        options={{
          // headerBackImage: (): require('../screens/Locality/assets/back-arrow.png'),
          headerTintColor: 'white',
          headerTitle: 'Select Locality',
          headerTitleStyle: { color: "white", fontWeight: "normal" },
          headerTitleAlign: 'left',
          headerStyle: { elevation: 0, backgroundColor: "#0b3679", },
          // headerShown: false,
        }}
      />
      <Stack.Screen name="App" component={MyTabs} />
    </Stack.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

// export default AppContainer = createAppContainer(DrawerStack);

LogBox.ignoreAllLogs(true)
