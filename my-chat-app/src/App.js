import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ConversationsListPage from './pages/ConversationsListPage';
import ConversationPage from './pages/ConversationPage';
import NotFoundPage from './pages/NotFoundPage';

import { Container, Row, Navbar } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            My Chat
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <main>
            <Routes>
              <Route path="/" element={<ConversationsListPage/>}></Route>
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

