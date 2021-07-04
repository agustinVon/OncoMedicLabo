import React,{useEffect,useState} from 'react'
import {Image, StyleSheet} from 'react-native'
import firestore, { firebase } from '@react-native-firebase/firestore';


export const AvatarImage = ({index,size}) => {

    const [avatarHasL, setAvatarHasl]= useState(false)
    const [avatars, setAvatars]=useState([])
    const trueIndex = index-1

    function compareAvatars(a,b){
        return (a.id - b.id)
    }

    const getAvatars = async()=>{
        const AvatarsLoaded = []
        const AvatarsDb = firestore().collection('avatars')
        await AvatarsDb.get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    AvatarsLoaded.push(doc.data())
                })
            })
            AvatarsLoaded.sort(compareAvatars)
        return AvatarsLoaded
    }

    if(!avatarHasL){
        getAvatars().then((loadedAvatars)=>{
            setAvatars(loadedAvatars)
            setAvatarHasl(true)
            console.log('has loaded')
        })
    }  

    if(avatarHasL && trueIndex < avatars.length){
        
        console.log()
        return <Image style={size=='small'?AvatarStyle.small:size=='medium'?AvatarStyle.medium:AvatarStyle.big} source={{uri:avatars[trueIndex].url}}></Image>
        
    }
    else{
        return <Image style={size=='small'?AvatarStyle.small:size=='medium'?AvatarStyle.medium:AvatarStyle.big} source={require('../img/avatar/defaultAvatar.png')}></Image>
    }
}

const AvatarStyle= StyleSheet.create({
   small:{
        height:50,
        width:50
   },
   medium:{
        height: 80,
        width: 80,
   },
    big:{
        height:120,
        width:120
    }
})
