import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Button, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import * as Yup from "yup"
import Validator from 'email-validator'
import { firebase, db } from '../../firebase'
export default function FormLogin({ navigation }) {

    const loginFormSchema = Yup.object().shape({
        email: Yup
            .string()
            .email()
            .required('An email is required'),
        username: Yup
            .string()
            .required()
            .min(2, 'A username is required'),
        password: Yup
            .string()
            .required()
            .min(8, "Your password has to have at least 8 chacters")
    })


    const onSignup = async (email, password, username) => {
        try {
            const authuser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log(' Firebase User Created successfully', email, password)
            db.collection('users').doc(authuser.user.email).set({
                oner_uid: authuser.user.uid,
                usename: username,
                profile_picture: await getRandomeProfileIcon()

            })
        } catch (error) {
            Alert.alert(error.message)
        }
    }
    const getRandomeProfileIcon = async () => {
        const res = await fetch('https://randomuser.me/api')
        const data = await res.json()
        return data.results[0].picture.large
    }

    return (
        <View style={Styles.warper}>
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={(values) => {
                    onSignup(values.email, values.password, values.username)
                }}
                validationSchema={loginFormSchema}
                validateOnMount={true}

            >
                {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    isValid
                }) => (
                    <>
                        <View style={[
                            Styles.inputFaild,
                            {
                                borderColor: values.email.length < 1 || Validator.validate(values.email)
                                    ? "#ccc"
                                    : "red"
                            }
                        ]}>
                            <TextInput
                                placeholderTextColor="#444"
                                placeholder="email"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                textContentType="email-address"
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={[
                            Styles.inputFaild,
                            {
                                borderColor: (values.username.length < 1 || values.username.length > 2)
                                    ? "#ccc"
                                    : "red"
                            }
                        ]}>
                            <TextInput
                                placeholderTextColor="#444"
                                placeholder="Username"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                textContentType="email-address"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View style={[
                            Styles.inputFaild,
                            {
                                borderColor: (values.password.length < 1 || values.password.length > 8)
                                    ? "#ccc"
                                    : "red"
                            }
                        ]}>
                            <TextInput
                                placeholderTextColor="#444"
                                placeholder="Password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType="password"
                                autoFocus={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <Pressable
                            titleSize={20}
                            style={buttonstyle(isValid)}
                            onPress={handleSubmit}
                        >
                            <Text style={{ color: "white", fontWeight: "700" }}>Sign Up</Text>
                        </Pressable>
                        <View style={Styles.singupContainer}>
                            <Text>Do you have an account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={{ color: "#6BB0F5" }}>Log in</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

const Styles = StyleSheet.create({
    inputFaild: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#FAFAFA",
        marginTop: 10,
        borderWidth: 1,
        marginBottom: 5,
    },
    warper: {
        marginTop: 80,
    },

    singupContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 30
    }
})

const buttonstyle = (isvalid = false) => {
    return {
        backgroundColor: isvalid ? '#9ACAF7' : '#8896F6',
        alignItems: "center",
        justifyContent: "center",
        minHeight: 40,
        borderRadius: 4,
        marginTop: 10
    }
}