import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateNote from "./components/Notes/CreateNote";
import CategoryForm from "./components/Notes/CategoryForm";
import NoteList from './components/Notes/NotesList';
import EditNote from './components/Notes/EditNote';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/create-note">
          <CreateNote />
        </Route>
        <Route exact path="/create-category">
          <CategoryForm />
        </Route>
        {/* <Route exact path="/note-list">
          <NoteList />
        </Route> */}
        <Route exact path="/categories/:categoryId">
          <NoteList />
        </Route>
        <Route exact path="/notes/:id">
          <EditNote />
        </Route>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
