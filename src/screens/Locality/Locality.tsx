import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements'
import { Container } from '../../components/Container';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LocalityProps {
}

export function Locality({ navigation }: LocalityProps) {

    const [locations, setLocations] = useState([])
    const [location, setLocation] = useState(null)

    useEffect(() => {

        const subscriber = firestore().collection('pincodeCategory').onSnapshot(querySnapshot => {
            const data = [];

            querySnapshot.forEach(documentSnapshot => {
                data.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            })
            setLocations(data)
        })
        return () => subscriber();
    }, [])

    function selectLocation(value: string) {
        setLocation(value);
        AsyncStorage.setItem("@location", JSON.stringify(value))
        navigation.navigate("App")
    }

    return (
        <Container>
            <ListItem>
                <Avatar rounded source={require("./assets/cl-location-icon.png")} />
                <ListItem.Content>
                    <ListItem.Title h4 >{"Select Locality from list"}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <View style={{ marginHorizontal: 4 }}>
                <FlatList
                    data={locations}
                    renderItem={({ item }) => (
                        <ListItem style={{margin:5,borderRadius:5,borderWidth:2,borderColor:'#0b3679'}}>
                            <ListItem.Content>
                                <ListItem.Title>{item.key}</ListItem.Title>
                            </ListItem.Content>
                            <Button
                                titleStyle={{ fontSize: 14 }}
                                buttonStyle={{ backgroundColor: "#0b3679" }}
                                title="Select location"
                                onPress={() => selectLocation(item)}
                            />

                        </ListItem>
                    )}
                />
            </View>
        </Container>
    );
}
