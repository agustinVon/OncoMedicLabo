import React from 'react'
import {View,StyleSheet,ScrollView,Pressable} from 'react-native'
import {Colors} from '../styles/Colors'
import Icon from 'react-native-vector-icons/AntDesign';
import {AvatarImage} from '../AvatarImage'
import {ButtonEditProfile} from '../Buttons/ButtonEditProfile'

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
                    <ButtonEditProfile onPress={()=>onEdit()}/>
                </View>
                <View style={ProfileStyle.viewGeneralData}>
                    
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
        paddingLeft:32
    },

    viewGeneralData:{
        marginTop:40,
        flexDirection:'column',
        shadowColor:Colors.black,
        shadowOffset:{width:0,height:0},
        shadowOpacity:1,
        shadowRadius:40,
        elevation:6,
        borderRadius:20,
        backgroundColor:Colors.white,
        padding:'10%',
        width:'90%',
        minHeight:80
    }
    
})

export default (Profile)


