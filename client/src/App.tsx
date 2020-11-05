import React from 'react';
import 'antd/dist/antd.css'
import './App.scss';
import {Route, Switch} from "react-router-dom";
import UsersPage from './components/UsersPage/UsersPage'
import Login from './components/Login';
import Register from './components/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from './redux/users-reducer';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Chat from './components/chat/Chat';
import { Layout } from 'antd';

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className="App">
      <Layout style={{minHeight: "100vh", height: "100vh"}}>
        <NavBar />
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/user/:id" component={Profile}/>
            <Route path={["/chat/:id", "/chat"]} component={Chat}/>
            <Route exact path={["/users", "/"]} component={UsersPage}/>
            <Route path={["/"]} component={() => (<h5>404</h5>)}/>
          </Switch>
      </Layout>
    </div>
  )
}

export default App;
