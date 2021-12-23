import React, { useState } from 'react'
import { Alert, View, Text, StyleSheet, Pressable, TouchableOpacity, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import * as Yup from "yup"
import { firebase } from '../../firebase'
import Validator from 'email-validator'

export default function FormLogin({ navigation }) {

    const loginFormSchema = Yup.object().shape({
        email: Yup
            .string()
            .email()
            .required('An email is required'),
        password: Yup
            .string()
            .required()
            .min(8, "Your password has to have at least 8 chacters")
    })

    const onLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log('Firebase login Successfull', email, password)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <View style={Styles.warper}>

            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                    onLogin(values.email, values.password)
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
                                placeholder="Phone number , username or email"
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

                        <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
                            <Text style={{ color: "#6BB0F5" }}> Forgot Password</Text>
                        </View>
                        <Pressable
                            titleSize={20}
                            style={buttonstyle(isValid)}
                            onPress={handleSubmit}
                        >
                            <Text style={{ color: "white", fontWeight: "700" }}>Log in</Text>
                        </Pressable>
                        <View style={Styles.singupContainer}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.push('Signup')}
                            >
                                <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
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
        borderRadius: 4
    }
}