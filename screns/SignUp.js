import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import FormSignup from '../components/Signup/FormSignup'
const instagramLogo = "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png"

const Login = ({ navigation }) => (
    <View style={styles.conatainer}>
        <View style={styles.logoContainer}>
            <Image source={{ uri: instagramLogo, height: 80, width: 80 }} />
        </View>
        <FormSignup navigation={navigation} />
    </View>
)

const styles = StyleSheet.create({
    conatainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 12,
        backgroundColor: "white"
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 60
    }
})

export default Login
