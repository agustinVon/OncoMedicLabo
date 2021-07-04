import {combineReducers} from 'redux'
import user_data from './registerReducer.js'
import symptom_data from './symptomReducer.js'

const rootReducer = combineReducers({
    symptom_data,
    user_data,
})

export default rootReducer
