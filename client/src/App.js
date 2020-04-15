//Imports
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateNote from "./components/CreateNote";
import CreateUser from "./components/CreateUser";
import NoteList from "./components/NoteList";
import "./App.css";

//App Component
export const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={NoteList} />
          <Route path="/edit/:id" component={CreateNote} />
          <Route path="/create" component={CreateNote} />
          <Route path="/user" component={CreateUser} />
        </Switch>
      </div>
    </Router>
  );
};

//Export
export default App;
