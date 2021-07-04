import React from 'react'
import { Pressable,Image,View,Text,StyleSheet } from 'react-native'
import {Colors} from '../styles/Colors'

export const ButtonCalendarHome =({handleFunction})=>{
    return(
        <Pressable style={BCalHome.background} onPress={handleFunction}>
            <View>
                <Text style={BCalHome.title}>Tienes citas esta semana?</Text>
                <Text style={BCalHome.text}>Observa un resumen de las citas pendientes en el calendario</Text>
            </View>
            <View>
                <Image source={require('../../img/illust_calendar.png')} style={{height:80, width:80}}/>
            </View>
            
        </Pressable>
    )
}

const BCalHome = StyleSheet.create({
    background:{
        backgroundColor:Colors.violet,
        width:330,
        height:140,
        borderRadius: 30,
        padding: 18,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection:'row',
        marginTop:20
    },
    title:{
        width:180,
        color:"white",
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 8,
        textAlign:'left'
    },
    text:{
        width:180,
        color:"white",
        fontSize: 12,
        textAlign:'left'
    }

})