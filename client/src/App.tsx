import React from 'react';
import './App.scss';
import "antd/dist/antd.css";
import {Route, Switch} from "react-router-dom";
import Users from './components/Users'
import Login from './components/Login';
import Register from './components/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from './redux/users-reducer';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Chat from './components/chat/Chat';
import openSocket from 'socket.io-client'

export const socket = openSocket('http://localhost:5000')

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className="App">
    <header>
      <div className="container">
        <NavBar />
      </div>
      </header>
    <div className="content">
      <div className="container">
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/user/:id" component={Profile}/>
          <Route path={["/chat/:id", "/chat"]} component={Chat}/>
          <Route path={["/users", "/"]} component={Users}/>
        </Switch>
      </div>
    </div>
  </div>
  )
}

export default App;
