import React,{useState,useEffect,useRef,useContex} from 'react'
import { SafeAreaView, View, ActivityIndicator } from 'react-native'
import  Swiper  from "react-native-swiper";
import {DailyRegisterOptions} from './DailyRegisterOptions.js'
import {DailyRegisterButtons} from './DailyRegisterButtons.js'
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { Alert } from 'react-native';



const DailyRegister = ({navigation,idR}) => {
    const swiper = React.useRef(null);

    const [id,setId] = useState(idR)
    const [mood,setMood] = useState("");
    const [sad,setSad] = useState("")
    const [hungry,setHungry] = useState('');
    const [hid,setHid] = useState('');
    const [run,setRun] = useState('');
    const [social,setSocial] = useState('');
    const [isLoading, setLoading] = useState(false)

    useEffect(()=>{
        setId(id)
    },[id])

    useEffect(() =>{
        if(social != ''){
            pushDR()
        }
    },[social])

    const cant_screen = 5;

    const swipeNext = (i) =>{
        console.log('mood ' + mood)
        console.log('sad '+sad)
        console.log('hungry '+hungry)
        console.log('hid '+ hid)
        console.log('run ' + run)
        console.log('social' + social)
        console.log('--------------')

        swiper.current.scrollBy(1)
    }

    const pushDR = () =>{
        setLoading(true)
        const date = new Date()
        const userDocument = firestore()
        .collection('testDiaryReg')
        .doc(id +'EN'+ date.getDate() +'DE'+ date.getMonth() +'DE'+ date.getFullYear())
        .set({
            date:date,
            id:id,
            mood:mood,
            sad:sad,
            hungry:hungry,
            hid:hid,
            run:run,
            social:social
        })
        .then((docRef) => {
            setLoading(false)
            navigation.navigate('status',{text:"Registro diario"})
        })
        .catch((error) => {
            setLoading(false)
            navigation.navigate('fail',{e:error})
        });
    }

    return (
        isLoading && 
        <View style={{
        position: 'absolute',
        backgroundColor:'#707070',
        opacity:0.7, 
        width:'100%',
        height:'110%',
        justifyContent:'center'}}>
        <ActivityIndicator animating={true} color={"#FFFFFF"} size='large' />
        </View>,
        <Swiper ref={swiper} loop={false} activeDotColor={"#FFB13A"}>
            <DailyRegisterOptions type={"Que tan animado te encuentras hoy? \n (1 es muy mal 10 es muy bien)"} imageProp={require("../../img/ic_child.png")} switchSwiper={swipeNext} handleValue={setMood} index={0}/>
            <DailyRegisterOptions type={"Sentiste algun dolor hoy?"} imageProp={require("../../img/ic_sad.png")} switchSwiper={swipeNext} handleValue={setSad} index={1}/>
            <DailyRegisterButtons type={"A"} text={"¿Tuviste apetito?"}imageProp={require("../../img/ic_utensils.png")} switchSwiper={swipeNext} handleValue={setHungry} index={2}/>
            <DailyRegisterButtons type={"H"} text={"¿Te hidrataste?"} imageProp={require("../../img/ic_water.png")} switchSwiper={swipeNext} handleValue={setHid} index={3}/>
            <DailyRegisterButtons type={"AF"} text={'Hiciste actividad fisica?'} imageProp={require("../../img/ic_run.png")} switchSwiper={swipeNext} handleValue={setRun} index={4}/>
            <DailyRegisterButtons type={"S"} text={"Tuviste contacto social?"} imageProp={require("../../img/ic_social.png")} switchSwiper={swipeNext} handleValue={setSocial} index={5}/>
        </Swiper>
    )
}

const mapStateToProps = (state) => {
    return {
        idR: state.user_data.id
    }
}

export default connect(mapStateToProps)(DailyRegister)
