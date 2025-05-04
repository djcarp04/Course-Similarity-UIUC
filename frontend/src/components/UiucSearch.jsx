import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import courseData from './courses.json';

const filterOptions = createFilterOptions({
    limit: 3,
});

const UiucSearch = ({ }) => {

    const [courses, setCourses] = useState(['']);

    useEffect(() => {
    fetch('/data/courses.json')
        .then(res => res.json())
        .then(data => {
        const formatted = data.map((course) => ({
            label: course.Name,
            description: course.Description,
        }));
        setCourses(formatted);
        });
    }, []);

    const UiucSearch = () => (
        <Autocomplete
        placeholder="Outlined variant (default)"
        id="autocomplete"
        freeSolo
        autoSelect
        filterOptions={filterOptions}
        options={courseData}
        getOptionLabel={(option) => option.Name}
        onChange={(e, courses) => {
            if (courses) onCourseSelect(courses.Description);
        }}
        renderInput={params => (
            <TextField
            {...params}
            label="freeSolo"
            margin="normal"
            variant="outlined"
            fullWidth
            />
        )}
        />
    );
};


  export default UiucSearch;