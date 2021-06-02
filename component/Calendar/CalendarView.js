import React, { useEffect, useState } from 'react'
import { SafeAreaView,View,Text,StyleSheet,Dimensions,Image,Button } from 'react-native'
import {Calendar} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';

const CalendarView = ({navigation,id}) => {

    const [dates,setDates]= useState(null)
    let datesFormat = {}

    const loadDates = async () =>{
        const auxDates = []
        return await firestore()
        .collection('dates')
        .where('id','==',id)
        .get().then((snapshot) =>{
            snapshot.forEach(doc => {
                auxDates.push(new Date(doc.data().date.toDate()))
            })
            console.log(auxDates)
            setDates(auxDates)
        }) 
    }

    const transformDatesToFormat = () =>{
        dates.forEach((date) =>{
            const today = new Date().toISOString().split('T')[0]
            console.log(today)
            const val = date.toISOString().split('T')[0]
            datesFormat[val]= {selected: true, selectedColor: 'violet'}
        })
    }

    useEffect(async ()=>{
        if(dates === null){
            await loadDates()
            
        }
        else{
            transformDatesToFormat()
        }
    },[dates])


    return(
    <View style={CalStyle.background}>
        {console.log(id)}
        <View style={CalStyle.back_img}>
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
            <Calendar markedDates={datesFormat}></Calendar>
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
