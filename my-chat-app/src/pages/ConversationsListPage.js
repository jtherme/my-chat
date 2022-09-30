import ConversationsList from "../components/ConversationsList";
import conversations from "./conversations-content";

function ConversationsListPage() {
  return (
    <>
      <h2>Your conversations</h2>
      <ConversationsList conversations={conversations}/>
    </>
  );
}

export default ConversationsListPage;