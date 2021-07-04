import React from 'react'
import { TouchableOpacity,Text,StyleSheet,Pressable } from "react-native";
import {Colors} from '../styles/Colors'

export const ButtonExtra = ({handleFunction}) =>{
    return(
    <Pressable style={BEOStyle.background} onPress={handleFunction}>
        <Text style={BEOStyle.text}>...</Text>
    </Pressable>
    )
}

const BEOStyle = StyleSheet.create({
    background:{
        backgroundColor:Colors.violet,
        width:80,
        borderRadius: 40,
        padding: 10,
        alignItems: 'center',
        marginTop:'5%'
    },
    text:{
        color:'#FFFFFF',
        fontWeight:'bold',
        fontSize:30,
    }
})