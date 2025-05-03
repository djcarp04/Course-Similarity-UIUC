import React, { useEffect, useState } from 'react';
import SearchCourseForm from './SearchCourseForm';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import api from '../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState('Please paste in course description');

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

  const searchCourse = async (description) => {
    setHasSearched(true);
    setLoading(true);
    setMessage('Loading courses...')
    try {
      console.log("In react, about to call api")
      await api.post('/NLP', { description: description });
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
    <Stack spacing={2}>
      <Paper>
          {!hasSearched ? (
            <p>{message}</p>
          ) : loading ? (
            <p>{message}</p>
          ) : (
            <CourseTable courses={courses} />
          )}
      </Paper>
      <SearchCourseForm searchCourse={searchCourse} />
  </Stack>
  );
};

export default Courses;