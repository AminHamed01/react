import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm.trim()); // Remove leading and trailing spaces
  };

  return (
    <Form onSubmit={handleSubmit} inline>
      <FormControl
        type="text"
        placeholder="Search by title"
        className="mr-sm-2"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button type="submit" variant="outline-success">Search</Button>
    </Form>
  );
};

export default SearchBar;
