import React from 'react';
import { Stack, TextField, Button, Paper } from '@mui/material';

const SearchCourseForm = ({ description, setDescription, searchCourse }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    if (description) {
        searchCourse(description);
        //setDescription(''); //to keep the description from going blank
    }
  };

  return (
    <Stack spacing={1}>
      <form onSubmit={handleSubmit}>
      <Paper>
          <TextField
          id="course-description"
          label="Course Description"
          multiline
          rows={6}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter course description"
          variant="outlined"
          />
      </Paper>
      <Paper sx={{mt: 1}}>
        <Button sx={{color: "white", '&:hover': { backgroundColor: "#E84A27", }}} variant='contained' size ="Large" type="submit" fullWidth>Search</Button>
      </Paper>
      </form>
    </Stack>
  );
};




export default SearchCourseForm;