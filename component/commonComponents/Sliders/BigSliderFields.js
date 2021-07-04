import React from 'react'
import { Text,Image,View,ScrollView } from 'react-native'
import {GeneralStyle} from '../../styles/GeneralStyle'
import ItemDRButtons from '../../Item/ItemDRButton'
import {Colors} from '../../styles/Colors'
import {SliderType} from './SliderType'
import {InputField} from '../Fields/InputFieldTitle'

export const BigSliderFields = ({options, image, setValue, type, keyboardTypes= 'default'}) => {
    
    return(

        <View style={GeneralStyle.white_background}>
            <View style={{...GeneralStyle.small_slider_upper_view ,
                            backgroundColor: (type === SliderType.daily ? Colors.orange : Colors.violet)}}>
                <Image source={ image } style={ GeneralStyle.slider_small_image }/>
            </View>
            <Image style={GeneralStyle.slider_middle_deco} 
                resizeMode={'stretch'} 
                source={type === SliderType.daily ? require('../../../img/day_deco.png') : require('../../../img/register_deco.png')}/>
            <View style={ GeneralStyle.big_slider_down_view }>
                {options.map((option, index) => {return(<InputField key={index} title={option} setValue={setValue[index]} keyboardType={keyboardTypes}/>)})}
            </View>
        </View>
    )
}
