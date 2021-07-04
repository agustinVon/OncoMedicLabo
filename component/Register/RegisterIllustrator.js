import React,{useState} from 'react'
import { StyleSheet, SafeAreaView,Image,Dimensions,View,Text,Pressable} from 'react-native'
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {CustomAlert} from '../commonComponents/Alerts/Alert';
import {DisclaimerModal} from '../commonComponents/Modals/DisclaimerModal'
import {ActivityIndicator} from 'react-native-paper';

const {width} = Dimensions.get("window")

const RegisterIllustrator = ({userData,goHomeFunction,err}) => {

    const [disclaimer,setDisclaimer]=useState(false)
    const [isLoading,setLoading] = useState(false)

    const pushToDatabase = async (user) =>{
        setLoading(true)
        const userCollection = firestore().collection('users')
        await userCollection.where('id','==',user.id).where('email','==',user.email).get().then(
            (snapshot) => {
                if(snapshot.size === 0){
                    userCollection.add({
                        ...user,
                        registerDate: new Date(),
                        lastConnection: new Date()
        
                    }).then(
                        setLoading(false),
                        console.log('User added!'),
                        goHomeFunction()
                    )
                }else{
                    setLoading(false),
                    CustomAlert('Error', 'Usuario ya existe')
                }
            })
    }

    const checkERR= () =>{
        err?CustomAlert('ERROR','Ingrese valores validos'):pushToDatabase(userData)
    }

    return (
        <SafeAreaView style={RegisterIllustratorStyle.regilus_const_background}>
            <Pressable style={RegisterIllustratorStyle.regilus_const_background} onPress={()=>setDisclaimer(true)}>
                <View style={RegisterIllustratorStyle.regilus_deco}>
                    <Image style={RegisterIllustratorStyle.regilus_image} resizeMode={"contain"} source={require("../../img/back_ilu1.png")}/>
                    <Image style={RegisterIllustratorStyle.regilus_image2} resizeMode={'stretch'} source={require("../../img/back_ilu2.png")}/>
                    <Image style={RegisterIllustratorStyle.regilus_image3} resizeMode={"cover"} source={require("../../img/back_ilu3.png")}/>
                    <Text style={RegisterIllustratorStyle.regilus_text_cont}>Haz click para continuar</Text>    
                </View>
            
                <View style={RegisterIllustratorStyle.regilus_cont_ilustext}>
                    <Text style={RegisterIllustratorStyle.regilus_text}>REGISTRO</Text>
                    <Text style={RegisterIllustratorStyle.regilus_text}>TERMINADO!</Text>
                    <Image style={RegisterIllustratorStyle.regilus_ilus} resizeMode={"cover"} source={require("../../img/illust_terminado.png")}/>
                </View>

                {isLoading ?
                <View style={RegisterIllustratorStyle.loading_screen}>
                    <ActivityIndicator animating={true} color={"#FFFFFF"} size='large' />
                </View>
                : null
                }
                
            </Pressable>
            <DisclaimerModal visibility={disclaimer} setVisibility={setDisclaimer} contFunction={checkERR}/>
            
            
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.user_data
    }
}

export default connect(mapStateToProps)(RegisterIllustrator)

const RegisterIllustratorStyle = StyleSheet.create({
    loading_screen:{
        position:'absolute',
        justifyContent:'center',
        zIndex:100,
        flex:1,
        height:'100%',
        width:'100%',
        backgroundColor:'#707070',
        opacity:0.7, 
    },
    regilus_const_background:{
        width,
        height:"100%",
        backgroundColor: "#B189F8",
        justifyContent: 'center',
        alignItems: 'center',
    },
    regilus_text_cont:{
        color:"#efefef",
        fontSize: 18,
        alignSelf: 'center',
        marginBottom:40
    },
    regilus_text:{
        color:"white",
        fontWeight: 'bold',
        fontSize: 35,
    },
    regilus_deco:{
        width,height:"100%",
        position: "relative",
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    regilus_image:{
        width,
        height:"70%",
        position:"absolute"
    },
    regilus_image2:{
        width,
        height:"50%",
        position:"absolute"
    },
    regilus_image3:{
        width,
        height:"20%",
        position:"absolute"
    },
    regilus_ilus:{
        marginTop: 40,
        width:280,
        height:250,
        position:"relative",
        alignSelf: 'center',
        marginBottom: 120,
    },
    regilus_cont_ilustext:{
        position:"absolute",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
})
