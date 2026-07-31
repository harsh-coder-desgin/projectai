import { useEffect, useState,useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Chat } from './index.js'
import { ChatNotFound,Navbar } from "../Componets/index.js"
import { UserContext } from "../Context/UserContext.jsx";
import chat from '../auth/chat'

function ViewChat() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [oldchats, setoldChats] = useState([]);
    const [errorpage, seterrorpage] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        chat.getOneChat(id).then((data) => {
            setoldChats(data.data)
        }).catch((error) => {
            if (error.message) {
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
        {errorpage ? <> { user.username.length === 0 && <Navbar/> } <ChatNotFound/> </> :   
        <> {oldchats?.length > 0 ? <Chat olddata={oldchats ? oldchats : []} chatid={id}/> : <Chat/>} </>} 
        </>
    )
}

export default ViewChat
