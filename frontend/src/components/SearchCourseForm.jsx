import React, { useState } from 'react';

const SearchCourseForm = ({ searchCourse }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (description) {
        searchCourse(description);
        setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter course description"
      />
      <button type="submit">Search</button>
    </form>
  );
};

//does not actually search for a course justi mplement the button functionality

export default SearchCourseForm;