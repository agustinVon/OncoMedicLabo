import React,{useState,useEffect} from 'react'
import {View,Modal,Text,StyleSheet} from 'react-native'
import {ButtonCustomeOrange} from '../../Buttons/ButtonCustomeOrange'
import {GeneralStyle} from '../../styles/GeneralStyle'
import {Colors} from '../../styles/Colors'
import RadioForm from 'react-native-simple-radio-button';
import { IncorrectField } from '../Fields/IncorrectField'

export const SmokeEditModal = ({visibility,setVisibility,setSmokeData}) =>{

    const [smokeChoice, setSmokeChoice] = useState(1)
    const [smokeIncorrect, setSmokeErr] = useState(false)
    const [firstTime,setFirstTime] = useState(true)
    const [time, setTime] = useState(0)
    const [qnt, setQnt] = useState(0)

    const inmap = [{label: 'Empeze a fumar', value: 1 },
    {label: 'Deje de fumar', value: 2 }]

    useEffect(()=>{
        if((time <= 0 || qnt <= 0) && !firstTime){
            setSmokeErr(true)
        }
        else{
            setSmokeErr(false)
            setFirstTime(false)
        }
    },[time,qnt])

    const confirm = () => {
        if(setSmokeChoice === 1){
            console.log('hola')
            setVisibility(false)
            setSmokeData({
                smoke: smokeChoice,
                qnt: 0,
                time: 0
            })
        }
        else{
            if(!firstTime && !smokeIncorrect){
                setVisibility(false)
                setSmokeData({
                    smoke: smokeChoice,
                    qnt: qnt,
                    time: time
                })
            }
        }
        
    }

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
            <View style={SmokeEditModalStyle.viewContainer}>
                <View style={GeneralStyle.modal_smoke_background}>
                    <Text style={GeneralStyle.modal_title}>ACTUALIZAR</Text>
                    <View style={SmokeEditModalStyle.viewLine}/>
                    <RadioForm
                    radio_props={inmap}
                    initial={0}
                    formHorizontal={true}
                    labelHorizontal={false}
                    buttonColor={Colors.orange}
                    buttonSize={15}
                    animation={true}
                    onPress={(value) => {setSmokeChoice(value)}}
                    />
                    { smokeChoice === 2 &&
                    <View style={{marginTop:20}}>
                        <IncorrectField fail={smokeIncorrect} value={time} setValue={setTime} 
                        placeHolder={'Cuantos años fumaste?'}
                        keyboardType={'numeric'}
                        message={'Valores invalidos'}
                        width={280}/>
                        <View style={{marginTop:15}}>
                            <IncorrectField fail={smokeIncorrect} value={qnt} setValue={setQnt} 
                            placeHolder={'Cuantos atados al dia?'}
                            keyboardType={'numeric'}
                            message={'Valores invalidos'}
                            width={280}/>
                        </View>
                        
                    </View>
                    }
                    <View style={{width:'50%'}}>
                        <ButtonCustomeOrange title={'ACEPTAR'} handleFunction={()=>confirm()}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const SmokeEditModalStyle = StyleSheet.create({
    viewContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    viewLine:{
        backgroundColor: Colors.textGrey,
        height: 2,
        width: '80%',
        marginBottom: 20
    }
})