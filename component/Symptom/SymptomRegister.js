import React, {useState,useEffect } from 'react'
import { Pressable } from 'react-native'
import { View,StyleSheet,Image,Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { ButtonCustomeOrange } from '../Buttons/ButtonCustomeOrange'
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'

const SymptomRegister = ({navigation,idR}) => {

    const [id,setId] = useState(idR)
    const [symptom,setSymptom] = useState({label:null,value:null,description:null,gravity:null})
    const [grade,setGrade]= useState(null)
    const [currentGrades,setCurrentGrades]= useState([])
    const [symptomIsLoaded,setSymptomIsLoaded] = useState(false)
    const [sLoaded,setSLoaded]=useState([{label: 'null', value:'null',descripcion: 'null',gravity:[{label:'<36',value:'0'},{label:'>36',value:'6'}]}])

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
        const date = new Date()
        const userDocument = firestore()
        .collection('symptoms')
        .add({
            id:id,
            symptom:symptom.label,
            grade:grade,
            date:date
        }).then(navigation.navigate('home'))
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
        symptomIsLoaded?
        <View style={SymptomStyle.symptom_generalView}>
            <View style={SymptomStyle.symptom_topView} zIndex={50}>
                <Text style={SymptomStyle.symptom_text_title}>Sintomas</Text>
                <View zIndex={5000} style={SymptomStyle.symptom_dropDownPickerView}>
                    <DropDownPicker
                        items={sLoaded}
                        defaultValue={symptom.value}
                        style={symptom.value!=null?{...SymptomStyle.symptom_dropDownPicker,backgroundColor: '#fafafa'}:{...SymptomStyle.symptom_dropDownPicker, backgroundColor: "#E3E3E3",padding:0}}
                        itemStyle={{ justifyContent: 'flex-start'}}
                        containerStyle={{borderRadius:10}}
                        dropDownStyle={{backgroundColor: 'white'}}
                        onChangeItem={item =>{
                            setSymptom(item);
                        }}
                        placeholderStyle={symptom==null?{color:'#B189F9',fontSize:17}:{color:'black',fontSize:17}}
                        zIndex={10000}
                        searchable={true}
                        searchablePlaceholder={'Seleccione su sintoma'}
                        searchablePlaceholderTextColor='#AAAAAA'
                        searchableError={()=><Text>Not Found</Text>}
                        >
                            {console.log(symptom)}
                    </DropDownPicker> 
                </View>
                <View>{symptom.value==null?
                <Text style={SymptomStyle.symptom_descriptionText}>Descripcion de sintoma</Text>:<Text style={SymptomStyle.symptom_descriptionText}>{symptom.descripcion}</Text>}</View>
            </View>
            <Image resizeMode={'stretch'} style={SymptomStyle.symptom_imgBack}source={require('../../img/register_deco.png')}/>
            <View style={SymptomStyle.symptom_bottomView}>
                <Text style={SymptomStyle.symptom_text_title_bottom}>Grado</Text>
                <View zIndex={4000} style={SymptomStyle.symptom_dropDownPickerView}>
                    {currentGrades.length!=0? 
                        <DropDownPicker
                            items={currentGrades}
                            defaultValue={grade}
                            style={grade!=null?{...SymptomStyle.symptom_dropDownPicker,backgroundColor: '#fafafa'}:{...SymptomStyle.symptom_dropDownPicker, backgroundColor: "#E3E3E3",padding:0}}
                            itemStyle={{ justifyContent: 'flex-start'}}
                            containerStyle={{borderRadius:10}}
                            dropDownStyle={{backgroundColor: 'white'}}
                            onChangeItem={item =>{
                                setGrade(item.value)
                            }}
                            placeholderStyle={grade==null?{color:'#B189F9',fontSize:17}:{color:'black',fontSize:17}}
                            zIndex={10000}
                            >
                        </DropDownPicker> : <Text>Seleccione un sintoma</Text>}
                    
                </View>

            <ButtonCustomeOrange title="Agregar" handleFunction={pushSymptoms}></ButtonCustomeOrange>
            </View>
        </View>:
        <View style={{backgroundColor:'#B189F8', height:'100%', width:'100%'}}></View>
    )
}

const SymptomStyle=StyleSheet.create({

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
