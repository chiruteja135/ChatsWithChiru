import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

interface User {
  _id: number;
  name: string;
  avatar: string;
}

const Chatscreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        } as User,
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages: IMessage[] = []) => onSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Chatscreen;
