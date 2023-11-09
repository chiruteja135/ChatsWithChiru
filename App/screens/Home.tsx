import { View, Text, Button, StyleSheet, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../Firebaseconfig';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Firestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import UsersList from './UsersList';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const Home = ({ navigation }: RouterProps) => {

  const signOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.navigate('Login');       
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to ChatsWithChiru</Text>
        <Text style={styles.subtitle}>Pick a user to chat with</Text>
      </View>
      {<UsersList />}
        <View style={styles.bottomTab}>
          <Text style={styles.icons}>
            <View>
              <TouchableOpacity onPress={signOut}>
                <FontAwesome
                  name="sign-out"
                  size={24}
                  color="white"
                  style={(styles.tabIcon)}
                />
              </TouchableOpacity></View>
          </Text>
        </View>
    </View>
  );

};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    top: 0,
    width: '100%',
    height: 105,
    backgroundColor: 'royalblue',
    justifyContent: "center",
    alignItems: 'center',
    fontWeight: 200,
    opacity: 5,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  title: {
    fontSize: 30,
    color: 'white',
  },
  subtitle:{
    margin:5,
    fontSize:20,
    color:'white',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: 'royalblue',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',

  },
  tab: {
    margin: 5,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tabIcon: {
    height: 30,
    width: 30,
  },
  icons: {
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
