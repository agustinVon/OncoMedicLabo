import React, {useState, useEffect} from 'react'
import {View,Text,TextInput} from 'react-native'
import {GeneralStyle} from '../../styles/GeneralStyle'
import {IncorrectField} from './IncorrectField'

export const MailField = ({setValue,incomplete}) => {

    const [email, setEmail]= useState('')
    const [incorrect, setIncorrect] = useState(false)

    useEffect(() => {
        const email_aux = email;
        if(email_aux.length >= 1){
            email_aux.includes("@") ? setIncorrect(false) : setIncorrect(true)
        }
        else{
            setIncorrect(false)
        }
        console.log('incorrecto ' +incorrect)
        setValue(email)
    }, [email])

    return(
        <IncorrectField  fail={(incorrect || incomplete)} 
            value={email} setValue={setEmail} 
            placeHolder={'Ingrese su email'} title={'Email'}
            keyboardType={'email-address'} message={incomplete?'Campo incompleto' : 'Email no valido'}/>
    )
}