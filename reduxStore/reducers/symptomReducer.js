import {CLEAN_SYMPTOMS, SET_CURRENTDATA, SET_SYMPTOM} from '../actions/symptomActions'

const default_symptom ={
    id:'',
    date:'',
    cancer:'',
    symptoms:new Map()
}

const symptom_data = (state = default_symptom, action) => {
    console.log('try')
    switch(action.type){
        case SET_CURRENTDATA:{
            return{
                ...state,
                id: action.payload.id,
                date: action.payload.date,
                cancer: action.payload.cancer
            }
        }

        case SET_SYMPTOM:{
            console.log('add')
            return{
                ...state,
                symptoms: action.payload
            }
        }

        case CLEAN_SYMPTOMS:{
            console.log('clean')
            return{
                ...state,
                id: '',
                date:'',
                cancer:'',
                symptoms: new Map()
            }
        }

        default: return state
    }
}

export default symptom_data