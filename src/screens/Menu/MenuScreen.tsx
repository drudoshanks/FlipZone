import React, { useState, useEffect } from 'react';
import {
    FlatList, View, Dimensions, Alert, BackHandler, TouchableOpacity,Text,ActivityIndicator,ScrollView
} from 'react-native';
import { Container } from '../../components/Container';
import { styles } from "./MenuScreenStyles";
import { _WooCommerceAPI } from "../../services/Api";
import { TabView, TabBar } from 'react-native-tab-view';
import { useFocusEffect } from '@react-navigation/core';
import { tabHeight, tabWidth } from '../../resources/Constants';
import { Menu } from './components/Menu';
import { useIsFocused } from "@react-navigation/native";

const appColor = '#0b3679';

export interface MenuScreenProps {
}

export default function MenuScreen({ navigation }: MenuScreenProps) {
    const [active, setActive] = useState(0);
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loadMenuItems, setLoadMenuItems] = useState(false);
    const initialLayout = { width: Dimensions.get('window').width };
    const isFocused = useIsFocused();

    useFocusEffect(() => {
        const onBackPress = () => {
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    });

    useEffect(() => {
        function getCategoryAPI() {
            _WooCommerceAPI.get('products/categories')
                .then(data => {
                    if (data && data.data && data.data.status == '401') {
                        Alert.alert(data.message)
                    } else {
                        setCategories(data)
                        setLoadMenuItems(true)
                        _WooCommerceAPI.get('products', { category: data[0].id })
                            .then(_data => {
                                setMenuItems(_data);
                                setLoadMenuItems(false);
                            })
                            .catch(error => {
                                setLoadMenuItems(false);
                            });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            
        }

        getCategoryAPI()
    }, [isFocused])



    const renderScene = ({ route }) => {
        if(loadMenuItems){
            return (
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: "center" }}>
                    <ActivityIndicator size="large" color={'black'} />
                </View>
            )            
        }
        return (
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: "center" }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <Menu item={item} />
                    )}
                />
            </View>
        )
    };

    const updateIndex = (index: number) => {
        setActive(index);
        setMenuItems([]);
        setLoadMenuItems(true);
        _WooCommerceAPI.get('products', { category: categories[index].id })
            .then(data => {
                setMenuItems(data);
                setLoadMenuItems(false);
            })
            .catch(error => {
                setLoadMenuItems(false);
            });
    };
    const _renderTabBar = (props) => {
        return (
            <View style={styles.tabBar}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection:'row'}}>
                        {props.navigationState.routes.map((route, i) => {
                        let focussed = (active == i);
                        return (
                            <View style={{justifyContent:'center',alignItems:'center',width:100,height:40}}>
                                <TouchableOpacity
                                    style={{flex:1,justifyContent:'center',alignItems:'center',width:80,backgroundColor: focussed ? appColor : '#FFF',borderRadius:8}}
                                    onPress={() => {
                                        updateIndex(i)
                                    }}>
                                    <Text style={{ color:focussed ? '#FFF' : 'black', fontWeight: focussed ? 'bold' : '100',textAlign:'center' }}>{route.name}</Text>
                                </TouchableOpacity>
                            </View>

                        );
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
    const renderTabBar = (props) => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'orange' }}
                getLabelText={({ route }) => route.name}
                style={{
                    backgroundColor: 'white',
                }}
                tabStyle={{ width: tabWidth, height: tabHeight }}
                labelStyle={{ fontSize: 14 }}
                inactiveColor={'grey'}
                scrollEnabled={true}
                pressColor={'orange'}
                activeColor={'orange'}
                onTabPress={({ route, preventDefault }) => {
                    preventDefault();
                    updateIndex(route ? categories.indexOf(route) : 0)
                }}
            />
        );
    }

    return (
        <Container >
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <TabView
                    navigationState={{ index: active, routes: categories }}
                    style={styles.categoryTabView}
                    renderScene={renderScene}
                    onIndexChange={updateIndex}
                    initialLayout={initialLayout}
                    renderTabBar={_renderTabBar}
                    lazy
                    lazyPreloadDistance={1}
                    swipeEnabled={false}
                />
            </View>
        </ Container>
    );
}
