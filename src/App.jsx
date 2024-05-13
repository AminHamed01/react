import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/Movies';
import { NavigationBar } from "./components/NavigationBar";
import { Container } from "react-bootstrap";
import NotFound from "./components/NotFound";
import MovieDetails from "./components/MovieDetails"; 
import { FormMovie } from "./components/FormMovie";
import { UpdateMovie } from "./components/UpdateMovie";
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from "./redux/slices/store"; 
import Wishlist from "./components/Wishlist";

function App() {
  return (
    <Provider store={store}> {/* Wrap your app with Provider and pass the Redux store */}
      <Router>
        <NavigationBar />
        <Container fluid>
          <Routes>
            <Route path="/list" element={<Movies />} />
            <Route path=":id" element={<MovieDetails />} />
            <Route path="add" element={<FormMovie />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route
                   path="update/:id"
                  element={<UpdateMovie action="update" />}
                      />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
