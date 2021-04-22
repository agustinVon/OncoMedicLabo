import React, {useState,useEffect } from 'react'
import { Pressable } from 'react-native'
import { View,StyleSheet,Image,Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { ButtonCustomeOrange } from '../Buttons/ButtonCustomeOrange'
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'
import {ActivityIndicator} from 'react-native-paper';
import {SearchPicker} from '../commonComponents/Pickers/SearchPicker'
import {CustomPicker} from '../commonComponents/Pickers/CommonPicker'

const SymptomRegister = ({navigation,idR}) => {

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
                    sL.push({label:doc.data().label,value:doc.data().value,descripcion:doc.data().descripcion,gravity:doc.data().gravity})
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
        const userDocument = firestore()
        .collection('symptoms')
        .add({
            id:id,
            symptom:symptom.label,
            grade:grade,
            date:date
        }).then(setIsLoading(false),navigation.navigate('home'))
    }

    const pushSymptoms = () =>{
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

    return (
        <View style={SymptomStyle.symptom_generalView}>
            <View style={SymptomStyle.symptom_topView} zIndex={50}>
                <Text style={SymptomStyle.symptom_text_title}>Sintomas</Text>
                <View style={{...SymptomStyle.symptom_dropDownPickerView, zIndex:5000}}>
                    <SearchPicker items={sLoaded} defaultValue={symptom.value} setValue={setSymptom} placeHolder={'Seleccione su sintoma'}/>
                </View>
                <View>{symptom.value==null?
                <Text style={SymptomStyle.symptom_descriptionText}>Descripcion de sintoma</Text>:<Text style={SymptomStyle.symptom_descriptionText}>{symptom.descripcion}</Text>}</View>
            </View>
            <Image resizeMode={'stretch'} style={SymptomStyle.symptom_imgBack}source={require('../../img/register_deco.png')}/>
            <View style={SymptomStyle.symptom_bottomView}>
                <Text style={SymptomStyle.symptom_text_title_bottom}>Grado</Text>
                <View style={{...SymptomStyle.symptom_dropDownPickerView, zIndex:4000}}>
                    {currentGrades.length!=0? 
                        <CustomPicker items={currentGrades} defaultValue={grade} setValue={setGrade} placeHolder={'Seleccione un grado'}/>
                        : <Text>Seleccione un sintoma</Text>}
                    
                </View>

            <ButtonCustomeOrange title="Agregar" handleFunction={pushSymptoms}></ButtonCustomeOrange>
            </View>
            {isLoading && 
            <View style={SymptomStyle.symptom_loading} zIndex={1000000}>
            <ActivityIndicator animating={true} color={"#FFFFFF"} size='large' />
            </View>}
        </View>
        
    )
}

const SymptomStyle=StyleSheet.create({

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
        height:100
    },

    symptom_dropDownPickerView:{

        height: 50,
        width: '80%',
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
        flex:5,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'column',
        
    },
    
    symptom_bottomView:{
        justifyContent:'flex-start',
        alignContent:'center',
        backgroundColor: 'white',
        alignItems:'center',
        flex: 4
    },

    symptom_imgBack:{
        height:50
    }
})

const mapStateToProps = (state) => {
    return {
        idR: state.user_data.id
    }
}

export default connect(mapStateToProps)(SymptomRegister)
