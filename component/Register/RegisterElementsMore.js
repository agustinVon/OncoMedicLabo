import React,{useState,useEffect}  from 'react'
import {SafeAreaView,Text,Image,StyleSheet,Dimensions,ScrollView,View} from 'react-native'
import ItemRegister from '../Item/ItemRegister.js'
import {ItemRegisterInput} from '../Item/ItemRegisterInput.js'
import {ItemRegisterRadio} from '../Item/ItemRegisterRadio.js'
import { connect } from 'react-redux';
import { setSmokeOptionAction } from '../../reduxStore/actions/registerAction';
import { setMedOptionAction } from '../../reduxStore/actions/registerAction';



const {width} = Dimensions.get("window")

const RegisterElementsMore = ({type,nextScreen,setSmokeOptionAction,setMedOptionAction}) => {
    const [typeRegister,setType] = useState(type)
    const smoke_q = ["¿Cantidad por dia?","¿Cuantos meses fumaste?"]
    const dbt_q = ["Insulina","Metmorfina", "Otra"]
    const [image,setImage] = useState("")
    const [med, setMed] = useState(["Hipertensión","EPOC",
                                   "ACV","Infarto"])
    
    const [qnt, setQnt] = useState("")
    const [time, setTime] = useState("")

    const [hip, setHip] = useState(false)
    const [epoc, setEpoc] = useState(false)
    const [acv, setACV] = useState(false)
    const [inf, setInf] = useState(false)
       
    useEffect(() => {
        setSmokeOptionAction({qnt:qnt,time:time})
    }, [qnt,time])

    useEffect(() => {
        setMedOptionAction({hip:hip,epoc:epoc,acv:acv,inf:inf})
    }, [hip,epoc,acv,inf])
 
    useEffect(() => {
        typeRegister == "smoke" ? setImage(require("../../img/ic_smoke.png")) :
        setImage(require("../../img/ic_diabetic.png"))

    }, [typeRegister])

    useEffect(() => {
        setType(type)
    }, [type])

    const handleSelectItem = (value) =>{
        handlePress(value.item)
    }



    return (
        <SafeAreaView style={RegisterElementMoreStyle.regelem_const_back}>
            <ScrollView style={RegisterElementMoreStyle.regelem_scroll}>
                <View style={RegisterElementMoreStyle.regelem_cont}>
                    <View style={RegisterElementMoreStyle.regelem_cont_top}>
                        <Image style={RegisterElementMoreStyle.reglem_img} source={image}/>
                    </View>
                    <Image style={RegisterElementMoreStyle.regelem_deco_top} source={require("../../img/register_deco.png")}/>
                </View>
                <View style={RegisterElementMoreStyle.regelem_itemcont}> 
                    {
                        typeRegister == "smoke" ? smoke_q.map((element,key)=><ItemRegisterInput type={typeRegister} key={key} item={element} handlePress={element=="¿Cantidad por dia?"?setQnt:setTime} />) : 
                        typeRegister == "diabetic_more" ? dbt_q.map((element,key)=> <ItemRegister item={element} key={key} type={typeRegister} nextScreen={nextScreen}/>): 
                        med.map((item,key)=><ItemRegisterRadio title={item} key={key} handlePress={item=="ACV"?setACV : item=="EPOC"?setEpoc:item=="Infarto"?setInf:setHip}/>)
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapDispatchToProps = {
    setSmokeOptionAction,
    setMedOptionAction
}

export default connect(null,mapDispatchToProps)(RegisterElementsMore)

const RegisterElementMoreStyle = StyleSheet.create({
    reglem_img:{
        width:40,
        height:35
    },
    regelem_itemcont:{
        flex: 5,
        width,
        minHeight: 500,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:60
    },
    regelem_const_back:{
    
        width,
        height:"100%",
        backgroundColor: "white",
    },
    regelem_scroll:{
        width,
        flexGrow: 1,
        minHeight: "100%",    
        flexDirection: 'column',
    },
    regelem_cont:{
        alignItems: 'center',
        flex:1,
    },
    regelem_cont_top:{
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#B189F8",
        width,
        alignItems: 'center',
    },
    regelem_deco_top:{
        width,
    },
    regelem_cont_top_text:{
        maxWidth: 190,
        marginTop:25,
        fontSize: 25,
        color:"white",
        fontWeight: 'bold',
        textAlign:"center"
    }
})
