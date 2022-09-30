import { useParams } from "react-router-dom";
import conversations from "./conversations-content";

function ConversationPage() {
  const params = useParams();
  const conversationId = params.conversationId;
  const conversation = conversations.find(conversation => conversation.name === conversationId);

  return (
    <h2>Conversation {conversation.title}</h2>
  );
}

export default ConversationPage;