import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { View } from 'react-native'
import { GeneralStyle } from '../styles/GeneralStyle'
import { SymptomItem } from './SymptomItem'
import { connect } from 'react-redux'
import { setSymptomRedux } from '../../reduxStore/actions/symptomActions'
import { render } from 'react-dom'
import { Pressable } from 'react-native'
import { Text } from 'react-native'

const SymptomContainer = ({symptoms, setSymptomRedux, editSymp}) =>{

    const [arr,setArr] = useState( Array.from(symptoms.values()) )

    const deleteSymptom = (symptom) => {
        const auxSymptoms= symptoms
        auxSymptoms.delete(symptom)
        setSymptomRedux(auxSymptoms)
        setArr(Array.from(symptoms.values()))
    }

    return(
        <View style={GeneralStyle.symptom_container}>
            <ScrollView>
                {arr.map((value) => {
                    console.log(value)
                    return(<SymptomItem symptom={value} deleteSymptom={deleteSymptom} editSymptom={(symptom,grade) => editSymp(symptom,grade)}/>)
                })}
                <Pressable style={GeneralStyle.symptom_item_add} onPress={()=>editSymp(null,null)}>
                    <Text style={GeneralStyle.symptom_item_add_text}> Agregar nuevo sintoma </Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const mapDispatchToProps = {
    setSymptomRedux,
}

const mapStateToProps = (state) => {
    return {
        symptoms : state.symptom_data.symptoms,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SymptomContainer)