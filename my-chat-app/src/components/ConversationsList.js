import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import Loading from "./Loading";

const ConversationsList = ({conversations}) => {
  if(!conversations){
    return (
      <Loading/>
    )
  }
  else if(conversations.length < 1) {
    return (
      <p className="text-secondary fst-italic">No conversation!</p>
    )
  }
  
  return (
    <ListGroup>
      {conversations.map(conversation => (
        <ListGroup.Item as={Link} to={`/conversations/${conversation.conversation_id}`} key={conversation.conversation_id} className="d-flex justify-content-between align-items-start">
          {conversation.conversation_title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ConversationsList;