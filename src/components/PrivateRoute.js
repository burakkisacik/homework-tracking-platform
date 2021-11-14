import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser.name.length > 0 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
