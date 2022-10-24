import { ListGroup } from "react-bootstrap";
import Loading from "./Loading";

function MessageList({messages}) {
  if(!messages){
    return (
      <Loading/>
    )
  }
  else if(messages.length < 1) {
    return (
      <p className="text-secondary fst-italic">No message!</p>
    )
  }

  return (
    <ListGroup>
      {messages.map((message, i) => (
        <ListGroup.Item key={message.sent_by + message.sent_at}><span className="text-secondary fst-italic">{message.sent_by} at {new Date(message.sent_at).toLocaleString()}:</span> {message.text}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default MessageList;