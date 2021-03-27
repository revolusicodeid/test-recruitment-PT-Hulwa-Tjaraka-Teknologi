import React, {useContext} from "react";
import SignIn from '../../Layout/Auth/SignIn';
import { Route, Switch, Redirect } from "react-router-dom";
import SignUp from "../../Layout/Auth/SignUp";
import Home from "../../Admin/Home/Home";
import Content from "../../Layout/Main/Content";
import Order from "../../Admin/Order/Order";
import User from "../../Admin/User/User";
import ProgressBar from '../../Layout/Main/ProgressBar';
import { ProgressContext } from "../Context/ProgressContext";
import { AuthContext } from '../../Service/Context/AuthContext';

const AppRoute = () => {
    const progress = useContext(ProgressContext);
    const { isAuthenticated } = useContext(AuthContext);
    const checkAuth = localStorage.getItem("isAuthenticated") === null || localStorage.getItem("isAuthenticated") === false ? isAuthenticated : localStorage.getItem("isAuthenticated") ;
    return(
        <main>
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/sign-up"  component={SignUp} />
            {
            checkAuth ? 
                <Route path="/home" render={() => (
                  <Content Layout={Home}/>
                )} />
              : <Redirect to="/" />
            }
            {
            checkAuth ? 
              <Route path="/users" render={() => (<Content Layout={User}/>)} />
              : <Redirect to="/" />
            }
            {
            checkAuth ? 
              <Route path="/orders" render={() => (<Content Layout={Order}/>)} />
              : <Redirect to="/" />
            }
          </Switch>
          <ProgressBar totalProgress={progress.progress} showProgress={progress.showProgress} />
        </main>
    )
};

export default AppRoute;