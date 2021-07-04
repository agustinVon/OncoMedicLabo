import {StyleSheet} from 'react-native'
import {Colors} from './Colors'
import {FontSizes} from './Fonts'

export const GeneralStyle = StyleSheet.create({

    white_background:{
        width:'100%',
        height:"100%",
        backgroundColor: "white",
    },

    slider_upper_view:{
        width:'100%',
        flex:4,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },

    small_slider_upper_view:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },

    big_slider_down_view:{
        paddingBottom:'15%',
        width:'100%',
        flex:8,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },

    daily_down_view:{
        width:'100%',
        flex:5,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:'15%'
    },

    slider_text:{
        maxWidth: 250,
        fontSize: FontSizes.titles,
        color:"white",
        fontWeight: 'bold',
        textAlign:"center",
    },

    slider_middle_deco:{
        width: '100%',
        height: 60
    },

    slider_small_image:{
        width:40,
        height:35
    },

    field_text_not_selected:{
        fontSize: FontSizes.registerQuerys,
        textAlign:'left',
        color: Colors.textGrey
    },

    field_text:{
        width:300,
        fontSize: FontSizes.registerQuerys,
        textAlign:'left',
    },

    field_multiple:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        fontSize: FontSizes.registerQuerys,
        marginTop: 6,
        paddingLeft:10,
        paddingRight:10,
        width:320,
        height:50,
        borderRadius: 10,
        backgroundColor: Colors.inputFieldGrey,
    },

    field_incorrect:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        marginTop: 6,
        width:320,
        height:50,
        paddingLeft:10,
        paddingRight:10,
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 10,
        backgroundColor: Colors.inputFieldGrey,   
    },

    center_container:{
        marginTop:20,
        marginBottom:20,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },

    title:{
        fontSize: FontSizes.titles,
        fontWeight: 'bold',
    },

    symptom_list:{
        backgroundColor: Colors.inputFieldGrey,
        borderRadius:10,
        width:320,
        height:100,
        paddingLeft:10,
        paddingRight:10
    },

    symptom_list_item:{
        marginTop:10

    },

    symptom_list_font:{
        fontSize:FontSizes.listItems,
    },

    symptom_sum_view:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        backgroundColor:Colors.violet,
        paddingRight:'10%',
        paddingLeft:'10%',
        flex:1,
    },

    symptom_container:{
        width:'100%',
        borderRadius:10,
        justifyContent:'center',
        alignContent:'center',
        height:'70%',
        padding:10,
        backgroundColor:'white'
    },

    symptom_item_not_pressed:{
        justifyContent:'space-between',
        width:'100%',
        height:70,
        borderRadius:10,
        marginBottom:10,
        backgroundColor:Colors.inputFieldGrey,
        flexDirection:'row',
        padding:10
    },

    symptom_item_pressed:{
        justifyContent:'space-between',
        width:'100%',
        height:130,
        borderRadius:10,
        marginBottom:10,
        backgroundColor:Colors.inputFieldGrey,
        flexDirection:'column',
        padding:10
    },

    symptom_item_add:{
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:50,
        borderRadius:10,
        marginBottom:10,
        backgroundColor:Colors.inputFieldGrey,
        flexDirection:'row',
        padding:10
    },

    symptom_item_text:{
        textAlignVertical:'center',
        marginLeft:3,
        height:'100%',
        flex:1,
        fontSize:FontSizes.symptoms,
        fontWeight:'bold',
    },

    symptom_item_add_text:{
        textAlignVertical:'center',
        justifyContent:'center',
        textAlign:'center',
        height:'100%',
        flex:1,
        fontSize:FontSizes.symptoms,
    },

    symptom_item_miniText:{
        fontSize:FontSizes.registerQuerys,
        alignSelf:'flex-start',
    },

    symptom_item_logo:{
        height:40,
        width:40,
        backgroundColor : Colors.textGrey,
        borderRadius:100,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },

    modal_background:{
        backgroundColor:'#FFFFFF',
        height:'40%',
        width:'70%',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderRadius:15,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowRadius:40
    },

    modal_title:{
        fontSize:FontSizes.modalTitle,
        color:Colors.violet,
        textAlign:'center',
    },

    modal_text:{
        marginLeft:10 , 
        marginRight:10,
        fontSize:FontSizes.registerQuerys,
        textAlign:'center'
    }
});