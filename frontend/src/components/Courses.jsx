import React, { useEffect, useState } from 'react';
import SearchCourseForm from './SearchCourseForm';
import UiucSearch from './UiucSearch';
import api from '../api';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState('Please paste in course description');
  const [description, setDescription] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await api.get('/NLP');
      setCourses(response.data.courses);
      setLoading(false);
      //setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  };

  const searchCourse = async () => {
    setHasSearched(true);
    setLoading(true);
    setMessage('Loading courses...')
    try {
      console.log("In react, about to call api")
      await api.post('/NLP', { description });
      fetchCourses();
      console.log("After api call and refreshed the list")
    } catch (error) {
      console.error("Error searching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const CourseTable = ({ courses }) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              <TableCell>{course.subject}</TableCell>
              <TableCell>{course.number}</TableCell>
              <TableCell>
                <a href={`https://courses.illinois.edu/search/schedule/2025/spring/${course.subject}/${course.number}`} target="_blank" rel="noopener noreferrer">
                {course.name}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Stack spacing={2} direction={"row"} >
       <div style={{ width: 250}}>
          <b>Search here for UIUC courses:</b>
          <UiucSearch onCourseSelect={setDescription} />
      </div>
      <Stack spacing={2} style={{ flexGrow: 1 }}>
        <Paper>
            {!hasSearched ? (
              <p>{message}</p>
            ) : loading ? (
              <p>{message}</p>
            ) : (
              <CourseTable courses={courses} />
            )}
        </Paper>
        <SearchCourseForm
          description={description}
          setDescription={setDescription}
          searchCourse={searchCourse}
        />
    </Stack>
  </Stack>
  );
};

export default Courses;