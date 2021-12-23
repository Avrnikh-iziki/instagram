import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function NewPost({ navigation }) {
    return (
        <View style={Styles.container}>
            <Header navigation={navigation} />
        </View>
    )
}

const Header = ({navigation}) => (
    <View style={Styles.headerContainer}>
        <TouchableOpacity
            onPress={()=>navigation.goBack()}
        >
            <Image
                source={{ uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png" }}
                style={{
                    width: 30,
                    height: 30
                }}
            />
        </TouchableOpacity>
        <Text style={Styles.headerText}>NEW POST</Text>
    </View>
)

const Styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 5
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 20,
        marginLeft: 10,
        width: "95%",
        textAlign: "center"
    }
})
