import React from 'react'
import {View,StyleSheet,ScrollView,Pressable,Text,Image} from 'react-native'
import {Colors} from '../styles/Colors'
import Icon from 'react-native-vector-icons/AntDesign';
import {AvatarImage} from '../AvatarImage'
import {ButtonEditProfile} from '../Buttons/ButtonEditProfile'
import {GeneralStyle} from '../styles/GeneralStyle'

const Profile = ({navigation,userData}) => {

    const onEdit = ()=>{
        navigation.navigate('avatar_changer')
    }

    return (
        <View style={ProfileStyle.viewMain}>
            <View style={ProfileStyle.viewHeader}>
                <Pressable style={ProfileStyle} onPress={()=> returnPress()}>
                    <Icon name={'arrowleft'} color={Colors.orange} size={30}/>
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={ProfileStyle.viewContainer}>
                <View style={ProfileStyle.viewImgContainer}>
                    <AvatarImage size={'big'} index={1}/>
                    <ButtonEditProfile onPress={()=>onEdit()} color={Colors.white} backgroundColor={Colors.orange}/>
                </View>
                <Text style={GeneralStyle.text_profile_name}>Jorge Carlos</Text>
                <View style={ProfileStyle.viewGeneralData}>
                    <View style={ProfileStyle.viewDataRow}>
                        <Text style={GeneralStyle.text_profile}>ID:</Text>
                        <Text style={GeneralStyle.text_profile_data}>12345678</Text>
                    </View>
                    <View style={ProfileStyle.viewDataRow}>
                        <Text style={GeneralStyle.text_profile}>Medico:</Text>
                        <Text style={GeneralStyle.text_profile_data}>Miguel Manglio</Text>
                    </View>
                    <View style={ProfileStyle.viewDataRow}>
                        <Text style={GeneralStyle.text_profile}>Lugar:</Text>
                        <Text style={GeneralStyle.text_profile_data}>Hospital Austral</Text>
                    </View>
                    <View style={ProfileStyle.viewDataRow}>
                        <Text style={GeneralStyle.text_profile}>Cancer:</Text>
                        <Text style={GeneralStyle.text_profile_data}>Colon</Text>
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
                        <Text style={GeneralStyle.text_profile_extra}>Fume por 5 años</Text>
                    </View>
                    <ButtonEditProfile onPress={()=>onEdit()} color={Colors.violet} backgroundColor={Colors.white}/>
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

export default (Profile)


