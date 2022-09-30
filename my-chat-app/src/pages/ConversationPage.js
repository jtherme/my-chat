import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import NotFoundPage from "./NotFoundPage";
import conversations from "./conversations-content";

function ConversationPage() {
  const params = useParams();
  const conversationId = params.conversationId;
  const conversation = conversations.find(conversation => conversation.name === conversationId);

  if(!conversation){
    return <NotFoundPage/>
  }

  return (
    <div>
      <h2>{conversation.title}</h2>
      <ListGroup>
      {conversation.messages.map((message, i) => (
        <ListGroup.Item key={i}>{message.sender} : {message.text}</ListGroup.Item>
      ))}
      </ListGroup>
      <Link to="/">Back to conversations</Link>
    </div>
  );
}

export default ConversationPage;