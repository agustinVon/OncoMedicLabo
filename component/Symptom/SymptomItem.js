import React,{useState} from 'react'
import {Pressable, View, Text} from 'react-native'
import {GeneralStyle} from '../styles/GeneralStyle'
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../styles/Colors'
import { LayoutAnimation } from 'react-native';
import { Platform } from 'react-native';
import { UIManager } from 'react-native';

export const SymptomItem = ({symptom,deleteSymptom,editSymptom,key}) =>{

    if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const [pressed, setPress] = useState(false)

    const toggle = () =>{
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                300,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.opacity
            )
        )
        setPress(!pressed)
    }

    return(
        <View>
            {console.log(symptom)}
            {pressed?
            <Pressable style={GeneralStyle.symptom_item_pressed}
            onPress={()=>toggle()}>
                <View style={{flexDirection:'row',flex:1, width:'100%', justifyContent:'space-between',alignContent:'center'}}>
                    <Text style={GeneralStyle.symptom_item_text} > { symptom.symptom } </Text>
                    <Pressable style={GeneralStyle.symptom_item_logo} onPress={() => deleteSymptom(symptom.symptom)}>
                        <Icon name={'delete'} color={'black'} size={20}/>
                    </Pressable>
                </View>
                <View style={{flexDirection:'row' ,flex:1,marginTop:10 , width:'100%', justifyContent:'space-between',alignContent:'center'}}>
                    <Text style={GeneralStyle.symptom_item_miniText} > Grado {symptom.grade} </Text>
                    <Pressable style={GeneralStyle.symptom_item_logo} onPress={() => editSymptom(symptom.symptom,symptom.grade)}>
                        <Icon name={'edit'} color={'black'} size={20}/>
                    </Pressable>
                </View>
            </Pressable>
            :
            <Pressable style={GeneralStyle.symptom_item_not_pressed}
            onPress={()=>toggle()}>
                <Text style={GeneralStyle.symptom_item_text} > { symptom.symptom } </Text>
                <Pressable style={GeneralStyle.symptom_item_logo} onPress={() => deleteSymptom(symptom.symptom)}>
                        <Icon name={'delete'} color={'black'} size={20}/>
                    </Pressable>
            </Pressable>
            }
        </View>
    )
    
}