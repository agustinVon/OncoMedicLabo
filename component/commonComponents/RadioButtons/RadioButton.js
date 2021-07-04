import React from 'react'
import RadioForm from 'react-native-simple-radio-button';



export const RadioButton = ({manageValue}) => {

    const inmap = 
    [{label: '1', value: 1 },
    {label: '2', value: 2 },
    {label: '3', value: 3 },
    {label: '4', value: 4},
    {label: '5', value: 5 },
    {label: '6', value: 6 },
    {label: '7', value: 7 },
    {label: '8', value: 8 },
    {label: '9', value: 9 },
    {label: '10', value: 10 }]

    return(
        <RadioForm
        radio_props={inmap}
        initial={0}
        formHorizontal={true}
        labelHorizontal={false}
        buttonColor={"#FFB13A"}
        buttonSize={15}
        animation={true}
        onPress={(value) => {manageValue(value)}}
        />
    ) 
}