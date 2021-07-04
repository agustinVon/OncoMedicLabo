import React, {useState,useEffect} from 'react'
import {ToastAndroid,Platform, AlertIOS,
        SafeAreaView,StyleSheet,Dimensions,View,Image,Text,TextInput,ScrollView, Button,Modal,Pressable, KeyboardAvoidingView, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {ButtonCustomeOrange} from '../Buttons/ButtonCustomeOrange.js'
import {connect} from 'react-redux'
import {logoutUser, setDbtInformationAction, setPersonalInformationAction} from '../../reduxStore/actions/registerAction'
import DropDownPicker from 'react-native-dropdown-picker'
import {useFocusEffect} from '@react-navigation/native'

import {CustomPicker} from '../commonComponents/Pickers/CommonPicker'
import {DatePickerModal} from '../commonComponents/Modals/DatePickerModal'
import {CustomAlert} from '../commonComponents/Alerts/Alert'
import {PasswordField} from '../commonComponents/Fields/PasswordField'
import {IncorrectField} from '../commonComponents/Fields/IncorrectField'
import {MailField} from '../commonComponents/Fields/MailField'
import Icon from 'react-native-vector-icons/AntDesign';
import {hashPassword} from '../PasswordHash'


const {width} = Dimensions.get("window")
 
const Register = ({navigation,setPersonalInformationAction}) => {

    const [email,setEmail] = useState("")
    const [name,setName] = useState ("")
    const [surname,setSurname] = useState("")
    const [password,setPassword] = useState("")
    const [gender,setGender] = useState(0)
    const [birth, setBirth] = useState(new Date())
    const [birthWasSelected, setBirthSelected] = useState(false)
    const [emailValidate,setEValidate] = useState(true)
    const [dateModalVisible, setDModal] = useState(false)
    const [firstTry,setFirstTry] = useState(true)

    useEffect(() => {
        const email_aux = email;
        email_aux.length > 0 ? email_aux.includes("@") ? setEValidate(true) : setEValidate(false) : setEValidate(true)
    }, [email])

    
    

    const handleSwitchToRegisterMedic = async () =>{
        setFirstTry(false)
        if(name==='' || surname ==='' || password ===''|| email===''){
            CustomAlert('Error','Complete todos los campos')
        }
        else{
            hashPassword(password, pushToRedux)
        }
    }

    const pushToRedux = (hashedPassword) => {
        setPersonalInformationAction({name:name,surname:surname,email:email,gender:gender,birth:birth.toDateString(),password:hashedPassword})
        navigation.navigate("register_medic")
    }

    const notifyMessage = (msg) => {
        Platform.OS === 'android' ? ToastAndroid.show(msg, ToastAndroid.SHORT) : AlertIOS.alert(msg)
    }

    const genderTypes=[{label: 'Masculino', value:0,},
                {label: 'Femenino', value:1},
                {label: 'Otro', value:2}]

    return (
        
        <SafeAreaView style={RegisterUser.reguse_cont_background}>
            <View style={RegisterUser.reguse_top}>
                <Image source={require("../../img/ic_user.png")}/>
                <Text style={RegisterUser.reguse_text_top}>   DATOS USUARIO</Text>
            </View>
            <View>
                <Image style={RegisterUser.reguse_top_img} source={require("../../img/register_deco.png")}/>
            </View>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1}}
            >
            <ScrollView  contentContainerStyle={RegisterUser.scroll} >
                <View style={RegisterUser.reguse_cont_cont}>
                    <View style={RegisterUser.reguse_cont_regusein_inputs}>
                            <View>
                                <Text style={RegisterUser.reguse_text_upinput}>Nombre</Text>
                                <IncorrectField fail={name.length < 1 && !firstTry}
                                    value={name} setValue={setName}
                                    placeHolder={'Ingrese su nombre'} message={'Campo incompleto'}/>
                            </View>
                            <View style={{marginTop:25}}>
                                <Text style={RegisterUser.reguse_text_upinput}>Apellido</Text>
                                <IncorrectField fail={surname.length < 1 && !firstTry}
                                    value={surname} setValue={setSurname}
                                    placeHolder={'Ingrese su Apellido'} message={'Campo incompleto'}/>
                            </View>
                            <View style={{marginTop:25}}>
                                <Text style={RegisterUser.reguse_text_upinput}>Contraseña</Text>
                                <PasswordField setValue={setPassword} failToggle={true}/>
                            </View>
                            
                            <View style={{marginTop: 25, zIndex:40}}>
                                <View>
                                    <Text style={RegisterUser.reguse_text_upinput}>Sexo</Text>
                                    <View style={{marginTop:8}}>
                                        <CustomPicker items={genderTypes} defaultValue={gender} setValue={setGender} placeHolder={'Seleccione su sexo'}/>
                                    </View>
                                </View>
                                
                            </View>
                            <View style={{marginTop: 25}}>
                                <Text style={RegisterUser.reguse_text_upinput}>Email</Text>
                                <MailField setValue={setEmail} incomplete={!firstTry && email.length <1}/>
                            </View>
                            <View style={{marginTop: 25}}>
                                <Text style={RegisterUser.reguse_text_upinput}>Fecha de Nacimiento</Text>
                                <Pressable style={RegisterUser.reguse_date_picker_container} onPress={()=>(setDModal(true),setBirthSelected(true))}>
                                    {console.log('fecha: '+birth)}
                                    {console.log('fue seleccionada la fecha: '+birthWasSelected)}
                                    {birthWasSelected?
                                    <View>
                                        <Text style={RegisterUser.reguse_text}> {''+birth.getDate()+' / '+(birth.getMonth()+1)+' / '+birth.getFullYear()} </Text>
                                    </View>
                                    :
                                    <Text style={RegisterUser.reguse_text_upinput}>Seleccione su fecha de nacimiento</Text>
                                    }    
                                </Pressable>
                            </View>
                            <ButtonCustomeOrange title={"Continuar"} handleFunction={handleSwitchToRegisterMedic} marginT={{marginTop: 50}}/>
                    
                    </View>
                </View>
            </ScrollView>
            <DatePickerModal visibility={dateModalVisible} setVisibility={setDModal} date={birth} setDate={setBirth}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const mapDispatchToProps = {
    setPersonalInformationAction,
    logoutUser
}

export default connect(null,mapDispatchToProps)(Register)

const RegisterUser = StyleSheet.create({

    reguse_drop_down_picker:{
        padding:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10, 
        borderBottomLeftRadius:10, 
        borderBottomRightRadius:10,
        height:50,
    },
    log_text_container:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop: 6,
        paddingLeft:10,
        paddingRight:10,
        width:300,
        height:50,
        borderRadius: 10,
        backgroundColor: "#E3E3E3",
    },
    log_textInput:{

        flex:5,
        height:50,
        width:20,
        fontSize: 17,
        borderRadius: 10,
    },
    log_icon_style:{
        backgroundColor:'#E3E3E3',
        flex:1,
    },
    reguse_validvalue:{
        color:"red"
    },
    scroll:{
        width,
        paddingBottom: 30,
        alignItems: 'center',
    },
    reguse_cont_cont:{
        width,
        justifyContent: 'center',
        position:"relative",
        flex: 1,
    },
    reguse_text_upinput:{
        color:"#AAAAAA",
        fontSize: 17,
        marginLeft:10
    },
    reguse_textInput:{
        marginTop: 6,
        width:300,
        height:50,
        fontSize: 17,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#E3E3E3",   
    },
    reguse_date_picker_container:{
        marginTop: 6,
        width:320,
        height:50,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#E3E3E3",  
    },
    reguse_text:{
        fontSize: 17,
        zIndex: 10000,
    },
    reguse_textInputRed:{
        marginTop: 6,
        width:300,
        height:50,
        fontSize: 17,
        padding: 10,
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 10,
        backgroundColor: "#E3E3E3",   
    },
    reguse_cont_regusein_inputs:{
        alignContent:'center',
        alignItems:'center',
        flexDirection: 'column',
        width:300,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        flex: 4,
        marginBottom:50
    },
    reguse_top_color:{
        backgroundColor:"#B189F8",
        height:80,
        width
    },
    reguse_text_reguse:{
        fontSize: 25,
        fontWeight: 'bold',
    },
    reguse_text_in:{
        fontSize: 25,
        fontWeight: 'bold',
        color: "#B189F8",
        marginLeft: 5,
    },

    reguse_text_top:{
        fontWeight: 'bold',
        fontSize: 18,
        color:"white"
    },
    reguse_top_img:{
        width,
        flex: 0,
    },
    reguse_cont_background:{
        width,
        height:"100%",
        alignItems: 'center',
        flexDirection: 'column',
    },
    reguse_top:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        width,
        height:80,
        flex: 0,
        backgroundColor: "#B189F8",
    },
    reguse_btn_gender:{
        backgroundColor: "#E3E3E3",
        width:300,
        height:50,
        padding: 10,
        borderRadius: 10,
        justifyContent:'center',
        alignContent: 'center', 
    },
})
