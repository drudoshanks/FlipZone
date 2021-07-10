import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, ImageBackground, View } from 'react-native';
import { Avatar, Button, Card, Input, Text } from "react-native-elements";
import { Container } from '../../components/Container';
import { styles } from './RegisterStyles';
import { register } from "../../services/Api";

export default function RegisterScreen({ navigation, params }) {
    // const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const theme = useTheme()
    const { secondaryText, mainText } = theme.colors;

    async function registerUser() {
        setLoading(true);
        const response = await register(email, mobile, password);
        console.log('response', response);
        setLoading(false);
    }
    return (
        <Container>
            <ImageBackground
                source={require("../../images/background/auth_background.png")}
                style={{
                    flex: 1, backgroundColor: "white", resizeMode: "cover",
                }}

            >
                <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ padding: 12, flex: 1, justifyContent: "center", alignItems: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Card> */}
                            <Text h2 style={{ color: mainText }}>Account Request</Text>
                            <Text >Please provide us the following details and we would set up the account for you</Text>
                        </View>
                        <View style={{ flex: 4, width: 300, justifyContent: "center" }}>

                            {/* <Input
                                // label="Name"
                                value={name}
                                placeholder="Name"
                                leftIcon={{ type: 'font-awesome', name: 'user', size: 20, color: secondaryText }}
                                onChangeText={text => setName(text)}
                            /> */}
                            <Input
                                placeholder="Mobile Number"
                                value={mobile}
                                inputStyle={{ width: "100%" }}
                                // leftIcon={{ type: 'font-awesome', name: 'phone', size: 20, color: secondaryText }}
                                onChangeText={text => setMobile(text)}
                                leftIcon={<Avatar title="+91" titleStyle={{ color: secondaryText }} />}
                            />
                            <Input
                                leftIcon={{ type: 'font-awesome', name: 'envelope', size: 20, color: secondaryText }}
                                placeholder="Email ID"
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                            <Input
                                leftIcon={{ type: 'font-awesome', name: 'lock', size: 24, color: secondaryText }}
                                placeholder="Password"
                                value={password}
                                secureTextEntry={true}
                                onChangeText={text => setPassword(text)}
                            />
                            <Button loading={loading} title="Submit" onPress={registerUser} />
                        </View>
                        {/* </Card> */}
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </Container >
    );
}

