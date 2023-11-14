import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../Firebaseconfig';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';

interface ChatscreenProps {
  route: {
    params?: {
      userId?: string;
      userName?: string;
    };
  };
}

const Chatscreen: React.FC<ChatscreenProps> = ({ route }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const user = FIREBASE_AUTH.currentUser;
  const { userId, userName } = route.params || {};

  useEffect(() => {
    console.log('Using useEffect with userId:', userId);

    if (!userId) {
      console.warn('UserId is empty or undefined. Params:', route.params);
    }

    const { user1, user2 } = generateChatRoomId(user?.uid || '', userId);
    const chatRef = collection(FIREBASE_DB, 'chats', user1, user2);
    const q = query(chatRef, orderBy('createdAt'));

    console.log('Subscribing to chat messages...');

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessages: IMessage[] = snapshot.docs.map((doc) => doc.data() as IMessage);
      console.log('Received updated messages:', updatedMessages);
      setMessages(updatedMessages.reverse());
    });

    return () => {
      console.log('Unsubscribing from chat messages...');
      unsubscribe();
    };
  }, [userId]);

  const onSend = async (newMessages: IMessage[] = []) => {
    if (userId) {
      const { user1, user2 } = generateChatRoomId(user?.uid || '', userId);
      const chatRef = collection(FIREBASE_DB, 'chats', user1, user2);

      console.log('Sending new messages:', newMessages);

      newMessages.forEach(async (message) => {
        const createdAt = message.createdAt instanceof Date ? message.createdAt.getTime() : message.createdAt;

        await addDoc(chatRef, {
          _id: message._id,
          text: message.text,
          createdAt,
          user: {
            _id: user?.uid || '',
            name: user?.displayName || '',
            avatar: user?.photoURL || '',
          },
        });
      });
    }
  };

  const generateChatRoomId = (userId1: string, userId2: string) => {
    return userId1 < userId2 ? { user1: userId1, user2: userId2 } : { user1: userId2, user2: userId1 };
  };

  console.log('Rendering Chatscreen...');

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: user?.uid || '',
        name: user?.displayName || '',
        avatar: user?.photoURL || '',
      }}
    />
  );
};

export default Chatscreen;
