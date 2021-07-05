/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack' ;
import Login from './component/Login/Login.js'
import Register from './component/Register/Register.js'
import RegisterMedic from './component/Register/RegisterMedic.js'
import RegisterIllustrator from './component/Register/RegisterIllustrator.js'
import Register_Swiper from './component/Register/Register_Swiper.js'
import Home from './component/Home/Home.js'
import DailyRegister from './component/DailyRegister/DailyRegister.js'
import store from './reduxStore/store'
import {Provider} from 'react-redux'
import {ContextRegister} from './ContextRegister.js'
import SymptomRegister from './component/Symptom/SymptomRegister'
import AvatarChanger from './component/AvatarChanger/AvatarChanger'
import {RegisterAlmostFinished} from './component/Register/RegisterAlmostFinished'
import {WaitScreen} from './component/Login/WaitScreen'
import { SucessStatus } from './component/StatusActions/SucessStatus';
import { FailStatus } from './component/StatusActions/FailStatus';
import { WaitingForApproval } from './component/StatusActions/WaitingForApproval';
import {routes} from './component/values/routes'
import CalendarView from './component/Calendar/CalendarView'
import Profile from './component/ProfileEdit/Profile'


const Stack = createStackNavigator()

const App: () => Node = () => {
  
  return (
    <NavigationContainer>
      <Provider store={store}>
        
        <Stack.Navigator>
          <Stack.Screen  name="login" component={Login} options={{header: ()=> null}}/>
          <Stack.Screen  name="register" component={Register} options={{header: ()=> null}}/>
          <Stack.Screen  name="register_medic" component={RegisterMedic} options={{header: ()=> null}}/>
          <Stack.Screen  name="register_ilustrator1" component={RegisterIllustrator} options={{header: ()=> null}}/>
          <Stack.Screen  name="register_viewer" component={Register_Swiper} options={{header: ()=> null}}/>
          <Stack.Screen  name="home" component={Home} options={{header: ()=> null}}/>
          <Stack.Screen  name="registro_diario" component={DailyRegister} options={{header: ()=> null}}/>
          <Stack.Screen  name="registro_sintoma" component={SymptomRegister} options={{header: ()=> null}}/>
          <Stack.Screen  name="avatar_changer" component={AvatarChanger} options={{header: ()=> null}}/>
          <Stack.Screen  name='register_almost' component={RegisterAlmostFinished} options={{header: ()=> null}}/>
          <Stack.Screen  name='wait_screen' component={WaitingForApproval} options={{header: ()=> null}}/>
          <Stack.Screen  name='status' component={SucessStatus} options={{header: ()=> null}}/>
          <Stack.Screen  name='fail' component={FailStatus} options={{header: ()=> null}}/>
          <Stack.Screen  name='calendar' component={CalendarView} options={{header: ()=> null}}/>
          <Stack.Screen  name='profile' component={Profile} options={{header: ()=> null}}/>
        </Stack.Navigator>
      </Provider>

    </NavigationContainer>
  );
};


export default App;
