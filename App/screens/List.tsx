import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import Details from './Details';
import { FIREBASE_AUTH } from '../../Firebaseconfig';

interface RouterProps {
    navigation: NavigationProp<any,any>;
}

const List = ({ navigation}: RouterProps) => {
  return (
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
      <Button onPress={()=> navigation.navigate('Details')} title='Open details'/>
      <Button onPress={()=> FIREBASE_AUTH.signOut()} title='Logout'/>
    </View>
  )
}

export default List