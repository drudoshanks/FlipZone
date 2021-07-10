import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    signUpText: {
        // fontWeight: "bold",
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        marginVertical: 16,
        // textAlign: "center",
        // flex: 1,
        // // position: 'absolute',
        // textAlignVertical: "bottom",
        // bottom: 10
    },
    forgotPassword: {
        fontSize: 14,
        marginVertical: 8,
        marginHorizontal: 4,
        fontFamily: 'Roboto-Medium',
        textAlign: "right"
    },
    signIn: {
        marginVertical: 12,
        paddingVertical: 4
    },
    signUp: {
        fontFamily: 'Roboto-Medium',
        marginHorizontal: 4,
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#e3926b',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    focusCell: {
        borderWidth: 1,
        borderColor: '#f4bb9e',
    },
});