import React,{useState, useEffect} from 'react'
import {View,Text,TextInput, Keyboard} from 'react-native'
import {GeneralStyle} from '../../styles/GeneralStyle'

export const IncorrectField = ({fail,setValue,value,placeHolder,keyboardType,message,ifOnFocus=null, lock = false}) => {

    const [text,setText] = useState(value)

    useEffect(()=>{
        if(lock){
            setText(value)
        }
        setValue(text)
    },[text])

    useEffect(()=>{
        setText(value)
    },[value])



    return(
        <View>
            {console.log('value inside =' + text)}
            <View style={!fail ? GeneralStyle.field_multiple : GeneralStyle.field_incorrect}>
                <TextInput onChangeText={setText} 
                    onSubmitEditing={Keyboard.dismiss}
                    value={text}
                    keyboardType={keyboardType} placeholderTextColor="#c4c4c4" 
                    placeholder= {placeHolder}
                    style={ GeneralStyle.field_text}
                    onFocus={()=>(ifOnFocus!==null ? ifOnFocus():null)}
                    editable={!lock}/>
            </View>
            {
                fail  && <Text style={{color: 'red'}}>{message}</Text>
            }
        </View>
        
    )
}