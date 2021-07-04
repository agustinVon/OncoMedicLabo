export const SET_CURRENTDATA = "SET_CURRENTDATA";
export const SET_SYMPTOM = "SET_SYMPTOM";
export const CLEAN_SYMPTOMS = "CLEAN_SYMPTOMS"

export const setCurrentData = (currentData) =>{
    return{
        type: SET_CURRENTDATA,
        payload: currentData
    }
}

export const setSymptomRedux = (symptom) => {
    return{
        type: SET_SYMPTOM,
        payload: symptom
    }
}

export const cleanSymptoms=()=>{
    return{
        type: CLEAN_SYMPTOMS,
        payload: ''
    }
}