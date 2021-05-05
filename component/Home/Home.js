import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView,View,Text,StyleSheet,Dimensions,Image,Button } from 'react-native'
import {ButtonCustomeHome} from '../Buttons/ButtonCustomeHome.js'
import { connect } from 'react-redux'
import {AvatarImage} from '../AvatarImage'
import {ButtonCalendarHome} from '../Buttons/ButtonCalendarHome'
import { ScrollView } from 'react-native'
import { ButtonCustomeOrange } from '../Buttons/ButtonCustomeOrange.js'
import {ButtonExtra} from '../Buttons/ButtonExtra'


const {width} = Dimensions.get('window')

const Home = ({navigation, avatarData, name}) => {

    const [avatar,setAvatar] = useState(avatarData)
    const [morOpt,setMorOpt]=useState(false)
    console.log(avatar)

    useEffect(()=>{
        setAvatar(avatarData)
        console.log(avatar)
    },[avatarData])

    const switchDailyRegister = () =>{
        navigation.navigate("registro_diario")
    }

    const switchSymptomsRegister = () =>{
        navigation.navigate('registro_sintoma')
    }

    const switchAvatarChanger = () => {
        navigation.navigate('avatar_changer')
    }

    const switchCalendar = () => {
        navigation.navigate('calendar')
    }

    return (
        <SafeAreaView style={HomeStyle.h_const_background}>
            <View style={HomeStyle.h_back_img}>
                <View  style={HomeStyle.h_back_img}>
                    <Image style={HomeStyle.h_img}source={require('../../img/back_home1.png')}/>
                    <View style={HomeStyle.h_img_view}/>
                </View>
                <View  style={HomeStyle.h_back_img}>
                    <Image style={HomeStyle.h_img}source={require('../../img/back_home2.png')}/>
                    <View style={HomeStyle.h_img_view2}/>
                </View>            
                
            </View>
            <View style={HomeStyle.h_header}>
                <Pressable onPress={switchAvatarChanger} style={HomeStyle.h_header_img}>
                    <AvatarImage index={avatar} size={'small'}></AvatarImage>
                </Pressable>
                <Text style={HomeStyle.h_txt_hola}>Hola,</Text>
                <Text style={HomeStyle.h_txt_name}>{name}</Text>
            </View>

            <View style={HomeStyle.h_scroll_buttons}>
                {morOpt?
                <View style={{alignItems:'center'}}>
                    <ButtonCalendarHome handleFunction={()=>switchCalendar()}/>
                    <ButtonExtra handleFunction={()=>setMorOpt(!morOpt)}/>
                </View>
                :
                <View style={{alignItems:'center'}}>
                <ButtonCustomeHome title={"Como te encuentras hoy?"} orientation={"row"} illustration={"RD"} text={"Completa y cuentanos como te has sentido"} color={"#A476FC"} handlePress={switchDailyRegister}/>
                <ButtonCustomeHome title={"No te encuentras bien?"} orientation={"row-reverse"} text={"Completa y cuentanos que te sucede!"} color={"#7685FC"} handlePress={switchSymptomsRegister}/>
                <ButtonExtra handleFunction={()=>setMorOpt(!morOpt)}/>
                </View>
                }
            </View>

            <Pressable style={HomeStyle.h_btn_logout} onPress={()=>{navigation.navigate('login')}}>
                <Text style={HomeStyle.h_txt_logout}>Log out</Text>
            </Pressable>
        </SafeAreaView>
    )
}
const HomeStyle = StyleSheet.create({
    h_scroll_buttons:{
        marginTop:'5%',
        height:'60%',
        width:'100%',
        alignContent:'center',
        alignItems:'center'
    },
    h_txt_logout:{
        color:'#FFFFFF'
    },
    h_btn_logout:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:'6%',
        bottom:'4%',
        width:'20%',
        height:'5%',
        borderRadius:10,
        backgroundColor:"#FFB13A",
    },
    h_txt_hola:{
        marginTop:20,
        marginLeft: 20,
        fontSize: 25, 
    },
    h_txt_name:{
        fontSize:25,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    h_header_img:{
        width:50,
        height:50
    },
    h_header:{
        justifyContent: 'center',
        padding: 10,
        width,
        height:180,
        position: "absolute",
        top: 0,
        marginLeft:40
    },
    h_img_view:{
        height:320,
        width:"100%",
        backgroundColor: "#F7F3FE",
    },
    h_img_view2:{
        height:250,
        width:"100%",
        backgroundColor: "#EEE6FD",
    },
    h_const_background:{
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    h_back_img:{
        width,
        height:"100%",
        position: "absolute",
        justifyContent: 'flex-end',
    },
    h_img:{
        width,
        position: "relative",
    }
})

const mapStateToProps = (state) => {
    return {
        avatarData: state.user_data.avatar,
        name: state.user_data.name
    }
}

export default connect(mapStateToProps)(Home)
