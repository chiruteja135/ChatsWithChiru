import React, { useState } from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Button,ActivityIndicator} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "../../Firebaseconfig";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

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
      alert("LogIn Successfull")
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const SignUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Registered successfully");
    } catch (error) {
      console.log(error);
      alert("Signin  failed");
    } finally {
      setLoading(false);
    }
  };

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
          <>
          <View style={styles.flexy}>
            <View style={styles.button}>
              <Button onPress={SignIn} title="Login" />
            </View>
            <View style={styles.button}>
              <Button onPress={SignUp} title="Sign Up" />
            </View>
            </View>
          </>
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
  flexy: {
    flexDirection:'column',
    maxWidth:'auto',
    // backgroundColor:'red',
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
    borderRadius: 50,
    margin: 25,
    width: 150,
  },
  signuplink: {
    textDecorationLine: "underline",
    color: "blue",
  },
});
