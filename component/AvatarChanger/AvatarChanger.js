import React,{useState, useEffect} from 'react'
import { ScrollView } from 'react-native'
import { Pressable } from 'react-native'
import { SafeAreaView,View,Text,StyleSheet,Dimensions,Image } from 'react-native'
import { connect } from 'react-redux'
import {ButtonAvatarSelection} from '../Buttons/ButtonAvatarSelection'
import {setAvatarAction} from '../../reduxStore/actions/registerAction'
import {AvatarImage} from '../AvatarImage'
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../styles/Colors'
import Icon from 'react-native-vector-icons/AntDesign';
import {notifyMessage} from '../commonComponents/Modals/Notification'

const AvatarChanger = ({navigation,avatarData,id,setAvatarAction}) => {

    const [avatar,setAvatar] = useState(avatarData)
    const [avatarSelected,setAvatarSelected] = useState(avatarData)

    const updateToFireStore= async () =>{

        const userCollection = firestore().collection('users')
        await userCollection.get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    if(id === doc.data().id){
                        userCollection.doc(doc.id).update({
                            avatar: avatar
                        })
                    }
                })
            })
    }

    useEffect(()=>{
        if(avatar!=avatarData){
            notifyMessage('Su avatar fué editado exitosamente')
            setAvatarAction({avatar:avatar})
            updateToFireStore()
        }
    },[avatar])

    const returnPress = () =>{
        navigation.navigate("home")
    }

    return (
        <SafeAreaView style={AvatarChangerStyle.avc_const_background}>
            <View style={AvatarChangerStyle.avc_back_img}>
                <View  style={AvatarChangerStyle.avc_back_img}>
                    <Image style={AvatarChangerStyle.avc_img} resizeMode={'stretch'} source={require('../../img/back_home1.png') }/>
                    <View style={AvatarChangerStyle.avc_img_view}/>
                </View>
                <View  style={AvatarChangerStyle.avc_back_img}>
                    <Image style={AvatarChangerStyle.avc_img} resizeMode={'stretch'} source={require('../../img/back_home2.png')}/>
                    <View style={AvatarChangerStyle.avc_img_view2}/>
                </View>              
            </View>

            <View style={AvatarChangerStyle.avc_return_buttonContainer}>
                <Pressable style={AvatarChangerStyle.avc_return_button} onPress={()=> returnPress()}>
                    <Icon name={'arrowleft'} color={Colors.orange} size={30}/>
                </Pressable>
            </View>
            
            <View zIndex={10} style={AvatarChangerStyle.avc_main_view}>
                <AvatarImage index={avatarSelected} size={'big'}></AvatarImage>
                <View style={{marginTop:40}}>
                    <Pressable onPress={() => setAvatar(avatarSelected)} style={AvatarChangerStyle.avc_change_btn}>
                        <Text style={AvatarChangerStyle.avc_change_btn_txt}>Cambiar</Text>
                    </Pressable>
                </View>
                <ScrollView style={AvatarChangerStyle.avc_scroll_view}>
                <View style={AvatarChangerStyle.avc_row}>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(1)} avatarImage={1}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(2)} avatarImage={2}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(3)} avatarImage={3}></ButtonAvatarSelection>
                </View>
                <View style={AvatarChangerStyle.avc_row}>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(4)} avatarImage={4}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(5)} avatarImage={5}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(6)} avatarImage={6}></ButtonAvatarSelection>
                </View>
                <View style={AvatarChangerStyle.avc_row}>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(7)} avatarImage={7}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(8)} avatarImage={8}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(9)} avatarImage={9}></ButtonAvatarSelection>
                </View>
                <View style={AvatarChangerStyle.avc_row}>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(10)} avatarImage={10}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(11)} avatarImage={11}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(12)} avatarImage={12}></ButtonAvatarSelection>
                </View>
                <View style={AvatarChangerStyle.avc_row}>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(13)} avatarImage={13}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(14)} avatarImage={14}></ButtonAvatarSelection>
                    <ButtonAvatarSelection handleFunction={()=>setAvatarSelected(15)} avatarImage={15}></ButtonAvatarSelection>
                </View>
                </ScrollView>
                
            </View>


        </SafeAreaView>
    )
}

const AvatarChangerStyle = StyleSheet.create({

    avc_const_background:{
        flex: 1,
        height:"100%",
        width:'100%',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    avc_back_img:{
        height:"100%",
        width:"100%",
        position: "absolute",
        justifyContent: 'flex-end',
    },
    avc_img:{
        width:'100%',
        position: "relative",
    },
    avc_img_view:{
        height:320,
        width:"100%",
        backgroundColor: "#F7F3FE",
    },
    avc_img_view2:{
        height:250,
        width:"100%",
        backgroundColor: "#EEE6FD",
    },
    avc_return_button:{
        height:70,
        width:70,
        borderRadius:200,
        zIndex:8000,
        color: "#FFFFFF"
    },
    avc_return_buttonContainer:{
        position: 'absolute',
        top: 0,
        left:0,
        marginTop:20,
        marginLeft: 20,
        height:40,
        width:40,
        borderRadius:0,
        color: Colors.orange
    },
    avc_main_view:{
        position: 'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    avc_main_avatar:{
        width:120,
        height:120,
    },
    avc_change_btn:{
        height:50,
        backgroundColor: "#FFB13A",
        borderRadius: 10,
        justifyContent:'center',
        width: 200
    },
    avc_change_btn_txt:{
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    avc_scroll_view:{
        marginTop:40,
        marginBottom:40,
        width: '100%',
        flex:1,

    },
    avc_row:{
        justifyContent: 'space-evenly',
        flexDirection:'row'
    }
})

const mapStateToProps = (state) => {
    return {
        avatarData: state.user_data.avatar,
        id: state.user_data.id
    }
}

const mapDispatchToProps = {
    setAvatarAction
}

export default connect(mapStateToProps,mapDispatchToProps)(AvatarChanger)
