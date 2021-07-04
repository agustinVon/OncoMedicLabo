import React from 'react'
import { Pressable,Image,View,Text,StyleSheet } from 'react-native'

export const ButtonCustomeHome = ({color,illustration,title,text,orientation,handlePress}) => {
    return (
        <Pressable onPress={handlePress} style={{...BCHStyle.bch_back_cont, backgroundColor:color,flexDirection:orientation}}>
            <View >
                <Text style={[BCHStyle.bch_tile,illustration != "RD" && BCHStyle.bch_textRight]}>{title}</Text>
                <Text style={[BCHStyle.bch_text,illustration != "RD" && BCHStyle.bch_textRight]}>{text}</Text>
            </View>
            <View> 
                <Image source={illustration =="RD" ? require('../../img/illus_btn_menu_1.png'):require('../../img/sintomas_icon.png')}/>
            </View>
        </Pressable>
    )
}


const BCHStyle = StyleSheet.create({
    bch_tile:{
        width:180,
        color:"white",
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 8,
    },
    bch_textRight:{
        textAlign: 'right'
    },
    bch_text:{
        width:180,
        color:"white",
        fontSize: 12,
    },
    bch_back_cont:{
        width:330,
        height:140,
        borderRadius: 30,
        padding: 18,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40,
    }
}) 
