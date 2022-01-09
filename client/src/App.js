import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import './App.css';
import 'stream-chat-react/dist/css/index.css';
import { ChannelListContainer, ChannelContainer,Auth } from './components';
const API_KEY = '6jppk2mezjae';

const cookies = new Cookies()
const authToken = cookies.get("token");
const client  =  StreamChat.getInstance(API_KEY)

if(authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

const darkModeTheme = {
  '--bg-gradient-end': '#101214',
  '--bg-gradient-start': '#070a0d',
  '--black': '#ffffff',
  '--blue-alice': '#00193d',
  '--border': '#141924',
  '--button-background': '#ffffff',
  '--button-text': '#005fff',
  '--grey': '#7a7a7a',
  '--grey-gainsboro': '#2d2f2f',
  '--grey-whisper': '#1c1e22',
  '--modal-shadow': '#000000',
  '--overlay': '#00000066',
  '--overlay-dark': '#ffffffcc',
  '--shadow-icon': '#00000080',
  '--targetedMessageBackground': '#302d22',
  '--transparent': 'transparent',
  '--white': '#101418',
  '--white-smoke': '#13151b',
  '--white-snow': '#070a0d',
};



function App() {


  //chats can be of type team or message
  const [createType, setCreateType] = useState('');
  //flag to indicate when creating a new chat 
  const [isCreating, setIsCreating] = useState('');
  //flag to indicate when editing
  const [isEditing, setIsEditing] = useState('')


  if(!authToken) {return <Auth />}
  return (
    <div className="app__wrapper">
      <Chat client={client} theme='team light'>
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          createType={createType}  
        
        
        
        
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType} 
        />
      </Chat>
      
    </div>
  );
}

export default App;
