import { useState } from "react";

import ConversationsList from "../components/ConversationsList";
import CreateConversationModal from "../components/CreateConversationModal";
import Loading from "../components/Loading";

function ConversationsListPage({user}) {
  const [conversations, setConversations] = useState(user.conversations);

  const addNewConversation = (newConversation) => {
    setConversations([...conversations, newConversation]);
  };
  
  if(!user){
    return <Loading/>
  }
  
  return (
    <>
      <h2>Your conversations</h2>
      <ConversationsList conversations={user.conversations}/>
      <CreateConversationModal creator={user.username} contacts={user.contacts} onCreateConversation={conversation => addNewConversation(conversation)}/>
    </>
  );
}

export default ConversationsListPage;