import React, {useEffect} from 'react'
import 'antd/dist/antd.css';
import './App.scss';

import { useSelector } from 'react-redux';

import {
  Switch,
  Route,
  Redirect,
  Router
} from "react-router-dom";
import { notification } from 'antd';

import history from './history';
import PrivateRoute from 'HOC/PrivateRoute';

import SignUp from 'Pages/SignUp';
import SignIn from 'Pages/SignIn';
import Home from 'Pages/Home';
import Student from 'Pages/Student';
import Footer from 'containers/Footer';


function App() {

  const {errors} = useSelector((state) => state.errors)

  useEffect(() => {
    if(errors){
      errors.forEach((error) => {
        notification.error({
          message: error.message,
          placement: "bottomRight"
        });
      })
    }
  },[errors]);

  

  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/home"/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/signin" component={SignIn}/>
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/student" component={Student} />
      </Switch>
      <Footer />
    </Router>
    
  );
}

export default App;
