import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/chats' component={ChatPage} />
      </Switch>
    </div>
  );
}

export default App;
//cd backend --- npm run start
//cd frontend --- npm run start 
// mongodb --- chat-appDB
