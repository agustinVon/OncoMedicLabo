import React, { useEffect, useState } from 'react'
import { SafeAreaView,View,Text,StyleSheet,Dimensions,Image,Button,ScrollView } from 'react-native'
import {Calendar} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import {Colors} from '../styles/Colors'
import {FontSizes} from '../styles/Fonts'
import Icon from 'react-native-vector-icons/AntDesign';
import {DateHolder} from './DateHolder';
import {MonthContainer} from './MonthContainer'

const CalendarView = ({navigation,id}) => {

    const [dates,setDates]= useState(null)
    const [meetings, setMeetings] = useState([])
    const [months, setMonths] = useState([])
    const [datesFormat,setDatesFormat] = useState({})
    const [dateToHours, setDateToHours] = useState(new Map)

    const loadDates = async () =>{
        const auxDates = []
        const auxMeetings = []
        const auxMonths = new Set()
        return await firestore()
        .collection('testDates')
        .where('id','==',id)
        .get().then((snapshot) =>{
            snapshot.forEach((doc) => {
                console.log('doc'+JSON.stringify(doc.data()))
                console.log(doc.data().hour)
                let date = new Date(doc.data().date.toDate())
                const hour = doc.data().hour
                const note = doc.data().note
                auxMeetings.push({date:date,hour:hour,note:note,month:date.getMonth()})
                auxDates.push(date)
                auxMonths.add(date.getMonth())
                dateToHours.set(date.toISOString().split('T')[0] , doc.data().hour)
                console.log(dateToHours)
            })
            console.log(auxDates)
            setMeetings(auxMeetings)
            setDates(auxDates)
            setMonths(Array.from(auxMonths))
        }) 
    }

    const transformDatesToFormat = async () =>{
        const aux = datesFormat
        dates.forEach((date) =>{
            const val = date.toISOString().split('T')[0]
            aux[val]= {selected: true, selectedColor: 'violet'}
        })
        setDatesFormat(aux)
    }

    useEffect(async ()=>{
        if(dates === null){
            await loadDates()
            
        }
        else{
            await transformDatesToFormat()
            console.log('transformed = '+ dateToHours)
        }
    },[dates])

    useEffect(()=>{
    },[datesFormat])

    const printMonth = (month)=>{
        switch(month){
            case 0:
                return 'Enero'
            case 1:
                return 'Febrero'
            case 2:
                return 'Marzo'
            case 3:
                return 'Abril'
            case 4:
                return 'Mayo'
            case 5:
                return 'Junio'
            case 6:
                return 'Julio'
            case 7:
                return 'Agosto'
            case 8:
                return 'Septiembre'
            case 9:
                return 'Octubre'
            case 10:
                return 'Noviembre'
            case 11:
                return 'Diciembre'
            default:
                return 'NUL'    
        }
    }


    return(
    <View style={CalStyle.background}>
        <View style={CalStyle.backButton}>
            <Icon name={'arrowleft'} color={Colors.white} size={30}/>
        </View>
        <View style={CalStyle.upperView}>
            <View style={CalStyle.topDeco}>
                <Image style={CalStyle.topDecoImg} resizeMode={'stretch'} source={require('../../img/top_calendar_deco.png')}/>
            </View>
            <View style={CalStyle.topInfo}>
                <Text style={CalStyle.nextDateTitle}>Su proxima cita es el</Text>
                <DateHolder/>
            </View>
        </View>
        <View style={CalStyle.lowerView}>
            <ScrollView contentContainerStyle={{paddingBottom:20}}>
                {months.map((month)=>(
                    <MonthContainer month={printMonth(month)} meetings={meetings.filter(meeting => meeting.month==month)}/>
                ))}
            </ScrollView>
        </View>
        {
            /*
            <Calendar 
            markedDates={datesFormat} 
            onDayPress={async (day)=>{
                setHour(dateToHours.get(day.dateString))
                }}
            />
            */
        }
    </View>
    )
}

const CalStyle = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    upperView:{
        flex:4,
        width:'100%'
    },
    lowerView:{
        flex:6,
        width:'90%',
        paddingTop:30,
        backgroundColor:Colors.white,
        justifyContent:'flex-start',
        alignContent:'flex-start'
    },
    backButton:{
        position:'absolute',
        zIndex:10,
        top:10,
        left:10,
    },
    topDeco:{
        position:'absolute',
        backgroundColor:Colors.lightViolet,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        height:'80%',
        width:'100%'
    },
    topInfo:{
        width:'100%',
        height:'100%',
        paddingTop:'20%',
        justifyContent:'space-evenly',
        alignContent:'center',
        alignItems:'center',
    },
    topDecoImg:{
        width:'100%',
        height:'40%',
    },
    nextDateTitle:{
        color:Colors.white,
        fontSize: FontSizes.titles,
        fontWeight:'bold'
    },
    
})

const mapStateToProps = (state) => {
    return {
        id: state.user_data.id
    }
}

export default connect(mapStateToProps)(CalendarView)