import React, {useState,useEffect } from 'react'
import { Pressable } from 'react-native'
import { View,StyleSheet,Image,Text,Dimensions } from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import { ButtonCustomeOrange } from '../Buttons/ButtonCustomeOrange'
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'
import {ActivityIndicator} from 'react-native-paper';
import {SearchPicker} from '../commonComponents/Pickers/SearchPicker'
import {CustomPicker} from '../commonComponents/Pickers/CommonPicker'
import {setSymptomRedux} from '../../reduxStore/actions/symptomActions'
import { set } from 'react-native-reanimated'

const {width} = Dimensions.get('window')


const SymptomRegister = ({navigation,idR,symptoms,cancer,setSymptomRedux,route}) => {

    const {preSymptom , preGrade} = route.params
    const [viewIsOn,setView] = useState(true)
    const [pickerOpen,setPickerOpen] = useState(false)
    const [id,setId] = useState(idR)
    const [symptom,setSymptom] = useState(null)
    const [symptomLock,setLock]= useState(false)
    const [grade,setGrade]= useState(null)
    const [gradeName,setGradeName] = useState(null)
    const [symptomIsLoaded,setSymptomIsLoaded] = useState(false)
    const [sLoaded,setSLoaded]=useState([{label: 'LOADING', value:'null', description:'null', gravity:[{label:'Loading',value:0}]}])

    console.log('initial state= ' +symptomIsLoaded)

    const getSymptoms = async()=>{
        let i=0
        const sL = []
        const sLDb = firestore().collection('mainSymptoms')
        await sLDb.get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    if (doc.data().cancer==cancer|| doc.data().cancer=='comun' ){
                        sL.push({label:doc.data().label,value:++i,description:doc.data().descripcion,gravity:doc.data().gravity})
                    } 
                })
            }
        )
        setSLoaded(sL)
    }

    useFocusEffect(
        React.useCallback(()=>{
            if(preSymptom !== null && symptomIsLoaded && !viewIsOn){
                console.log('presintoma = ' + preSymptom)
                sLoaded.forEach(symp =>{
                    if(symp.label===preSymptom){
                        setSymptom(symp)
                    }
                })
                console.log(symptom)
                setGrade(preGrade)
                setLock(true)
                setView(true)
            }
            else if(preSymptom ===null && symptomIsLoaded && !viewIsOn){
                setView(true)
            }
        })
    )

    useEffect(() => {
        if(symptomIsLoaded===false){
            getSymptoms().then(
                setSymptomIsLoaded(!symptomIsLoaded)
            )
        }
    },[symptomIsLoaded])


    useEffect(()=>{  
        console.log('sintoma = '+symptom)
        if(symptom !== null){
            setGrade(symptom.gravity[0].value)
        }
        else{
            setGrade(null)
            setSymptom(null)
        }
    },[symptom])

    useEffect(()=>{
        setId(id)
    },[id])

    useEffect(()=>{
        if(grade!==null){
            symptom.gravity.forEach((gr) =>{
                gr.value === grade && setGradeName(gr.label)
            })
        }
    },[grade])

    const pushSymptoms = () =>{
        //TODO cambiar alert
        if(grade === null){
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
            const auxiliarSymptoms = symptoms
            auxiliarSymptoms.set(key=symptom.label,value={symptom:symptom.label,grade:grade,gradeName:gradeName})
            setSymptomRedux(auxiliarSymptoms)
            navigation.navigate('symp_summary')
            setSymptom(null)
            setLock(false)
            setView(false)
        }
    }

    return (
        <View style={SymptomStyle.symptom_generalView}>
            <View style={pickerOpen? SymptomStyle.symptom_topView_p:SymptomStyle.symptom_topView} >
                <Text style={SymptomStyle.symptom_text_title}>Sintomas</Text>
                {console.log('presintoma =' + preSymptom)}
                {console.log('value: ' + JSON.stringify(symptom!==null ? symptom.label:'void'))}
                <SearchPicker value = {symptom===null?null:symptom.label} symptoms={sLoaded} setValue={setSymptom} 
                    placeHolder={'Describa su sintoma'} 
                    message={'No se a encontrado ningun sintoma \n con esas caracteristicas'}
                    open={pickerOpen} setOpen={setPickerOpen}
                    lock={symptomLock}/>
                {!pickerOpen &&
                    <View style={{width:'80%'}}>
                    {symptom==null ?
                    <Text style={SymptomStyle.symptom_descriptionText}>Descripcion de sintoma</Text>:<Text style={SymptomStyle.symptom_descriptionText}>{symptom.description}</Text>}
                    </View>
                }
            </View>
            <Image resizeMode={'stretch'} style={SymptomStyle.symptom_imgBack}source={require('../../img/register_deco.png')}/>
            <View style={pickerOpen ? SymptomStyle.symptom_bottomView_p:SymptomStyle.symptom_bottomView}>
                <Text style={SymptomStyle.symptom_text_title_bottom}>Grado</Text>
                {symptom !== null?
                <CustomPicker items={symptom.gravity} defaultValue={grade} setValue={setGrade} placeHolder={'Seleccione un grado'}/>
                : 
                <Text style={SymptomStyle.no_grade_text}>Seleccione un sintoma</Text>}
                <View style={{width: '45%' , alignSelf:'center'}}>
                    <ButtonCustomeOrange title= {preSymptom===null?"Agregar":"Editar"} handleFunction={pushSymptoms}></ButtonCustomeOrange>
                </View>
                
            </View>
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
        marginTop:5,
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
        marginBottom:5,
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
        zIndex:100000,
        backgroundColor: "#B189F8",
        flex:4.5,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'column',
        
    },

    symptom_topView_p:{
        zIndex:100000,
        backgroundColor: "#B189F8",
        flex:10,
        justifyContent:'flex-start',
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

    symptom_bottomView_p:{
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
        symptoms:state.symptom_data.symptoms
    }
}

const mapDispatchToProps = {
    setSymptomRedux
}

export default connect(mapStateToProps,mapDispatchToProps)(SymptomRegister)
