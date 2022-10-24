import { useState } from "react";
import axios from 'axios';

import { Form, Button, Modal } from "react-bootstrap";
import Loading from "./Loading";

function CreateConversationModal({creator, contacts, onCreateConversation}) {
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState([creator]);
  const [show, setShow] = useState(false);

  const createConversation = async () => {
    const response = await axios.post('/api/conversation', {
      title: title,
      users: users
    });
    setTitle('');
    setUsers([creator]);
    handleClose();
    onCreateConversation({
      conversation_id: response.data._id,
      conversation_title: response.data.title
    });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckboxChange = event => {
    let newArray = [...users, event.target.id];
    if (users.includes(event.target.id)) {
      newArray = newArray.filter(user => user !== event.target.id);
    } 
    setUsers(newArray);
  };

  if(!contacts){
    return <Loading/>
  }

  return (
    <>
      <div className="mt-3"><Button variant="primary" onClick={handleShow}>New conversation</Button></div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="contacts">
              {contacts.map((contact) => (
                <Form.Check key={contact} type="checkbox" label={contact} name="contacts" id={contact} onChange={handleCheckboxChange}/>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createConversation}>
            Create conversation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateConversationModal;