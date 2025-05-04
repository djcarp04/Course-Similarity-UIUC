import React from 'react';
import './App.css';
import Courses from './components/Courses';
import { Container, Typography, Box } from '@mui/material';

function App() {

  return (
    <Box>
      <Container>
        <>
          <div className="App">
          <header className="App-header">
          <Typography variant="h3" gutterBottom style={{ marginBottom: 16 }} sx={{ color: "#003366", mb: 2 }}>
            Course Similarity Search UIUC
          </Typography>
          </header>
          <main>
            <Courses />
          </main>
        </div>
        </>
      </Container>
    </Box>
  )
}

export default App
