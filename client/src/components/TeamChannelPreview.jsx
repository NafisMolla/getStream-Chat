import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react';


const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    //this shows all the channels 
    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );
    

    //this shows all the dms
    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    
        console.log(members[0]);

        return (
            <div className="channel-preview__item single">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }
    
    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {/* depending on the role the correct view will be shown */}
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    )
}

export default TeamChannelPreview
