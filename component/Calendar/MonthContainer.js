import React from 'react'
import {View,StyleSheet,Text,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {Colors} from '../styles/Colors'
import { FontSizes } from '../styles/Fonts';


export const MonthContainer = ({month = 'Octubre' , meetings = [{date : new Date(), hour:18 , note: 'Reunion sobre nueva medicacion'}]}) => {

    const printDay= (day) =>{
        switch(day){
            case 1:
                return 'LUN'
            case 2:
                return 'MAR'
            case 3:
                return "MIE"
            case 4:
                return 'JUE'
            case 5:
                return 'VIE'
            case 6:
                return 'SAB'
            case 7:
                return 'DOM'
            default:
                return 'NUL'                            
        }
    }

    return (
        <>
        <View style={MonthStyle.monthDivider}>
            <Icon name={'circle'} color={Colors.violet} size={20}/>
            <Text style={MonthStyle.monthText}>{month}</Text>
        </View>
        <View style={MonthStyle.meetingContainers}>
            {meetings.map(({date,hour,note}) => (
            <View style={MonthStyle.meeting}>
                <View style={MonthStyle.dateContainer}>
                    <Text style={MonthStyle.day}>{printDay(date.getDay())}</Text>
                    <Text style={MonthStyle.date}>{date.getDate()}</Text>
                </View>
                <View style={MonthStyle.detailsContainer}>
                    <View style={MonthStyle.infoSnippet}>
                        <IconAnt name={'clockcircleo'} color={Colors.white} size={20}/>
                        <Text style={MonthStyle.infoText}>{hour}</Text>
                    </View>
                    <View style={MonthStyle.infoSnippet}>
                        <IconAnt name={'paperclip'} color={Colors.white} size={20}/>
                        <Text style={MonthStyle.infoText}>{note}</Text>
                    </View>
                </View>
            </View>
            ))}
        </View>
        </>
    )
}

const MonthStyle=StyleSheet.create({
    monthDivider:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center'
    },
    monthText:{
        fontSize: FontSizes.symptoms,
        color:Colors.textGrey,
        marginLeft:20
    },
    meetingContainers:{
        width:'100%',
        justifyContent:'flex-start',
        paddingTop:20,
        paddingLeft:20,
        marginLeft:9,
        borderLeftWidth:2,
        borderColor:Colors.black
    },
    meeting:{
        flexDirection:'row',
        backgroundColor:Colors.white,
        width:'88%',
        height: 100,
        elevation:10,
        borderRadius:10,
        marginBottom:20,
    },
    dateContainer:{
        flexDirection:'column',
        justifyContent:'center',
        flex:2,
        alignContent:'center',
        alignItems:'center'
    },
    day:{
        color:Colors.textBlack,
        fontSize:FontSizes.listItems,
    },
    date:{
        color:Colors.textBlack,
        fontSize:FontSizes.titles,
    },
    detailsContainer:{
        flex:8,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:Colors.violet,
        paddingLeft:20,
        justifyContent:'space-evenly',
        alignItems:'flex-start'
    },
    infoSnippet:{
        flexDirection:'row',
        marginLeft:10,
        alignItems:'center'
    },
    infoText:{
        marginLeft: 10,
        fontSize:FontSizes.symptoms,
        color:Colors.white
    }
})
