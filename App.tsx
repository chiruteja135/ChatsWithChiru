import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './App/screens/Login';
import Home from './App/screens/Home';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './Firebaseconfig';
import Signup from './App/screens/SignUp';


const Stack = createNativeStackNavigator();

// const InsideStack = createNativeStackNavigator();

// function InsideLayout() {
//   return (
//     <InsideStack.Navigator>
//       <InsideStack.Screen name="List" component={List} />
//       {/* <InsideStack.Screen name="UsersList" component={UsersList} /> */}
//     </InsideStack.Navigator>
//   )
// }

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  // const [showAppName, setShowAppName] = useState(true);
  // const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="Inside" component={Home} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );


  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Login">
  //       {user ? (
  //       <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
  //       ) : (
  //       <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
  //       )}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}

