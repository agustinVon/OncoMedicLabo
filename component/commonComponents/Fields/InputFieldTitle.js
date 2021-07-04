import React from 'react'
import {View,TextInput, Text, Keyboard} from 'react-native'
import {GeneralStyle} from '../../styles/GeneralStyle' 
import {Colors} from '../../styles/Colors'

export const InputField = ({setValue, title, keyboardType}) =>{
    return(
    <View style={GeneralStyle.center_container}>
        <Text style={GeneralStyle.title}>{ title }</Text>
        <View style={GeneralStyle.field_multiple}>
            <TextInput onSubmitEditing={Keyboard.dismiss} onChangeText={setValue} style={GeneralStyle.field_text} keyboardType={keyboardType}></TextInput>
        </View>
    </View>
    )
    
} 

