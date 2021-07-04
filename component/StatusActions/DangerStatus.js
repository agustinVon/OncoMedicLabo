import React from 'react'
import { StyleSheet, SafeAreaView,Image,Dimensions,View,Text,Pressable} from 'react-native'
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get("window")

export const DangerStatus = ({route,navigation}) => {


    return (
        <SafeAreaView style={WaittinAStyle.regilus_const_background}>
            <Pressable style={WaittinAStyle.regilus_const_background} onPress={()=>navigation.navigate('home')}>
                <View style={WaittinAStyle.regilus_deco}>
                    <Image style={WaittinAStyle.regilus_image} resizeMode={"contain"} source={require("../../img/back_ilu1.png")}/>
                    <Image style={WaittinAStyle.regilus_image2} resizeMode={"contain"} source={require("../../img/back_ilu2.png")}/>
                    <Image style={WaittinAStyle.regilus_image3} resizeMode={"cover"} source={require("../../img/back_ilu3.png")}/>
                    <Text style={WaittinAStyle.regilus_text_cont}>Haz click para continuar</Text>    
                </View>
            
                <View style={WaittinAStyle.regilus_cont_ilustext}>
                    <Text style={WaittinAStyle.regilus_text}>SE SUGIERE SU VISITA</Text>
                    <Text style={WaittinAStyle.regilus_text}>A UN MEDICO</Text>
                    
                    <Image style={WaittinAStyle.regilus_ilus} resizeMode={"stretch"} source={require("../../img/sintomas_img.png")}/>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}



const WaittinAStyle = StyleSheet.create({
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
        fontSize: 32,
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
         width:310,
        height:230,
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
