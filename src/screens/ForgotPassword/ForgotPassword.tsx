import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Avatar } from 'react-native-elements';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Container } from '../../components/Container';
import styles from './ForgotPasswordStyles'
import { useTheme } from '@shopify/restyle';

export default function ForgotPassword({ navigation }) {
    const [mobile, setMobile] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const theme = useTheme()
    const { secondaryText } = theme.colors;


    // useEffect(() => {
    //     try {
    //         if (user !== "success" && isLoading && "error" in user) {
    //             setIsLoading(false)
    //             Alert.alert("Failed to login", user.error.message);
    //         } else if (user === "success" && isLoading) {
    //             setIsLoading(false)
    //             redirectToValidateOTP()
    //         }
    //     }
    //     catch (e) {
    //         console.log(e)
    //         setIsLoading(false)
    //     }

    // }, [user])

    function forgot() {
        if (!mobile) {
            Alert.alert("Mobile number is not valid", "Please enter mobile number");
        }
        else if (mobile) {
            setIsLoading(true)
        } else {
            Alert.alert("Mobile number is not valid", "Please verify your number");
        }
    }

    function redirectToValidateOTP() {
        navigation.navigate("ValidateOTP", { number: mobile })
    }

    return (
        <Container>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Card>
                    <Card.Title h4>Forgot Password?</Card.Title>
                    <Card.Title>We will send you an one time password on this mobile number</Card.Title>
                    <View
                        style={{ marginVertical: 12 }}
                    >
                        <Input
                            placeholder={"Mobile Number"}
                            value={mobile}
                            maxLength={10}
                            keyboardType={"number-pad"}
                            onChangeText={text => setMobile(text)}
                            leftIcon={<Avatar title="+91" titleStyle={{ color: secondaryText }} />}
                        />
                    </View>
                    <Button
                        loading={isLoading}
                        title="Send"
                        onPress={forgot} />
                </Card>
            </View>
        </Container>
    );
}

