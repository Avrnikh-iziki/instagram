import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screns/Home'
import NewPost from './screns/NewPost'
import Login from './screns/Login'
import SignUp from './screns/SignUp'

const Stack = createStackNavigator()

export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name='NewPost' component={NewPost} />
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{ headerShown: false }}
        >

            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={SignUp} />
        </Stack.Navigator>
    </NavigationContainer>
)

