import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/common/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import { Route, Switch, Redirect } from "react-router-dom";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/login" component={LoginForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="Movies" />
            <Redirect to="/not-found" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
