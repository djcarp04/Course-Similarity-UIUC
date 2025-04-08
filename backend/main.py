import uvicorn
from flask import Flask, render_template, jsonify
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.Models import *
from typing import List

app = FastAPI(debug=True)


#uvicorn main:app --reloadfede

'''
json({
'subject': subject
'number': number
'course': name
})
'''

class NLPRequest(BaseModel):
    description: str

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

coursesdb = {"courses": []}


@app.get("/NLP")
def fetch():
    if not coursesdb["courses"]:
        return NLPResponse(
            courses=coursesdb["courses"], 
            message="Please paste in course description"
        )
    else:
        return NLPResponse(
            courses=coursesdb["courses"], 
            message="Most similar courses at UIUC:"
        )

@app.post("/NLP", response_model=NLPResponse)
def search_courses(request: NLPRequest) -> NLPResponse:
    #Clear coursesdb every time?
    coursesdb['courses'] = []
    try:
        print("About to call python function")
        response = Sbert(request.description)
        print("Finished python function call")
        for course in response.courses:
            coursesdb['courses'].append(course)
        print("appened courses to coursesdb")
        return NLPResponse(courses=coursesdb["courses"], message="Returning from python")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing NLP request")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


#l = Sbert("First course in calculus and analytic geometry; basic techniques of differentiation and integration with applications including curve sketching; antidifferentation, the Riemann integral, fundamental theorem, exponential and trigonometric functions.")
#"First course in calculus and analytic geometry; basic techniques of differentiation and integration with applications including curve sketching; antidifferentation, the Riemann integral, fundamental theorem, exponential and trigonometric functions."