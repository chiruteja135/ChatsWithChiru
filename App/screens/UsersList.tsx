// import { View, Text,StyleSheet, FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FIREBASE_DB } from '../../Firebaseconfig';
// import { FIREBASE_AUTH } from '../../Firebaseconfig';
// import { doc, getDoc } from "firebase/firestore";

// const UsersList = () => {
//   // const [users,serUsers]=useState([])
//   // useEffect(()=>{
//   //   getUsers();
//   // },[]);


//   // const getUsers= async()=>{
//   //   const email =await AsyncStorage.getItem('EMAIL');
//   //   FIREBASE_DB()
//   //   .collection("users")
//   //   .where("email", "!=",email)
//   //   .get()
//   //   .then(res=>{
//   //     if (res.docs != []{
//   //       serUsers(res.docs);
//   //     })
//   //     console.log(JSON.stringify(res.docs[0],data()));
//   //     });
 
//   const [userInfo, setUserInfo] = useState<any | undefined>(null);
//   const getData = async () => {
//     const docRef = doc(FIREBASE_DB, "users", "Name");
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       console.log("Document data:", docSnap.data());
//       setUserInfo(docSnap.data());
//     } else {
//       console.log("No such document!");
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.header}>Arey beta</Text>
//       </View>
//     </View>
//   )
// }

// export default UsersList

import React, { useState, useEffect } from 'react';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { FIREBASE_DB } from '../../Firebaseconfig'; // Import your Firebase configuration
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Chatscreen } from './Chatscreen';
import { useNavigation } from '@react-navigation/native';

interface User {
  id: string;
  Name: string;
  Email: string;
  PhoneNumber: string;
  // Add more fields as per your data structure
}
const navigation=useNavigation();
const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      
      const usersCollection = collection(FIREBASE_DB, 'users');

      const usersSnapshot = await getDocs(usersCollection);

      const usersData: User[] = [];
      usersSnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as User);
      });

      setUserList(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Pick the user to chat with</Text> */}
      <FlatList
        data={userList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress ={Chatscreen} style={styles.itemContainer}>
            
            <Text style={styles.text}><Ionicons name="person" size={54} color="royalblue" />{item.Name}</Text>
            {/* <Text style={styles.text}>Name: {item.Name}</Text> */}
            {/* <Text style={styles.text}>Email: {item.Email}</Text>
            <Text style={styles.text}>PhoneNumber: {item.PhoneNumber}</Text> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    // height: 16,
    // justifyContent: 'center',
    // alignItems: 'center',
    // // borderBottomWidth: 2,
    // width: '100%',
    // backgroundColor: 'yellow',
    // // elevation: 5,
    // // fontSize: 20,
    // // color: 'royalblue',
    // // fontWeight: '600',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    margin:20,
    width:'90%',
    height:80,
    borderRadius:20,
    backgroundcolor:'skyblue',
    // alignItems:'center',
    // justifyContent:'center',
    flex:1,
    // flexDirection:'column',

  },
  text: {
    fontSize: 36,
    color: 'royalblue',
  },
});

export default UserList;



