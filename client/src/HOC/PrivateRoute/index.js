import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { currentuser } from 'utils/currentUser';

const PrivateRoute = ({component: Component, ...rest}) => {

  const {currentUser} = useSelector(state => state.auth);

  const auth = currentUser || currentuser.get;
  return (
    <Route 
      {...rest}
      render={props => !auth ? <Redirect to="/signin"/> : <Component {...props} />}
    />
  )
}

export default PrivateRoute
