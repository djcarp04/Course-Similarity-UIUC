import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import courseData from './courses.json';

const filterOptions = createFilterOptions({
    limit: 5
});

const UiucSearch = ({ onCourseSelect }) => {
    
    const [courses, setCourses] = useState(['']);

    useEffect(() => {
    fetch('/data/courses.json')
        .then(res => res.json())
        .then(data => {
            setCourses(data);
        });
    }, []);

    return(
        <Autocomplete
            //placeholder="Start typing for UIUC course"
            id="autocomplete"
            size='medium'
            //freeSolo
            autoSelect
            filterOptions={filterOptions}
            options={courseData}
            getOptionLabel={(option) => option.Name}
            onChange={(e, courses) => {
                if (courses) onCourseSelect(courses.Description);
            }}
        />
    );
};

export default UiucSearch;