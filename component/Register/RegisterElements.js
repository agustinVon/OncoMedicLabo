import React,{useState,useEffect}  from 'react'
import {SafeAreaView,Text,Image,StyleSheet,Dimensions,ScrollView,View} from 'react-native'
import ItemRegister from '../Item/ItemRegister.js'


const {width} = Dimensions.get("window")

export const RegisterElements = ({type,nextScreen}) => {
 
    const [typeRegister,setType] = useState(type)
    const [textType,setTextype] = useState("")
    const [typeOption,setTypeOption] = useState([])
    const [image,setImage] = useState("")

    useEffect(() => {
        typeRegister == "smoke" ? (setTextype("¿FUÍSTE/ERES FUMADOR?"),setTypeOption(["Fumo actualmente","Fumaba","No"]),setImage(require("../../img/ic_smoke.png"))) :
        (setTextype("¿TIENES DIABETES?"),setTypeOption(["Si","No"]),setImage(require("../../img/ic_diabetic.png"))) 
    }, [typeRegister])

    //const handleSelectItem = (value) =>{
    //    value.item == "No" ? handlePress(false) : handlePress(true)
    //}

    return (
        <SafeAreaView style={RegisterElementStyle.regelem_const_back}>

            <ScrollView style={RegisterElementStyle.regelem_scroll}>
                <View style={RegisterElementStyle.regelem_cont}>
                    <View style={RegisterElementStyle.regelem_cont_top}>
                        <Image source={image}/>
                        <Text style={RegisterElementStyle.regelem_cont_top_text}>{textType}</Text>
                    </View>
                    <Image style={RegisterElementStyle.regelem_deco_top} source={require("../../img/register_deco.png")}/>
                </View>
                <View style={RegisterElementStyle.regelem_itemcont}> 
                    {
                        typeOption.length > 0 && typeOption.map((element,key)=><ItemRegister key={key} type={typeRegister} item={element} nextScreen={nextScreen} />)
                    }
                </View> 
            </ScrollView>
        </SafeAreaView>
    )
}



const RegisterElementStyle = StyleSheet.create({
    regelem_itemcont:{
        flex: 5,
        width,
        minHeight: 350,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom:200
    },
    regelem_cont:{
        alignItems: 'center',
        flex:1,
    },
    regelem_cont_top:{
        paddingTop: 40,
        paddingBottom: 30,
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



