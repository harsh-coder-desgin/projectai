import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Chat } from './index.js'
import { ChatNotFound,Navbar } from "../Componets/index.js"
import chat from '../auth/chat'
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

function ViewChat() {
    const { user, setUser } = useContext(UserContext);
    const { id } = useParams();
    const [oldchats, setoldChats] = useState([]);
    const [errorpage, seterrorpage] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        chat.getOneChat(id).then((data) => {
            setoldChats(data.data)
        }).catch((error) => {
            console.log(error.message);
            // if (error.message === "Chat not found" || "User data not found") {
            if (error.message) {
            // if  errror.message !== internal server 
                seterrorpage(true)
            }            
        }).finally(() => {  
            setLoading(false);
        });
    }, id ? [id] : [])

    if (loading) {
        return null;
    }

    return (
        <>
        {errorpage ? <>{user.username.length === 0 && <Navbar/>} <ChatNotFound/> </>:   
         <> {oldchats?.length > 0 ? <Chat olddata={oldchats ? oldchats : []} chatid={id}/> : <Chat/>}</>} 
        </>
    )
}

export default ViewChat
