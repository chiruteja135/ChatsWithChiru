import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "../../Firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Signup from "./SignUp";

const Stack = createNativeStackNavigator();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const SignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      // alert("LogIn Successfull")
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />
      <Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.container}>
            <TouchableOpacity onPress={SignIn} style={styles.tob}  >
              <Text style={styles.button}>     login</Text>
            </TouchableOpacity>

            <Text>Are you a new user?</Text>

            <TouchableOpacity onPress={() => {navigation.navigate('Signup')}}>
              <Text style={styles.signuplink}>Click here to sign up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tob: {
    justifyContent:'center',
    alignItems:'center'

  },
  login: {
    margin: 35,
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
    color:'white',
    fontSize:20,
    fontWeight:'500',
    backgroundColor:'royalblue',
    borderRadius:23,
    width:100,
    height:30,
    textAlign:"justify",
    margin:20,
    alignItems:"center", 
    justifyContent:'center',
    alignContent:'center'
  },
  signuplink: {
    textDecorationLine: "underline",
    color: "blue",
    margin:10,
    padding:15,
  },
});
