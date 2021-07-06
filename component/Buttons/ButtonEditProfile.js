import React from 'react'
import {View,StyleSheet, Pressable} from 'react-native'
import {Colors} from '../styles/Colors'
import Icon from 'react-native-vector-icons/AntDesign';

export const ButtonEditProfile = ({onPress = null , backgroundColor , color}) => {
    return (
        <Pressable style={{...ButtonEditStyle.viewButton,backgroundColor:backgroundColor}} onPress={onPress}> 
            <Icon name={'edit'} color={color} size={20}/>
        </Pressable>
    )
}

const ButtonEditStyle=StyleSheet.create({
    viewButton:{
        height: 32,
        width: 32,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:200
    }
})




