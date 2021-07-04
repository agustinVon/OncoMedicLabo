import React,{useState,useEffect,useRef,useContext} from 'react'
import { SafeAreaView } from 'react-native'
import  Swiper  from "react-native-swiper";
import {RegisterElements} from './RegisterElements.js'
import RegisterElementsMore from './RegisterElementsMore.js'
import RegisterIllustrator from './RegisterIllustrator.js'
import { connect } from 'react-redux';
import {SliderButtons} from '../commonComponents/Sliders/SliderButtons'
import {SliderType} from '../commonComponents/Sliders/SliderType'
import { BigSliderFields } from '../commonComponents/Sliders/BigSliderFields'
import { BigSliderButtons } from '../commonComponents/Sliders/BigSliderButtons'
import { BigSliderRadio } from '../commonComponents/Sliders/BigSliderRadio'
import {CustomAlert} from '../commonComponents/Alerts/Alert'
import {setDbtInformationAction, setDbtOptionAction, setSmokeInformationAction, setSmokeOptionAction, setMedOptionAction} from '../../reduxStore/actions/registerAction'
import { View } from 'react-native';
import { Alert } from 'react-native';


const Register_Swiper = ({navigation,smokeState,dbtState,setSmokeInformationAction, setDbtInformationAction, setMedOptionAction, setSmokeOptionAction,setDbtOptionAction}) => {

    const [sTime,setSmokeTime]= useState(0)
    const [sQnt,setQnt]= useState(0)
    const [medDbt,setMedDbt]= useState('')
    const [hip, setHip] = useState(false)
    const [epoc, setEpoc] = useState(false)
    const [acv, setACV] = useState(false)
    const [inf, setInf] = useState(false)
    const [smokeQntERR, setSmkERR] = useState(false)
    const [alert,setAlert] = useState(false)
    const [smokeLocal,setSmokeLocal]=useState(false)

    const smokeOptions = [{label:'Fumo actualmente' ,value:1},
                        {label:'Fumaba', value:2},
                        {label: 'No', value:0}]
    const smokeDetails = ['¿Cantidad de cigarrillos por dia?', '¿Cuantos años fumaste?']
    const dbtOptions= [{label:'Si', value:1},{label:'No', value:0}]   
    const meds = [{label:"Insulina",value:'Insulina'},
                {label:"Metmorfina",value:"Metmorfina"},
                {label:"Otra",value:"Otra"}]
    const radio = ["Hipertensión","EPOC","ACV","Infarto"]           

    useEffect(()=>{
        if(medDbt !== ''){
            setDbtOptionAction(medDbt)
            swiper.current.scrollBy(1)
        }
    },[medDbt])

    useEffect(()=>{
        console.log('hola')
        setSmokeOptionAction({
            time: sTime,
            qnt: sQnt
        })
        if((sTime<=0 || sQnt <=0) && smokeLocal){
            console.log('cambio')
            setSmkERR(true)
        }
        else{
            console.log('fail')
            setSmkERR(false)
        }
    },[sQnt,sTime])

    useEffect(()=>{
        setMedOptionAction({
            hip:hip,
            epoc:epoc,
            acv:acv,
            inf:inf
        })
    },[hip,epoc,acv,inf])

    const swiper = React.useRef(null);

    const setSmoke = (smoke) =>{
        console.log(smoke)
        setSmokeInformationAction(smoke)
        if(smoke===0){
            setSmokeLocal(false)
            setSmkERR(false)  
        }
        else{
            setSmokeLocal(true)
        }
        swiper.current.scrollBy(1);
    }

    const setDbt = (dbt) =>{
        setDbtInformationAction(dbt)
        swiper.current.scrollBy(1)
    }

    const goToWaitScreen = ()=>{
        navigation.navigate('wait_screen')
    }

    return (
            <Swiper ref={swiper}  loop={false} activeDotColor={"#B189F8"}>

                <SliderButtons options={smokeOptions} text={"¿FUÍSTE/ERES FUMADOR?"}
                image={require("../../img/ic_smoke.png")} setValue={setSmoke}
                type={SliderType.register}/>
                    {
                        smokeState != 0 && 
                        <View>
                            <BigSliderFields options={smokeDetails} setValue={[setQnt,setSmokeTime]} image={require("../../img/ic_smoke.png")} type={SliderType.register} keyboardTypes={'numeric'}/>
                            
                        </View>     
                    }
                <SliderButtons options={dbtOptions} text={"¿TENES DIABETES?"}
                image={require("../../img/ic_diabetic.png")} setValue={setDbt}
                type={SliderType.register}/>
                    {
                        dbtState && <BigSliderButtons options={meds} image={require("../../img/ic_diabetic.png")} setValue={setMedDbt} type={SliderType.register}/>
                    }

                <BigSliderRadio options={radio} setValue={[setHip,setEpoc,setACV,setInf]} image={require("../../img/ic_diabetic.png")}/>
                <RegisterIllustrator goHomeFunction={goToWaitScreen} err={smokeQntERR}/>
            </Swiper>           
    )
}
const mapStateToProps = (state) => {
    return {
        smokeState: state.user_data.smoke.smoke,
        dbtState: state.user_data.dbt.dbt,
    }
}

const mapDispatchToProps = {
    setSmokeInformationAction,
    setSmokeOptionAction,
    setDbtInformationAction,
    setDbtOptionAction,
    setMedOptionAction
}

export default connect(mapStateToProps,mapDispatchToProps)(Register_Swiper)

