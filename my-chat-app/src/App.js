import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Container, Row, Navbar } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';

import ConversationsListPage from './pages/ConversationsListPage';
import ConversationPage from './pages/ConversationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  
  const userId = 'user1';
  const [user, setUser] = useState({});
  useEffect(() => {
    const loadUser = async () => {
      const response = await axios.get(`/api/user/${userId}`);
      const u = response.data;
      setUser(u);
    }
    loadUser();
  }, [userId]);
  
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            My Chat - {user.username}
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <main>
            <Routes>
              <Route path="/" element={<ConversationsListPage user={user}/>}></Route>
              <Route path="/conversations/:conversationId" element={<ConversationPage/>}></Route>
              <Route path="*" element={<NotFoundPage/>}></Route>
            </Routes>
          </main>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;

