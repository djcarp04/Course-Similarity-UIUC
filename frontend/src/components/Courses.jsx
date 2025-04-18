import React, { useEffect, useState } from 'react';
import SearchCourseForm from './SearchCourseForm';
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
      fetchCourses();  // Refresh the list after adding a fruit
      console.log("After api call and refreshed the list")
    } catch (error) {
      console.error("Error searching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
        <>
          {!hasSearched ? (
            <p>{message}</p> // Display message when courses are empty
          ) : loading ? (
            <p>{message}</p>
          ) : (
            <ol>
              {courses.map((course, index) => (
                <li key={index}>
                  {course.subject} {course.number} - {course.name}
                </li>
              ))}
            </ol>
          )}
        </>
      <SearchCourseForm searchCourse={searchCourse} />
    </div>
  );
};

export default Courses;