import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';

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
    <Paper>
    <form onSubmit={handleSubmit}>
      <TextField
      id="course-description"
      label="Course Description"
      multiline
      rows={3.5}
      fullWidth
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter course description"
      variant="outlined"
    />
      <Button size ="Large" type="submit" fullWidth>Search</Button>
    </form>
    </Paper>
  );
};

//does not actually search for a course just implement the button functionality

export default SearchCourseForm;