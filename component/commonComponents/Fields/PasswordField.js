import React,{useState, useEffect} from 'react'
import {View,TextInput, Keyboard} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {GeneralStyle} from '../../styles/GeneralStyle'
import {Colors} from '../../styles/Colors'
import { Text } from 'react-native';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';

export const PasswordField = ({setValue,failToggle}) =>{
    const [passwordIsHidden,setPasswordHidden] = useState(true)
    const [password, setPassword] = useState('')
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [oneMayusc, setOneMayusc] = useState(true)
    const [oneNotMayusc, setOneNotMayusc] = useState(true)
    const [oneNumber, setOneNumber] = useState(true)
    const [eightChar, setEightChar] = useState(true)
    const [pressed,setPressed] = useState(false)

    useEffect(() => {
        if(failToggle){
            const pass_aux = password; 
            checkIfCapital(pass_aux)
            checkIfNotCapital(pass_aux)
            chechIfNumber(pass_aux)
            checkIfEightChar(pass_aux)
        }
        else{
            setPasswordIsValid(true)
            setValue(password)
        }
        
    }, [password])

    useEffect(()=>{
        if(oneMayusc && oneNotMayusc && oneNumber && eightChar && failToggle){
            setPasswordIsValid(true)
            setValue(password)
        }
        else{
            setPasswordIsValid(false)
        }
    },[oneMayusc,oneNotMayusc,oneNumber,eightChar])

    
    const checkIfCapital = (pass_aux) => {
        if(pass_aux.match(/[A-Z]/)) { 
            setOneMayusc(true)
        } else setOneMayusc(false)
    }

    const checkIfNotCapital = (pass_aux) => {
        if(pass_aux.match(/[a-z]/)) { 
            setOneNotMayusc(true)
        } else setOneNotMayusc(false)
    }

    const chechIfNumber = (pass_aux) => {
        if(/\d/.test(pass_aux)) {
            setOneNumber(true)
        } else setOneNumber(false)
    }

    const checkIfEightChar = (pass_aux) => {
        if(pass_aux.length>=8) {
            setEightChar(true)
        } else setEightChar(false)
    }

    return(
            <View>
                {console.log(password)}
                {console.log('password valid = '+passwordIsValid)}
                <View style={pressed ? (passwordIsValid) ?  GeneralStyle.field_multiple: GeneralStyle.field_incorrect:GeneralStyle.field_multiple}>
                    <TextInput 
                            onSubmitEditing={Keyboard.dismiss}
                            onFocus={()=>(setPressed(true))}
                            secureTextEntry={passwordIsHidden} 
                            onChangeText={setPassword}
                            placeholderTextColor={Colors.textGrey} 
                            placeholder="Ingrese su contraseña" 
                            style={{...GeneralStyle.field_text , flex : 5}}/>
                    <Icon.Button name={passwordIsHidden?'eye':'eyeo'}  
                            color={Colors.black} 
                            style={{flex : 1 , backgroundColor : Colors.inputFieldGrey}} 
                            onPress={()=>setPasswordHidden(!passwordIsHidden)}/>
                </View>
                
                {pressed ?
                <View>
                {(!oneMayusc) ?
                    <View style={{display: "flex",flexDirection: 'row',alignItems: 'center',marginTop: "4%",color: 'red'}}>
                        <Icon2 style={{color: 'red'}} name={"close"}/>
                        <Text style={{color: 'red',marginLeft: '2%'}}>Al menos 1 mayuscula</Text>
                    </View>:null}
                {(!oneNotMayusc) ?
                    <View style={{display: "flex",flexDirection: 'row',alignItems: 'center',marginTop: "4%",color: 'red'}}>
                        <Icon2 style={{color: 'red'}} name={"close"}/>
                        <Text style={{color: 'red',marginLeft: '2%'}}>Al menos 1 minuscula</Text>
                    </View>:null}
                {(!oneNumber) ? 
                    <View style={{display: "flex",flexDirection: 'row',alignItems: 'center',marginTop: "4%",color: 'red'}}>
                        <Icon2 style={{color: 'red'}} name={"close"}/>
                        <Text style={{color: 'red',marginLeft: '2%'}}>Al menos 1 numero</Text>
                    </View>:null}
                {(!eightChar) ?
                    <View style={{display: "flex",flexDirection: 'row',alignItems: 'center',marginTop: "4%",color: 'red'}}>
                        <Icon2 style={{color: 'red'}} name={"close"}/>
                        <Text style={{color: 'red',marginLeft: '2%'}}>Al menos 8 caracteres</Text>
                    </View>:null}
                </View>:null}
            </View>
        

    )
}