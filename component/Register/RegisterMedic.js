import React, {useState,useEffect} from 'react'
import {ToastAndroid,Platform, AlertIOS,
        SafeAreaView,StyleSheet,Dimensions,View,Image,Text,TextInput,ScrollView, Pressable, KeyboardAvoidingView} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {ButtonCustomeOrange} from '../Buttons/ButtonCustomeOrange.js'
import { Button, Modal } from 'react-native-paper'
import {SearchBar} from 'react-native-elements'
import {ModalTest} from './ModalTest';
import store from '../../reduxStore/store';
import {setMedicalInformationAction} from '../../reduxStore/actions/registerAction'
import DropDownPicker from 'react-native-dropdown-picker'
import {connect} from 'react-redux'

import firestore, { firebase } from '@react-native-firebase/firestore';
import {CustomPicker} from '../commonComponents/Pickers/CommonPicker'
import zIndex from '@material-ui/core/styles/zIndex'
import { Keyboard } from 'react-native'




const {width} = Dimensions.get("window")
 
const RegisterMedic =  ({navigation,setMedicalInformationAction}) => {
    const places=[{label: 'Austral', value:0,}]

    const etnias=[{label: 'Caucasico', value:0},{label: 'Hispano', value:1},{label: 'Asiatico', value:2}]

    const [medics,setMedics]= useState([{label:'null' , value:0}])
    const [medicsLoaded, setLoaded]=useState(true)
    const [etnia,setEtnia] = useState(etnias[0])
    const [place,setPlace] = useState (places[0])
    const [medic,setMedic] = useState(null)
    const [id, setId] = useState("")

    useEffect(() =>{
        getMedics().then((loadedMedics) => {
                setMedics(loadedMedics)
                setMedic(loadedMedics[0])
            }
        )
    },[medicsLoaded])

    const getMedics = async()=>{
        const medicsL = []
        const medicsDb = firestore().collection('medic')
        await medicsDb.get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    medicsL.push({value:doc.id,label:doc.data().name})
                })
            }
        )
        return medicsL
    }

    const handleSwitchToRegisterMedic = () =>{
       // id.length > 0 ? etnia != "No Asignado" && medic != 0 && place != "No Asignado" && navigation.navigate("register_ilustrator1") : notifyMessage("Faltan datos")
        console.log(id)
        setMedicalInformationAction({medic:medic.value,place:place.label,etnia:etnia.label,id:id})
        navigation.navigate("register_almost")
    }

    const notifyMessage = (msg) => {
    Platform.OS === 'android' ? ToastAndroid.show(msg, ToastAndroid.SHORT) : AlertIOS.alert(msg)
    }

    
    
    return (
        <SafeAreaView style={RegisterUser.reguse_cont_background}>
            <View style={RegisterUser.reguse_cont_cont}>
                <View style={RegisterUser.reguse_top}>
                    <Image source={require("../../img/ic_medic.png")}/>
                    <Text style={RegisterUser.reguse_text_top}>   DATOS HOSPITALARIOS</Text>
                </View>
                <Image style={RegisterUser.reguse_top_img} source={require("../../img/register_deco.png")}/>
            </View>        
            <View
            style={{flex:9, marginTop:50}}>
                <ScrollView  contentContainerStyle={RegisterUser.scroll} >    
                    <View style={RegisterUser.reguse_cont_regusein_inputs}>
                        <View style={{...(Platform.OS !== 'android' && {zIndex: 5000})}}>
                            <Text style={RegisterUser.reguse_text_upinput}>Médico</Text>
                            <View style={RegisterUser.reguse_picker} >
                                <CustomPicker items={medics} defaultValue={medic} setValue={setMedic} placeHolder={'Seleccione su medico'}/>                         
                            </View>
                        </View>
                        <View style={{marginTop: 25, ...(Platform.OS !== 'android' && {zIndex: 4000})}}>
                            <Text style={RegisterUser.reguse_text_upinput}>Lugar</Text>
                            <View style={RegisterUser.reguse_picker} >
                                <CustomPicker items={places} defaultValue={place} setValue={setPlace} placeHolder={'Seleccione su Lugar'}></CustomPicker>
                            </View>
                                    
                        </View>
                        <View style={{marginTop: 25, ...(Platform.OS !== 'android' && {zIndex: 3000})}}>
                            <Text style={RegisterUser.reguse_text_upinput}>Etnia</Text>
                            <View style={RegisterUser.reguse_picker}>
                                <CustomPicker items={etnias} defaultValue={etnia} setValue={setEtnia} placeHolder={'Seleccione su etnia'}/>
                            </View>
                                    
                        </View>
                        <View style={{marginTop: 25,alignSelf:'center'}}>
                            <Text style={RegisterUser.reguse_text_upinput}>Nro. historia medica</Text>
                            <TextInput onSubmitEditing={Keyboard.dismiss} keyboardType={'numeric'} onChangeText={setId} value={id} maxLength={10} placeholder="Ingrese su historia medica" placeholderTextColor="#c4c4c4" style={RegisterUser.reguse_textInput }></TextInput>
                        </View>
                        <ButtonCustomeOrange title={"Continuar"} handleFunction={handleSwitchToRegisterMedic} marginT={{marginTop: 50}}/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const mapDispatchToProps = {
    setMedicalInformationAction
}

export default connect(null,mapDispatchToProps)(RegisterMedic)

const RegisterUser = StyleSheet.create({
    reguse_drop_down_picker:{
        padding:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10, 
        borderBottomLeftRadius:10, 
        borderBottomRightRadius:10,
        height:50,
    },
    reguse_validvalue:{
        color:"red"
    },
    scroll:{
        width,
        paddingBottom: 30,
        alignItems: 'center',
        minHeight: "100%",

    },
    reguse_cont_cont:{
        width,
        justifyContent: 'center',
        position:"relative",
        flex: 1,
        marginTop:50,
        zIndex:30,
        backgroundColor:'#FFFFFF'
    },
    reguse_text_upinput:{
        color:"#AAAAAA",
        fontSize: 17,
    },
    reguse_picker:{
        marginTop: 6,
        justifyContent: 'center',
    },
    reguse_textInput:{
        marginTop: 6,
        width:320,
        height:50,
        fontSize: 17,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#E3E3E3",   
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
        backgroundColor: "#FFF",
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
    reguse_btn_medic:{
        backgroundColor: "#E3E3E3",
        width:300,
        height:50,
        padding: 10,
        borderRadius: 10,
        justifyContent:'center',
        alignContent: 'center', 
    },
})