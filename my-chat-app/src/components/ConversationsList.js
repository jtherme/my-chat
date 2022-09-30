import { Link } from "react-router-dom";
import { ListGroup, Badge } from "react-bootstrap";

const ConversationsList = ({conversations}) => {
  return (
    <ListGroup>
      {conversations.map(conversation => (
        <ListGroup.Item as={Link} to={`/conversations/${conversation.name}`} key={conversation.name} className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{conversation.title}</div>
            ...{conversation.messages[conversation.messages.length - 1].text}
          </div>
          <Badge bg="primary" pill>
            {conversation.messages.length}
          </Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ConversationsList;