import React, { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, Button } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { db, firebase } from '../../firebase'
import { ListItem } from 'react-native-elements/dist/list/ListItem'

const default_image = 'https://img.bfmtv.com/c/630/420/871/7b9f41477da5f240b24bd67216dd7.jpg'
const aploadSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is REQUIRED'),
    caption: Yup.string().max(2000, "caption has reached the charcter limit")
})

export default function FormikAploder({ navigation }) {
    const [ImageUrl, setimageUrl] = useState()
    const [currentuser, setcurrentuser] = useState(null)

    const getusername = () => {
        const user = firebase.auth().currentUser
        const unsabscibe = db
            .collection('users')
            .where('owner_uid', "==", user.uid)
            .limit(1)
            .onSnapshot(snapshot =>
                snapshot.docs.map(doc => {
                    setcurrentuser({
                        usrname: doc.data().name,
                        profilepicture: doc.data().imageurl
                    })
                })
            )
        return unsabscibe
    }


    const uploadtofirebase = (imageurl, caption) => {
        const unsubscribe = db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('posts')
            .add({
                imageurl: imageurl,
                user: currentuser.username,
                profilepicture: currentuser.profilepicture,
                owner_uid: firebase.auth().currentUser.uid,
                caption: caption,
                creatAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes: 0,
                likes_by_user: [],
                comments: [],
            })
            .then(() => navigation.goBack())

        return unsubscribe
    }

    useEffect(() => {
        getusername()

    }, [])

    return (
        <View style={{ marginHorizontal: 10 }}>
            <Formik
                initialValues={{ caption: "", imageUrl: "" }}
                onSubmit={(values) => {
                    uploadtofirebase(values.imageUrl, values.caption)

                }}
                validationSchema={aploadSchema}
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
                        <View style={{
                            margin: 20,
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                            <Image
                                source={{
                                    uri: validUrl.isUri(ImageUrl)
                                        ? ImageUrl
                                        : default_image
                                }}
                                style={{
                                    width: 100,
                                    height: 120
                                }}
                            />
                            <TextInput
                                style={{ color: "white", fontSize: 20 }}
                                placeholder="write a caption..."
                                placeholderTextColor='gry'
                                multiline={true}
                                onChangeText={handleChange("caption")}
                                onBlur={handleBlur("caption")}
                                value={values.caption}
                            />
                        </View>
                        <Divider width={0.2} orientation="vertical" />
                        <TextInput
                            onChange={e => setimageUrl(e.nativeEvent.text)}
                            style={{ color: "white", fontSize: 20, marginBottom: 5 }}
                            placeholder="Entre Image Url"
                            placeholderTextColor='gry'
                            onChangeText={handleChange('imageUrl')}
                            onBlur={handleBlur('imageUrl')}
                            value={values.imageUrl}
                        />
                        {errors.imageUrl &&
                            <Text style={{ fontSize: 10, color: "red", marginBottom: 10 }}>
                                {errors.imageUrl}
                            </Text>
                        }
                        <Button
                            onPress={handleSubmit}
                            title='Share'
                            disabled={!isValid}
                            color="orange"
                        />
                    </>
                )}
            </Formik>
        </View>
    )
}
