import React,{useState,useEffect} from 'react'
import {View,StyleSheet,ScrollView,Pressable,Text,Image} from 'react-native'
import {Colors} from '../styles/Colors'
import Icon from 'react-native-vector-icons/AntDesign';
import {AvatarImage} from '../AvatarImage'
import {ButtonEditProfile} from '../Buttons/ButtonEditProfile'
import {GeneralStyle} from '../styles/GeneralStyle'
import { connect } from 'react-redux';
import {SmokeEditModal} from '../commonComponents/Modals/SmokeEditModal'

const Profile = ({navigation,userData}) => {

    const [smokeP,setSmokeP] = useState('')
    const [modal,setModal] = useState(false)


    useEffect(()=>{
        if(userData.smoke.smoke == 0){
            setSmokeP('No Fumo')
        }
        else if(userData.smoke.smoke == 1){
            setSmokeP('Si fumo')
        }
        else{
            setSmokeP(`Fume ${userData.smoke.time} años`)
        }
    },[smokeP])

    const smokeEdit = ()=>{
        setModal(true)
    }
    
    const setSmokeData = (data) =>{
        console.log('smoke: '+ JSON.stringify(data))
        console.log('modal ' + modal)
    }

    const onEdit = ()=>{
        navigation.navigate('avatar_changer')
    }

    const returnPress = () =>{
        navigation.navigate('home')
    }

    return (
        <View style={ProfileStyle.viewMain}>
            <View style={ProfileStyle.viewHeader}>
                <Pressable style={ProfileStyle} onPress={()=> returnPress()}>
                    <Icon name={'arrowleft'} color={Colors.orange} size={30}/>
                </Pressable>
            </View>
            <SmokeEditModal visibility={modal} setVisibility={setModal} setSmokeData={setSmokeData}/>
            <ScrollView contentContainerStyle={ProfileStyle.viewContainer}>
                <View style={ProfileStyle.viewImgContainer}>
                    <AvatarImage size={'big'} index={userData.avatar}/>
                    <ButtonEditProfile onPress={()=>onEdit()} color={Colors.white} backgroundColor={Colors.orange}/>
                </View>
                <Text style={GeneralStyle.text_profile_name}>{userData.name + ' ' +userData.surname}</Text>
                <View style={ProfileStyle.viewGeneralData}>
                    <View style={ProfileStyle.viewDataRow}>
                        <Text style={GeneralStyle.text_profile}>ID:</Text>
                        <Text style={GeneralStyle.text_profile_data}>{userData.id}</Text>
                    </View>
                    <View style={ProfileStyle.viewDataRow}>
                        <Text style={GeneralStyle.text_profile}>Medico:</Text>
                        <Text style={GeneralStyle.text_profile_data}>{userData.medic}</Text>
                    </View>
                    <View style={ProfileStyle.viewDataRow}>
                        <Text style={GeneralStyle.text_profile}>Lugar:</Text>
                        <Text style={GeneralStyle.text_profile_data}>{userData.place}</Text>
                    </View>
                    <View style={ProfileStyle.viewDataRow}>
                        <Text style={GeneralStyle.text_profile}>Cancer:</Text>
                        <Text style={GeneralStyle.text_profile_data}>{userData.cancer}</Text>
                    </View>
                    <View style={ProfileStyle.viewDataRow}>
                        <Text style={GeneralStyle.text_profile}>Droga:</Text>
                        <Text style={GeneralStyle.text_profile_data}>Mejoralito</Text>
                    </View>
                </View>
                <View style={ProfileStyle.viewExtraData}>
                    <Image source={require('../../img/ic_smoke.png')} style={ProfileStyle.image}/>
                    <View style={ProfileStyle.viewExtraDataDetails}>
                        <Text style={GeneralStyle.text_profile_extra_data}>Tabaquismo :</Text>
                        <Text style={GeneralStyle.text_profile_extra}>{smokeP}</Text>
                    </View>
                    <ButtonEditProfile onPress={()=>smokeEdit()} color={Colors.violet} backgroundColor={Colors.white}/>
                </View>
                <View style={ProfileStyle.viewExtraDataNoEdit}>
                    <Image source={require('../../img/ic_diabetic.png')} style={ProfileStyle.image}/>
                    <View style={ProfileStyle.viewExtraDataDetailsNoEdit}>
                        <Text style={GeneralStyle.text_profile_extra_data}>Diabetes :</Text>
                        <Text style={GeneralStyle.text_profile_extra}>Uso metformina</Text>
                    </View>
                </View>
                <View style={ProfileStyle.viewExtraDataNoEdit}>
                    <Image source={require('../../img/ic_medic.png')} style={ProfileStyle.image}/>
                    <View style={ProfileStyle.viewExtraDataDetailsNoEdit}>
                        <Text style={GeneralStyle.text_profile_extra_data}>Epoc :</Text>
                        <Text style={GeneralStyle.text_profile_extra}>Positivo</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const ProfileStyle = StyleSheet.create({
    
    viewMain:{
        height:'100%',
        width:'100%',
        flex:1,
        backgroundColor:Colors.white
    },

    viewContainer:{
        padding:'5%',
        alignContent:'center',
        alignItems:'center',
    },

    viewHeader:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:60,
        width:'100%',
        paddingHorizontal:'2%'
    },

    pressHeader:{
        height:70,
        width:70,
        borderRadius:200,
        zIndex:8000,
        color: Colors.orange
    },

    viewImgContainer:{
        flexDirection:'row',
        paddingLeft:32,
        marginBottom:'4%'
    },

    viewGeneralData:{
        marginTop:40,
        flexDirection:'column',
        borderRadius:15,
        backgroundColor:Colors.white,
        paddingHorizontal:'10%',
        paddingBottom:'10%',
        width:'90%',
        minHeight:80,
        shadowColor:'black',
        elevation:15,
    },

    viewDataRow:{
        marginTop:'10%',
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        borderBottomColor: Colors.textGrey,
        borderBottomWidth: 2
    },

    viewExtraData:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        padding:'3%',
        paddingHorizontal:'5%',
        marginTop:'12%',
        width:'90%',
        height:90,
        borderRadius:15,
        backgroundColor:Colors.violet,
        shadowColor:'black',
        elevation:15,
    },

    viewExtraDataNoEdit:{
        alignItems:'center',
        flexDirection:'row',
        padding:'3%',
        paddingHorizontal:'5%',
        marginTop:'12%',
        width:'90%',
        height:90,
        borderRadius:15,
        backgroundColor:Colors.violet,
        shadowColor:'black',
        elevation:15,
    },

    image:{
        height:50,
        width:50,
        resizeMode:'contain'
    },

    viewExtraDataDetails:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        height:'100%'
    },

    viewExtraDataDetailsNoEdit:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        height:'100%',
        marginLeft:'10%'
    }
    
})

const mapStateToProps = (state) => {
    return {
        userData: state.user_data
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)


