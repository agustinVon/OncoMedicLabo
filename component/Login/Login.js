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
import {PasswordField} from '../commonComponents/Fields/PasswordField'
import {CustomAlert} from '../commonComponents/Alerts/Alert'
import {CommonActions} from '@react-navigation/native';
import {MailField} from '../commonComponents/Fields/MailField'
import { hashPassword } from '../PasswordHash.js';


const {width} = Dimensions.get("window")
const {height} = Dimensions.get("window")

const Login = ({navigation, setUser, logoutUser}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [email,setEmail]=useState("")
    const [password,setPassword] = useState("")
    const [firstTry, setFirstTry] = useState(true)
    const [isLoading,setIsLoading] = useState(false)

    useFocusEffect(
        React.useCallback(()=>{
            console.log('user loaded out')
            logoutUser()
        })
    )

    const handleSwitchToRegister = () =>{
        navigation.navigate('register')
    }

    const switchToHome = async () =>{
        setFirstTry(false)
        if(email !== '' || password !== ''){
            hashPassword(password,login)
        }
    }

    const login = async (hashedPassword) =>{
        const userCollection = firestore().collection('users')
        await userCollection.where('email' , '==' , email).where('password' , '==' , hashedPassword).get().then(
            (snapshot) => {
                if(snapshot.size>0){
                    snapshot.forEach(async (doc) =>{
                        if(doc.data().status === 'Pendiente'){
                            setIsLoading(false)
                            navigation.navigate('wait_screen')
                        }else{
                            setUser(doc.data())
                            setIsLoading(false)
                            navigation.navigate('home')
                            userCollection.doc(doc.id).update({
                                lastConnection: new Date()
                            })
                        }   
                    })
                }
                else{
                    setIsLoading(false)
                    CustomAlert('Error', 'Usuario o contraseña incorrecta')
                }
            }
        )
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
                    <Text style={LoginStyle.log_text_in}>Sesión</Text>
                </View>
                <View style={LoginStyle.log_cont_login_inputs}>
                    <View style={{alignSelf:'center'}}>
                        <Text style={LoginStyle.log_text_upinput}>Email</Text>
                        <MailField marginTop={0} setValue={setEmail} incomplete={!firstTry && email === ''}/>
                    </View>
                    
                    <View style={{marginTop: 20, alignSelf:'center'}}>
                        <Text style={LoginStyle.log_text_upinput}>Constraseña</Text>
                        <PasswordField setValue={setPassword} failToggle={false} incomplete={!firstTry && password === ''}/>
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
        alignSelf:'center',
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
        alignSelf:'center',
    },
    log_cont_login_inside:{
        flexDirection: 'row',  
        alignItems:'center',
    },
    log_cont:{
        width,
        flex: 1,
        height:"100%",
        flexDirection: 'column',
        backgroundColor:"#FFFFFF",
        alignItems: 'center',
        alignSelf:'center'
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