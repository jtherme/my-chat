import { Link } from "react-router-dom";

const ConversationsList = ({conversations}) => {
  return (
    <>
      {conversations.map(conversation => (
        <Link key={conversation.name} className="conversation-list-item" to={`/conversations/${conversation.name}`}>
          <h3>{conversation.title}</h3>
        </Link>
      ))}
    </>
  );
}

export default ConversationsList;