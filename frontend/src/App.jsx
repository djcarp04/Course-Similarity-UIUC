import React from 'react';
import './App.css';
import Courses from './components/Courses';

function App() {

  return (
    <>
      <div className="App">
      <header className="App-header">
        <h1>Course Similarity Search UIUC</h1>
      </header>
      <main>
        <Courses />
      </main>
    </div>
    </>
  )
}

export default App
