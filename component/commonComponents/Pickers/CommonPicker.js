import React,{useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import {StyleSheet, View} from 'react-native'
import { Platform, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Pressable } from 'react-native'

export const CustomPicker = ({items, defaultValue, setValue, placeHolder}) => {

    
    return(
        
        Platform.OS !== 'android' ? 
        <DropDownPicker
            items={items}
            defaultValue={defaultValue}
            style={defaultValue!=null?CustomPickerStyle.not_picked : CustomPickerStyle.picked}
            itemStyle={{ justifyContent: 'flex-start'}}
            containerStyle={{height:50}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => setValue(item.value)}
            placeholder={placeHolder}
            placeholderStyle={defaultValue==null?CustomPickerStyle.place_holder_style_not_picked : CustomPickerStyle.place_holder_style_picked}>
        </DropDownPicker>
        :
        <Pressable style={defaultValue!=null?CustomPickerStyle.not_picked : CustomPickerStyle.picked} onPress={()=>setValue(items[0])}>
            {defaultValue == null?
            <Picker
            selectedValue={defaultValue}
            onValueChange={(itemValue) => setValue(itemValue)}>
                <Picker.Item label={placeHolder} value={null} style={CustomPickerStyle.place_holder_style_not_picked}/>
                {items.map((item) => <Picker.Item label={item.label} value={item.value}/>)}
            </Picker>:
            <Picker
            selectedValue={defaultValue}
            onValueChange={(itemValue) => setValue(itemValue)}>
                {items.map((item) => <Picker.Item label={item.label} value={item.value}/>)}
            </Picker>
            }
        </Pressable>
    )
}
const CustomPickerStyle= StyleSheet.create({


    place_holder_style_picked:{
        color:'black',
        fontSize:17
    },

    place_holder_style_not_picked:{
        color:'#AAAAAA',fontSize:17
    },

    container_style:{
        height:50,
    },

    not_picked:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10, 
        borderBottomLeftRadius:10, 
        borderBottomRightRadius:10,
        height:50,
        backgroundColor: '#fafafa'
    },

    picked:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10, 
        borderBottomLeftRadius:10, 
        borderBottomRightRadius:10,
        height:50,
        backgroundColor: "#E3E3E3"
    }

})

