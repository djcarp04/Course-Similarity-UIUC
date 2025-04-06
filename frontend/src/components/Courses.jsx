import React, { useEffect, useState } from 'react';
import SearchCourseForm from './SearchCourseForm';
import api from '../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await api.get('/NLP');
      setCourses(response.data.courses);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  };

  const searchCourse = async (description) => {
    try {
      await api.post('/NLP', { description: description });
      fetchCourses();  // Refresh the list after adding a fruit
    } catch (error) {
      console.error("Error searching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {courses.length === 0 ? (
            <p>{message}</p> // Display message when courses are empty
          ) : (
            <ul>
              {courses.map((course, index) => (
                <li key={index}>
                  {course.subject} {course.number} - {course.name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <SearchCourseForm searchCourse={searchCourse} />
    </div>
  );
};

export default Courses;