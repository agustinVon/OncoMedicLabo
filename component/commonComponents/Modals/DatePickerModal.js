import React,{useState} from 'react'
import {StyleSheet, View,Modal} from 'react-native'
import {ButtonCustomeOrange} from '../../Buttons/ButtonCustomeOrange'
import DatePicker from 'react-native-date-picker'

export const DatePickerModal= ({visibility,setVisibility,date,setDate}) =>{
    return(
        <Modal
                animationType="slide"
                transparent={true}
                visible={visibility}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                    setVisibility(!visibility);
                }}
            >
                <View style={ModalStyle.modal_container}>
                    <View style={ModalStyle.modal_background}>
                        <DatePicker 
                        date={date}
                        onDateChange={setDate}
                        maximumDate={new Date()}
                        mode={'date'}/>
                        <View style={{width:'80%'}}>
                            <ButtonCustomeOrange title={'SELECCIONAR FECHA'} handleFunction={()=>setVisibility(!visibility)}/>
                        </View>
                    </View>
                </View>
        </Modal>
    )
}

const ModalStyle = StyleSheet.create({
    modal_container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "hsla(175, 75%, 0%, 0.15)",
    },
    modal_background:{
        backgroundColor:'#FFFFFF',
        height:'55%',
        width:'85%',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderRadius:10
    }
})