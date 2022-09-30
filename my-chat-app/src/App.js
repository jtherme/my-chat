import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ConversationsListPage from './pages/ConversationsListPage';
import ConversationPage from './pages/ConversationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1><Link to="/">My Chat</Link>
          </h1>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<ConversationsListPage/>}></Route>
            <Route path="/conversations/:conversationId" element={<ConversationPage/>}></Route>
            <Route path="*" element={<NotFoundPage/>}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

