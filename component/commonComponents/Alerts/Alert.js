import React from 'react'
import { Alert } from "react-native"

export const CustomAlert = (title, description) => {
    Alert.alert(
        title,
        description,
        [
            {
                text: 'OK',
            }
        ]
    )
}