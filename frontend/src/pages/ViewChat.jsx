import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Chat } from './index.js'
import chat from '../auth/chat'

function ViewChat() {
    const { id } = useParams();
    const [oldchats, setoldChats] = useState([]);
        
    useEffect(() => {
        chat.getOneChat(id).then((data) => {
            setoldChats(data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, id ? [id] : [])
    return (
        <>
           {oldchats.length > 0 ? <Chat olddata={oldchats ? oldchats : []} chatid={id}/> : <Chat/>}
        </>
    )
}

export default ViewChat
