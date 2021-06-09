import React, { useEffect, useState } from 'react'
import { SafeAreaView,View,Text,StyleSheet,Dimensions,Image,Button } from 'react-native'
import {Calendar} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { render } from 'react-dom';

const CalendarView = ({navigation,id}) => {

    const [dates,setDates]= useState(null)
    const [hour,setHour] = useState(null)
    const [markedDates, setMarkedDates] = useState({})

    

    const [datesFormat,setDatesFormat] = useState({})
    const [dateToHours, setDateToHours] = useState(new Map)

    const loadDates = async () =>{
        const auxDates = []
        return await firestore()
        .collection('testDates')
        .where('id','==',id)
        .get().then((snapshot) =>{
            snapshot.forEach((doc) => {
                console.log('doc'+JSON.stringify(doc.data()))
                console.log(doc.data().hour)
                let date = new Date(doc.data().date.toDate())
                auxDates.push(date)
                dateToHours.set(date.toISOString().split('T')[0] , doc.data().hour)
                console.log(dateToHours)
            })
            console.log(auxDates)
            setDates(auxDates)
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


    return(
    <View style={CalStyle.background}>
        <View style={CalStyle.back_img}>
            {console.log('hora =' +hour)}
            <View  style={CalStyle.back_img}>
                <Image style={CalStyle.img}source={require('../../img/back_home1.png')}/>
                <View style={CalStyle.view}/>
            </View>
            <View  style={CalStyle.back_img}>
                <Image style={CalStyle.img}source={require('../../img/back_home2.png')}/>
                <View style={CalStyle.view2}/>
            </View>            
                    
        </View>
        <Text style={CalStyle.title}>Citas Proximas: </Text>
        <View style={CalStyle.calendar_container}>
            <Calendar 
            markedDates={datesFormat} 
            onDayPress={async (day)=>{
                setHour(dateToHours.get(day.dateString))
                }}
            />
            {hour !== null && <Text style={{marginTop: 20}}>Hora = {hour}</Text>}     
        </View>
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
    back_img:{
        width:'100%',
        height:"100%",
        position: "absolute",
        justifyContent: 'flex-end',
    },
    img:{
        width:'100%',
        position: "relative",
    },
    view:{
        height:320,
        width:"100%",
        backgroundColor: "#F7F3FE",
    },
    view2:{
        height:250,
        width:"100%",
        backgroundColor: "#EEE6FD",
    },
    title:{
        fontSize: 25
    },
    calendar_container:{
        width:'90%',
        height:'55%',
        alignSelf:'center',
        marginTop:'10%'
    }
})

const mapStateToProps = (state) => {
    return {
        id: state.user_data.id
    }
}

export default connect(mapStateToProps)(CalendarView)
