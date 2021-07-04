import React,{useState} from 'react'
import {View,Modal,Text} from 'react-native'
import {ButtonCustomeOrange} from '../../Buttons/ButtonCustomeOrange'
import {GeneralStyle} from '../../styles/GeneralStyle'
import {Colors} from '../../styles/Colors'
import {ButtonCustomeViolet} from '../../Buttons/ButtinCustomViolet'

export const DisclaimerModal = ({visibility,setVisibility,contFunction}) =>{
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
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View style={GeneralStyle.modal_background}>
                    <Text style={GeneralStyle.modal_title}>AVISO</Text>
                    <View style={{
                        backgroundColor: Colors.textGrey,
                        height: 2,
                        width: '80%',
                        marginBottom: 20
                    }}/>
                    <Text style={GeneralStyle.modal_text}>La privacidad de sus datos es nuestra prioridad. Por lo tanto limitamos el acceso de los mismos a usted y a su medico</Text>
                    <View style={{width:'50%'}}>
                        <ButtonCustomeViolet title={'OK'} handleFunction={()=>{
                            setVisibility(false),
                            contFunction()}}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}