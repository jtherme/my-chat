import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

import NotFoundPage from "./NotFoundPage";
import MessageList from "../components/MessagesList";
import PostMessageForm from "../components/PostMessageForm";

function ConversationPage() {
  const params = useParams();
  const conversationId = params.conversationId;

  const [conversation, setConversation] = useState({});
  useEffect(() => {
    const loadConversation = async () => {
      const response = await axios.get(`/api/conversation/${conversationId}`);
      const c = response.data;
      setConversation(c);
    }
    loadConversation();
  }, [conversationId]);

  if(!conversation){
    return <NotFoundPage/>
  }

  return (
    <div>
      <h2>{conversation.title}</h2>
      <MessageList messages={conversation.messages}/>
      <PostMessageForm conversationId={conversationId} onPostMessage={conversation => setConversation(conversation)}/>
      <p className="mt-3"><Link to="/">Back to conversations</Link></p>
    </div>
  );
}

export default ConversationPage;