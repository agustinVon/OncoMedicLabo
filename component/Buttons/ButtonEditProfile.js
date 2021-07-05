import React from 'react'
import {View,StyleSheet, Pressable} from 'react-native'
import {Colors} from '../styles/Colors'
import Icon from 'react-native-vector-icons/AntDesign';

export const ButtonEditProfile = ({onPress = null}) => {
    return (
        <Pressable style={ButtonEditStyle.viewButton} onPress={onPress}> 
            <Icon name={'edit'} color={Colors.white} size={20}/>
        </Pressable>
    )
}

const ButtonEditStyle=StyleSheet.create({
    viewButton:{
        height: 32,
        width: 32,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Colors.orange,
        borderRadius:200
    }
})




