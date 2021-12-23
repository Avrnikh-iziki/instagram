import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements';

const icons = [
    {
        name: "heart",
        imageurl: require('../../assets/heart.png')
    },
    {
        name: "heart",
        imageurl: require('../../assets/comment.png')
    },
    {
        name: "heart",
        imageurl: require('../../assets/send.png')
    },
    {
        name: "heart",
        imageurl: require('../../assets/save.png')
    }

]

export default function Post({ post }) {
    return (
        <View style={{ marginTop: 30 }}>
            <Divider
                width={1}
                orientation="vertical"
            />
            <PostHeadre post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PosteFooter />
                <Likes post={post} />
                <Caption post={post} />
                <Comment post={post} />
                <Coment post={post} />

            </View>
        </View>
    )
}

const Comment = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: "gray" }}>
            {
                !!post.coments.length &&
                (
                    post.coments.length > 1
                        ? `  View all ${post.coments.length} comments`
                        : `  View 1 comment`
                )
            }
        </Text>
    </View>

)

const Coment = ({ post }) => (
    <View style={{ marginTop: 10 }}>
        {post.coments.map((comment, index) => (
            <Text key={index} style={{color:"white" , marginTop:10}}>
                <Text style={{ fontWeight: "700" , color:"gray" }}>{comment.name}</Text>
                <Text> {comment.coment}</Text>
            </Text>
        ))}
    </View>
)

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: "white" }}>
            <Text style={{ fontWeight: "700",color:"gray" }}>{post.name}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const Likes = ({ post }) => (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ color: "white" }}>{post.likes} Likes</Text>
    </View>
)

const PosteFooter = () => (
    <View style={{ flexDirection: "row" }}>
        <View style={styles.leftContainer}>
            <Icons imagstyle={styles.image} imagurl={icons[0].imageurl} />
            <Icons imagstyle={styles.image} imagurl={icons[1].imageurl} />
            <Icons imagstyle={styles.image} imagurl={icons[2].imageurl} />
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Icons imagstyle={styles.image} imagurl={icons[3].imageurl} />
        </View>
        <View>
        </View>
    </View>
)

const Icons = ({ imagstyle, imagurl }) => (
    <TouchableOpacity>
        <Image style={imagstyle} source={{ uri: imagurl }} />
    </TouchableOpacity>
)

const PostHeadre = ({ post }) => (
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
            alignItems: "center"
        }}>
        <View style={{
            flexDirection: "row",
            alignItems: "center"
        }}>
            <Image
                source={{ uri: post.imageprofile }}
                style={styles.story}
            />
            <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>{post.name}</Text>
        </View>
        <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{
        width: "100%",
        height: 450,
        marginVertical: 5
    }}>
        <Image
            source={{ uri: post.imageurl }}
            style={{
                height: "100%",
                resizeMode: "cover"
            }}
        />
    </View>

)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        marginRight: 3,
        borderWidth: 2,
        borderColor: "#ff8501",
    },
    image: {
        width: 20,
        height: 20,
    },
    leftContainer: {
        flexDirection: "row",
        width: "25%",
        justifyContent: "space-between"
    }
})