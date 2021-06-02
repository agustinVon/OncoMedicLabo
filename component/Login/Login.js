import React,{useEffect, useState} from 'react'
import {SafeAreaView,Image,StyleSheet,Dimensions,View,Text,TextInput,Pressable,Modal,Button } from 'react-native'
import {ButtonCustomeOrange} from '../Buttons/ButtonCustomeOrange.js'
import firestore from '@react-native-firebase/firestore';
import {setUser, logoutUser} from '../../reduxStore/actions/registerAction'
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import {useFocusEffect} from '@react-navigation/native'
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {CommonActions} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';


const {width} = Dimensions.get("window")
const {height} = Dimensions.get("window")

const Login = ({navigation, setUser}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [id,setId]=useState("")
    const [password,setPassword] = useState("")
    const [passwordHidden, setHidPas] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const [notificationsAtuh,setNotif] = useState(false)

    useFocusEffect(
        React.useCallback(()=>{
            logoutUser()
        })
    )

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
        if (enabled) {
          console.log('Authorization status:', authStatus);
          setNotif(true)
        }
    }

    

    useEffect(()=>{
        if(!notificationsAtuh){
            requestUserPermission()
        }
    },[notificationsAtuh])

    const handleSwitchToRegister = () =>{
        navigation.navigate('register')
    }

    const switchToHome = async () =>{
        setIsLoading(true)
        return await firestore()
        .collection('testUsers')
        .doc(id).get().then((doc)=>{
            if(doc.exists && doc.data().password==password && doc.data().status=='Activo'){
                setUser(doc.data())
                setIsLoading(false)
                navigation.navigate('home')
            }
            else if(doc.exists && doc.data().password==password && doc.data().status!='Activo'){
                setIsLoading(false)
                navigation.navigate('wait_screen')
            }
            else{
                setIsLoading(false)
                Alert.alert(
                    "Error",
                    "Usuario no existe o contraseña incorrecta",
                    [
                        {
                            text: 'OK',
                        }
                    ]
                )
            }
        }).catch(err =>{
            Alert.alert(
                "Error",
                "No se pudo conectar a base de datos",
                [
                    {
                        text: 'OK',
                    }
                ]
            )
        })
    }

    const emergency = async () =>{
        setIsLoading(true)
        return await firestore()
        .collection('users')
        .doc('11111111').get().then((doc)=>{
            console.log(doc.data())
            setUser(doc.data())
            setIsLoading(false)
            navigation.navigate('registro_sintoma')
        }).catch(err =>{
            Alert.alert(
                "Error",
                "No se pudo conectar a base de datos",
                [
                    {
                        text: 'OK',
                    }
                ]
            )
        })
    }

    return (
        <SafeAreaView style={LoginStyle.log_cont}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Proximamente va a funcionar</Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Genial!</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            
            <View style={height<700?LoginStyle.log_top_color2:LoginStyle.log_top_color}/>
            <Image resizeMode={height<700 ?"stretch":"cover"} style={height<700?LoginStyle.log_img_deco2:LoginStyle.log_img_deco1} source={require('../../img/loging_deco.png')}/>
            <View style={LoginStyle.log_cont_login}>
                <View style={LoginStyle.log_cont_login_inside}>
                    <Text style={LoginStyle.log_text_log}>Iniciar</Text>
                    <Text style={LoginStyle.log_text_in}>Sesion</Text>
                </View>
                <View style={LoginStyle.log_cont_login_inputs}>
                    <View>
                        <Text style={LoginStyle.log_text_upinput}>ID de paciente</Text>
                        <View style={LoginStyle.log_text_container}>
                            <TextInput onChangeText={setId} placeholderTextColor="#c4c4c4" placeholder="Ingrese su ID de paciente" style={LoginStyle.log_textInput}></TextInput>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={LoginStyle.log_text_upinput}>Constraseña</Text>
                        <View style={LoginStyle.log_text_container}>
                            <TextInput secureTextEntry={passwordHidden} onChangeText={setPassword} placeholderTextColor="#c4c4c4" placeholder="Ingrese su contraseña" style={LoginStyle.log_textInput}></TextInput>
                            <Icon.Button name={passwordHidden?'eye':'eyeo'}  color={'#AAAAAA'} style={LoginStyle.log_icon_style} onPress={()=>setHidPas(!passwordHidden)}/>
                        </View>
                    </View>
                    <View style={LoginStyle.log_cont_olvcont}>
                        <Pressable style={{width:300}} onPress={() => setModalVisible(true)}>
                            <Text style={LoginStyle.log_olvcont}>
                                ¿Olvidaste la contraseña?
                            </Text>
                        </Pressable>
                    </View>
                    {
                        //TEST SWITCHHOME
                    }
                    <ButtonCustomeOrange  title="Iniciar sesion" handleFunction={switchToHome}/>
                    <Button onPress={emergency} title={'Se encuentra en una emergencia?'}/>
                    <Pressable style={LoginStyle.log_cont_register} onPress={handleSwitchToRegister}>
                        <Text>No tienes cuenta?</Text>
                        <Text style={LoginStyle.log_text_register}> Registrate!</Text>
                    </Pressable>
                </View>
            </View>
            {isLoading && 
            <View style={LoginStyle.log_loading}>
            <ActivityIndicator animating={true} color={"#FFFFFF"} size='large' />
            </View>}
        </SafeAreaView>
        
    )
}

const LoginStyle = StyleSheet.create({
    log_icon_style:{
        backgroundColor:'#E3E3E3',
        flex:1,
    },
    log_loading:{
        position: 'absolute',
        backgroundColor:'#707070',
        opacity:0.7, 
        width:'100%',
        height:'110%',
        justifyContent:'center'
    },
    log_text_register:{
        fontWeight: 'bold',
    },
    log_cont_register:{
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },
    log_btn_login:{
        height:50,
    },
    log_cont_olvcont:{
        width:300,
        justifyContent: 'flex-end',
    },
    log_olvcont:{
        fontSize: 12,
        marginTop: 10,
        textAlign: 'right'
    },
    log_text_upinput:{
        color:"#CCCCCC",
        fontSize: 17,
    },
    log_textInput:{

        flex:5,
        height:50,
        width:20,
        fontSize: 17,
        borderRadius: 10,
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
    log_cont_login_inputs:{
        flexDirection: 'column',
        width:300,
        marginTop: 20,
    },
    log_top_color:{
        backgroundColor:"#B189F8",
        height:80,
        width
    },
    log_top_color2:{
        backgroundColor:"#B189F8",
        height:40,
        width
    },
    log_text_log:{
        fontSize: 25,
        fontWeight: 'bold',
    },
    log_text_in:{
        fontSize: 25,
        fontWeight: 'bold',
        color: "#B189F8",
        marginLeft: 5,
    },
    log_img_deco1:{
        width:"100%",
       height:150
    },
    log_img_deco2:{
        width: "100%",
        height:100,
    },
    log_cont_login:{
        marginTop: 20,
    },
    log_cont_login_inside:{
        flexDirection: 'row',  
    },
    log_cont:{
        width,
        flex: 1,
        height:"100%",
        flexDirection: 'column',
        backgroundColor:"#FFFFFF",
        alignItems: 'center',
    }
})

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "hsla(175, 75%, 0%, 0.15)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width:150
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#B189F8",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const mapDispatchToProps = {
    setUser,
    logoutUser
}

export default connect(null,mapDispatchToProps) (Login)