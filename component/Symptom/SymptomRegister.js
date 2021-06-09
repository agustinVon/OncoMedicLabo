import React, {useState,useEffect } from 'react'
import { Pressable } from 'react-native'
import { View,StyleSheet,Image,Text,Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { ButtonCustomeOrange } from '../Buttons/ButtonCustomeOrange'
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'
import {ActivityIndicator} from 'react-native-paper';
import {SearchPicker} from '../commonComponents/Pickers/SearchPicker'
import {CustomPicker} from '../commonComponents/Pickers/CommonPicker'

const {width} = Dimensions.get('window')


const SymptomRegister = ({navigation,idR,cancer}) => {

    const [id,setId] = useState(idR)
    const [symptom,setSymptom] = useState({label:null,value:null,description:null,gravity:null})
    const [grade,setGrade]= useState(null)
    const [currentGrades,setCurrentGrades]= useState([])
    const [symptomIsLoaded,setSymptomIsLoaded] = useState(false)
    const [sLoaded,setSLoaded]=useState([{label: 'LOADING', value:'null',descripcion: 'null',gravity:[{label:'LOADING',value:'0'}]}])
    const [isLoading, setIsLoading]= useState(false)

    const getSymptoms = async()=>{
        const sL = []
        const sLDb = firestore().collection('mainSymptoms')
        await sLDb.get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    console.log(doc.data().label)
                    if (doc.data().cancer==cancer|| doc.data().cancer=='comun' ){
                        sL.push({label:doc.data().label,value:doc.data().value,descripcion:doc.data().descripcion,gravity:doc.data().gravity})
                    } 
                })
            }
        )
        setSLoaded(sL)
    }

    useEffect(() => {
        if(symptom.value != null){
            setCurrentGrades(symptom.gravity)
        }
    },[symptom])

    useEffect(() => {
        if(symptomIsLoaded==false){
            getSymptoms().then(
                setSymptomIsLoaded(!symptomIsLoaded)
            )
        }  
    },[symptomIsLoaded])
    
    useEffect(() => {
        setGrade(null)
    },[currentGrades])

    useEffect(()=>{
        setId(id)
    },[id])

    const firestoreSave = () =>{
        setIsLoading(true)
        const date = new Date()
        const userDocument = idR !== 'default' ? firestore()
        .collection('testSymptoms')
        .add({
            id:id,
            symptom:symptom.label,
            grade:grade,
            date:date,
            cancer:cancer
        })
        .then((docRef) => {
            navigation.navigate('status',{text:"Registro de sintomas"})
        })
        .catch((error) => {
            navigation.navigate('fail',{e:error})
        }):
        navigation.navigate('login') 
    }

    const pushSymptoms = () =>{
        if(grade == null || symptom == {label:null,value:null,description:null,gravity:null}){
            Alert.alert(
                "Error",
                "Seleccione un sintoma y un grado",
                [
                    {
                        text: 'OK',
                    }
                ]
            )
        }
        else{
            if(grade>5){
                console.log('fue activado')
                console.log(grade)
                Alert.alert(
                    "Advertencia",
                    "Se sugiere su visita a un hospital",
                    [
                        {
                            text: 'OK',
                            onPress:() => firestoreSave()
                        }
                    ]
                )
            }else{
                firestoreSave()
            }
        }
    }

    const pickedSymptom = (item) =>{
        
    }

    return (
        <View style={SymptomStyle.symptom_generalView}>
            <View style={SymptomStyle.symptom_topView} >
                <Text style={SymptomStyle.symptom_text_title}>Sintomas</Text>
                <SearchPicker items={sLoaded} defaultValue={symptom.value} setValue={setSymptom} placeHolder={'Seleccione su sintoma'}/>
                <View style={{width:'80%'}}>{symptom.value==null?
                <Text style={SymptomStyle.symptom_descriptionText}>Descripcion de sintoma</Text>:<Text style={SymptomStyle.symptom_descriptionText}>{symptom.descripcion}</Text>}</View>
            </View>
            <Image resizeMode={'stretch'} style={SymptomStyle.symptom_imgBack}source={require('../../img/register_deco.png')}/>
            <View style={SymptomStyle.symptom_bottomView}>
                <Text style={SymptomStyle.symptom_text_title_bottom}>Grado</Text>
                {currentGrades.length!=0?
                <CustomPicker items={currentGrades} defaultValue={grade} setValue={setGrade} placeHolder={'Seleccione un grado'}/>
                : 
                <Text style={SymptomStyle.no_grade_text}>Seleccione un sintoma</Text>}
                <View style={{width: '45%' , alignSelf:'center'}}>
                    <ButtonCustomeOrange title="Agregar" handleFunction={pushSymptoms}></ButtonCustomeOrange>
                </View>
                
            </View>
            {isLoading && 
            <View style={SymptomStyle.symptom_loading} zIndex={1000000}>
            <ActivityIndicator animating={true} color={"#FFFFFF"} size='large' />
            </View>}
        </View>
        
        
    )
}

const SymptomStyle=StyleSheet.create({

    no_grade_text:{
        textAlign:'center',
        color:'#AAAAAA'
        
    },

    symptom_loading:{
        position: 'absolute',
        backgroundColor:'#707070',
        opacity:0.7, 
        width:'100%',
        height:'100%',
        justifyContent:'center'
    },

    symptom_text_title_bottom:{
        marginTop: 20,
        marginBottom:20,
        fontSize: 25,
        color:'#AAAAAA',
        textAlign:'center'
    },

    symptom_btn_add:{
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },

    symptom_descriptionText:{
        marginTop:20,
        color:'white',
        height:100,
        textAlign:'center'
    },


    symptom_dropDownPicker:{
        justifyContent:'center',
        width:300,
        padding:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10, 
        borderBottomLeftRadius:10, 
        borderBottomRightRadius:10,
        height:80,
    },

    symptom_text_title:{
        marginTop: 60,
        fontSize: 25,
        fontWeight: 'bold',
        color:'white',
        textAlign:'center'
    },

    symptom_generalView:{
        flex:1,
        backgroundColor:'white',
    },

    symptom_topView:{
        backgroundColor: "#B189F8",
        flex:4.5,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'column',
        
    },
    
    symptom_bottomView:{
        justifyContent:'flex-start',
        alignContent:'center',
        backgroundColor: 'white',
        width: '80%',
        flex: 4,
        alignSelf:'center'
    },

    symptom_imgBack:{
        width,
        height:60
    }
})

const mapStateToProps = (state) => {
    return {
        idR: state.user_data.id,
        cancer: state.user_data.cancer,
    }
}

export default connect(mapStateToProps)(SymptomRegister)
