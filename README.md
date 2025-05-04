# Course Similarity @ UIUC  
*A Natural Language Processing project by Daniel Carpenter – AI/ML Intern at ATLAS*

This project provides an interactive web application for identifying similar UIUC courses using course description text. By leveraging NLP models and a modern React frontend, users can input a course description or specific course features and receive a ranked list of related courses offered at the University of Illinois Urbana-Champaign.

---

## Getting Started

### 1. Clone the Repository  
```bash
git clone <your-repo-url>
cd course-similarity-uiuc
```

### 2. Set up backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
* This will start the FastAPI server on http://localhost:8000.
* Ensure you have Python 3.8+ and pip installed.

### Set up frontend
```bash
cd ../frontend
npm install
npm install @mui/material @mui/joy @emotion/react @emotion/styled
npm run dev
```
* This will start the frontend on http://localhost:5173.

---

## Tech Stack

| Area     | Technology             |
| -------- | ---------------------- |
| Frontend | React, Javascript, MUI |
| Backend  | FastAPI, Python        |
| NLP      | Sentence Transformers  |

---

## Project Structure
```graphql
course-similarity-uiuc/
│
├── backend/               # FastAPI backend
│   ├── main.py            # API routes and logic
│   ├── models/            # NLP funcitonality
│   └── data/              # Data tranformation raw->processed course data
│
├── frontend/              # React app (Vite)
│   ├── components/        # UI components (Autocomplete, Search, Table)
│   ├── App.jsx            # Main entry point
│   └── api.js             # Axios instance for API requests (routes stored in backend)
```

---

## Future Improvements
* Incorporate a LLM feature to offer more feedback on which courses are most similar
* Filter by department, level, credits, etc...
* Improve the NLP model or frontend logic to support typo-tolerant search
* Let users select two or more courses and compare them side-by-side