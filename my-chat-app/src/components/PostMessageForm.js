import { useState } from "react";
import axios from 'axios';

import { Form, Button } from "react-bootstrap";

function PostMessageForm({conversationId, onPostMessage}) {
  const [text, setText] = useState('');

  const postMessage = async () => {
    const response = await axios.post(`/api/conversation/${conversationId}/message`, {
      text: text,
      sent_by: 'user1'
    });
    setText('');
    onPostMessage(response.data);
  }

  return (
    <Form className="mt-3">
      <Form.Group className="mb-3" controlId="message">
        <Form.Label>New message</Form.Label>
        <Form.Control as="textarea" rows={3} value={text} onChange={e => setText(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={postMessage}>
        Send message
      </Button>
    </Form>
  );
}

export default PostMessageForm;