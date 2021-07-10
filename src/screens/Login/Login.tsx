import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Keyboard, View, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { Button, Input, Image, Text, Icon } from "react-native-elements";
import { Container } from '../../components/Container';
import { styles } from './LoginStyles';
import { useTheme } from '@shopify/restyle';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CELL_COUNT = 6;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const CONTAINER_WIDTH = SCREEN_WIDTH * 1.4;
const CONTAINER_HEIGHT = SCREEN_HEIGHT / 2;
const IMAGE_HEIGHT = CONTAINER_HEIGHT - 10;

export function LoginScreen({ navigation, params }) {
    const [number, setNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [confirm, setConfirm] = useState(null);


    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect( () => {
        auth().onAuthStateChanged( (user) => {
            if (user) {
                navigation.navigate("App")
            }
        });
    }, []); 


    async function signInWithPhoneNumber() {
        try {
            setIsLoading(true);
            const confirmation = await auth().signInWithPhoneNumber("+91 " + number,true);
            setConfirm(confirmation);
            setIsLoading(false);
            setButtonDisabled(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            Alert.alert("Error", error.message)
            await auth().signOut();
        }

    }


    async function login() {
        if(value=='') {
            Alert.alert("Error", 'please enter otp'); return
        }
        try {
            await confirm.confirm(value);
            navigation.navigate("App")
        } catch (error) {
            console.log(error)
            Alert.alert("Error", error.message)
            await auth().signOut();
        }
    }



    return (
        <Container isLoading={isLoading}>

            <KeyboardAvoidingView style={styles.container}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                        {/* <View style={{ justifyContent: "center", alignItems: 'center', backgroundColor: "#ffffff", width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT, borderBottomEndRadius: CONTAINER_WIDTH / 2, borderBottomStartRadius: CONTAINER_WIDTH / 2 }}>
                            <Image source={require('./assets/otp-mobile-icon.png')} style={{ width: IMAGE_HEIGHT, height: IMAGE_HEIGHT }} />
                        </View> */}
                        <View style={{ flex: 1, width: 300, justifyContent: "center", marginBottom: 10 }}>
                            <Input
                                placeholder={"Phone Number"}
                                autoCapitalize='none'
                                value={number}
                                keyboardType="number-pad"
                                autoCompleteType="cc-number"
                                // label={"PHONE NUMBER"}
                                placeholderTextColor="black"
                                rightIcon={number.length === 10 ? <Icon
                                    name='done'
                                    type='material'
                                    color='tomato'
                                    onPress={signInWithPhoneNumber}
                                /> : <Icon
                                    name='close'
                                    type='material'
                                    color='tomato'
                                    onPress={() => setNumber("")}
                                />}
                                labelStyle={{ color: "white", fontWeight: "100" }}
                                onChangeText={text => setNumber(text)}
                            />
                            <View style={{ marginVertical: 2, marginHorizontal: 8 }}>
                                <Text style={{ color: "black" }}>OTP</Text>
                            </View>
                            <View style={{ marginHorizontal: 8 }}>
                                <CodeField
                                    ref={ref}
                                    {...props}
                                    value={value}
                                    onChangeText={setValue}
                                    cellCount={CELL_COUNT}
                                    rootStyle={{ marginVertical: 10 }}
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    renderCell={({ index, symbol, isFocused }) => (
                                        <Text
                                            key={index}
                                            style={[styles.cell, isFocused && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )}
                                />
                            </View>
                            <TouchableOpacity onPress={signInWithPhoneNumber} style={{ marginVertical: 8 }}>
                                <Text style={{ textAlign: "center" }}>resend otp</Text>
                            </TouchableOpacity>
                            <Button
                                disabled={buttonDisabled}
                                title="Verify Now"
                                style={styles.signIn}
                                titleStyle={{
                                    fontWeight: '600',
                                    fontSize: 20,
                                    textTransform: 'uppercase'
                                }}
                                onPress={login}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Container>)

}

