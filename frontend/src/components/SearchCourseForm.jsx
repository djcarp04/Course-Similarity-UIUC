import React, { useState } from 'react';

const SearchCourseForm = ({ searchCourse }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (description) {
        searchCourse(description);
        //setDescription(''); //to keep the description from going blank
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter course description"
        rows={4}
        cols={50}
      />
      <button type="submit">Search</button>
    </form>
  );
};

//does not actually search for a course justi mplement the button functionality

export default SearchCourseForm;