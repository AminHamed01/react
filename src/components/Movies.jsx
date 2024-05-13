import React, { useState, useEffect } from 'react';
import { getallMovies } from '../services/api';
import { Movie } from './Movie';
import { Container, Row, Alert } from 'react-bootstrap'; 
import SearchBar from './SearchBar'; 

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getallMovies();
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      if (!searchTerm) {
        fetchData();
        return;
      }

      const response = await getallMovies();
      const searchData = response.data.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (searchData.length === 0) {
        setSearchError(true);
        setMovies([]);
      } else {
        setMovies(searchData);
        setSearchError(false); 
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Container>
        <SearchBar onSearch={handleSearch} />
        {searchError ? ( 
          <Alert variant="warning">No result found</Alert>
        ) : (
          <Row xs={12} md={8}>
            {movies.map((movie) => (
              <Movie
                movie={movie}
                key={movie.id}
              />
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Movies;
