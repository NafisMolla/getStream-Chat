import React, {useState} from 'react'
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}


const CreateChannel = ({ createType, setIsCreating }) => {
    //getting the clients and setActiveChannel from getStream
    const { client, setActiveChannel } = useChatContext();
    //setting the selectedUsers that will be used for creating the channel
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    //setting the channel name
    const [channelName, setChannelName] = useState('');


    const createChannel = async (e) => {
        e.preventDefault();

        try {
            //sending http request to getStream to make a new channel for client with only client in it 
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            });
            //wating for getStream to finish processing
            await newChannel.watch();

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            {/* displays all the users available in the chat app */}
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
        </div>
    )
}

export default CreateChannel
