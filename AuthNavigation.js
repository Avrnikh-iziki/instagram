import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './Navigation'
import { firebase } from './firebase'

export default function AuthNavigation() {
    const [currentuser, setUser] = useState(null)
    const userHandler = user => user
        ? setUser(user)
        : setUser(null)

    useEffect(() => firebase
        .auth()
        .onAuthStateChanged(user => userHandler(user))
        , [])
    return <>
        {
            currentuser
                ? <SignedInStack /> :
                <SignedOutStack />
        }
    </>
}
