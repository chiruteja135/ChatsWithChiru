  import React, { useEffect, useState } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import Login from './App/screens/Login';
  import Home from './App/screens/Home';
  import { User, onAuthStateChanged } from 'firebase/auth';
  import { FIREBASE_AUTH } from './Firebaseconfig';
  import Signup from './App/screens/SignUp';
  import Chatscreen from './App/screens/Chatscreen';
  
  const Stack = createNativeStackNavigator();
  
  export default function App() {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log('user', user);
        setUser(user);
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);
  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "Inside" : "Login"}>
          {user ? (
            <>
              <Stack.Screen name="Inside" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="Chatscreen" component={Chatscreen} options={{ headerShown: false }}/>
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
