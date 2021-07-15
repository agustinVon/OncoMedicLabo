import React,{useState,useEffect} from 'react'
import {Pressable,StyleSheet,Text} from 'react-native'
import {Colors} from '../styles/Colors'
import { FontSizes } from '../styles/Fonts'

export const DateHolder = ({date,onClick}) => {

    const [dateSelected,setDate] = useState(date)

    useEffect(()=>{
        setDate(date)
    },[date])

    return (
        <Pressable style={DateHolderStyle.datePress}>
            <Text style={DateHolderStyle.dateText}>{dateSelected?dateSelected:'12 Octubre 2021'}</Text>
        </Pressable>
    )
}

const DateHolderStyle = StyleSheet.create({
    datePress:{
        borderRadius:15,
        padding:15,
        width:'80%',
        elevation:10,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:Colors.white
    },

    dateText:{
        color:Colors.textGrey,
        fontSize:FontSizes.registerQuerys
    }
})
