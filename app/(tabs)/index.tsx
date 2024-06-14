import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack=createNativeStackNavigator();
import Login from '../Screens/Login'
import SignUp from '../Screens/Signup';
import Success from '../Screens/Success';

const index = () => {
  return (
   <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" options={{headerShown:false}} component={Login}/>
      <Stack.Screen name="Signup" options={{headerShown:false}} component={SignUp}/>
      <Stack.Screen name="Success" options={{headerShown:false}} component={Success}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default index

const styles = StyleSheet.create({})