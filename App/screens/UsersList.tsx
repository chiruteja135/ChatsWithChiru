import React, { useState, useEffect } from 'react';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { FIREBASE_DB } from '../../Firebaseconfig'; // Import your Firebase configuration
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Ensure correct import for navigation
import Chatscreen from './Chatscreen';

interface User {
  id: string;
  Name: string;
  Email: string;
  PhoneNumber: number;
}

const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const navigation = useNavigation(); // Ensure correct navigation hook

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
      <FlatList
        data={userList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity   style={styles.itemContainer} onPress={() => navigation.navigate('Chatscreen')}>
            <Text style={styles.text}>
              <Ionicons name="person" size={24} color="#02055A" />{item.Name}
            </Text>
            {/* Other Text elements */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// export default UserList;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  itemContainer: {
    borderWidth: 1,
    padding: 10,
    margin:10,
    width:'95%',
    height:50,
    borderRadius:20,
    backgroundColor:'white',
    flex:2,
  },
  text: {
    fontSize: 16,
    color:'#02055A',
  },
});

export default UserList;



