import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ActivityIndicator } from "react-native";
import { NavigationContainer, NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "../../Firebaseconfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP } from "../../Firebaseconfig";
import Login from "./Login";
import { FIREBASE_DB } from "../../Firebaseconfig";
import { getFirestore, collection } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";



export default function Signup() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState();

  interface RouterProps {
    navigation: NavigationProp<any, any>;
  }

  const SignUp = async ({ navigation }: RouterProps) => {
    setLoading(true);
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email.trim(), password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        setDoc(doc(FIREBASE_DB, "users", user.uid), {
          Name: username,
          Email: email,
          PhoneNumber: phoneno,
          CreatedAt: new Date().toUTCString(),
        });
      })
      .then(() => alert("account created successfully 🎉"))
      .catch((err: any) => {
        alert(err.meassage);
      });
  };


  // const SignUp = async ({ navigation }: RouterProps) => {
  //   setLoading(true);

  //   try {
  //     const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  //     console.log(response);
  //     alert("Registratoin Successfull")
  //     navigation.navigate('Login')
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  //   }

  // return (

  //   <View style={styles.container}>
  //     <Text>

  //       <Text style={styles.login}>Sign up</Text>

  //       <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />

  //       <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />

  //       <TextInput style={styles.input} placeholder="UserName" value={username} onChangeText={(text) => setUsername(text)} />

  //       <TextInput style={styles.input} placeholder="Phoneno" value={phoneno} onChangeText={(text) => setPhoneno(text)} />

  //       <TouchableOpacity onPress={SignUp} style={styles.tob}  >
  //         <Text style={styles.button}><Text>   SignUp</Text></Text>
  //       </TouchableOpacity>

  //       {/* <View style={styles.button}><Button title="Sign UP/ Create New Account" onPress={SignUp}></Button></View> */}


  //       <Text>Are u an existing user?</Text>


  //       <TouchableOpacity >

  //         <Text style={styles.signuplink} onPress={() => { navigation.navigate('Login') }}><Text>click here for Login</Text></Text>

  //       </TouchableOpacity>

  //     </Text>
  //   </View>

  // )

  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.login}>          Sign up</Text>
        <View>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={(text) => setUsername(text)} />
          <TextInput style={styles.input} placeholder="Phone number" value={phoneno} onChangeText={(text) => setPhoneno(text)} />
          <TouchableOpacity onPress={SignUp} style={styles.tob}>
            <Text style={styles.button}>Sign Up</Text>
          </TouchableOpacity>
          <Text>                               Are you an existing user?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signuplink}>Click here for Login</Text>
          </TouchableOpacity>
        </View>
      </Text >
    </View >
  )


}

const styles = StyleSheet.create({
  text:{
    justifyContent:'center',
    alignItems:'flex-end',
    backgroundColor:'green',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
  tob: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    fontSize: 50,
  },
  input: {
    backgroundColor: "lightgrey",
    width: 390,
    borderRadius: 15,
    height: 45,
    textAlign: "center",
    margin: 10,
  },
  button: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: 'royalblue',
    borderRadius: 23,
    width: 100,
    height: 30,
    textAlign: "center",
    margin: 20,
    alignItems: "center",
    justifyContent: 'center',
    alignContent: 'center'
  },
  signuplink: {
    textDecorationLine: "underline",
    color: "blue",
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: "center",
    textAlign: 'center',

  },
});
