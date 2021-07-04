import React from 'react'
import { Text,Image,View,ScrollView } from 'react-native'
import {GeneralStyle} from '../../styles/GeneralStyle'
import ItemDRButtons from '../../Item/ItemDRButton'
import {Colors} from '../../styles/Colors'
import {SliderType} from './SliderType'

export const SliderButtons = ({options, text, image, setValue, type}) => {
    return(
        
        <View style={GeneralStyle.white_background}>
            <View style={{...GeneralStyle.slider_upper_view ,
                            backgroundColor: (type === SliderType.daily ? Colors.orange : Colors.violet)}}>
                <Image source={ image }/>
                <Text style={{ ...GeneralStyle.slider_text, marginTop:10 }} > { text } </Text>
            </View>
            <Image style={GeneralStyle.slider_middle_deco} 
                resizeMode={'stretch'} 
                source={type === SliderType.daily ? require('../../../img/day_deco.png') : require('../../../img/register_deco.png')}/>
            <View style={ GeneralStyle.daily_down_view }>
                    {options.map((item, index) => {return <ItemDRButtons item={item} key={index} handlePress={setValue}/>})}
            </View>
        </View>
    )
}

