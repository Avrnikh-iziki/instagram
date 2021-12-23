import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import Header from '../components/NewPost/NewPost'
import FormikAploder from '../components/NewPost/FormikAploder'
export default function NewPost({ navigation }) {
    return (
        <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
            <Header navigation={navigation} />
            <FormikAploder navigation={navigation} />
        </SafeAreaView>
    )
}
