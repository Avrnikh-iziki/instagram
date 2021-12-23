import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'

export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
        inactive:
            'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png',
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png',
    },
    {
        name: 'Shop',
        active:
            'https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png',
        inactive:
            'https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png',
    },
    {
        name: 'Profile',
        active:
            'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
        inactive:
            'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    },
]

export default function MenuTab({ icons }) {
    const [active, setactive] = useState('Home')
    const Icons = ({ icon }) => (
        <TouchableOpacity
            onPress={() => setactive(icon.name)}
        >
            <Image
                source={{ uri: active === icon.name ? icon.active : icon.inactive }}
                style={[
                    styles.image,
                    icon.name === 'Profile' ? profilepic() : null,
                    (active === "Profile" && icon.name === "Profile")
                        ? profilepic('Profile')
                        : null
                ]}
            />
        </TouchableOpacity>
    )
    return (
        <View style={styles.warper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {
                    icons.map((icon, index) => (
                        <Icons icon={icon} key={index} />
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    warper: {
        position: "fixed",
        width: "100%",
        bottom: 0,
        index: 999,
        backgroundColor: "#000"
    },
    image: {
        width: 20,
        height: 20
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 50,
        paddingTop: 10,
    },
})

const profilepic = (active = "") => {
    return {
        borderRadius: 50,
        borderWidth: active === "Profile" ? 2 : 0,
        borderColor: "orange",
    }
}