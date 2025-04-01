from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.Models import Sbert


router = APIRouter()

class NLPRequest(BaseModel):
    description: str

class NLPResponse(BaseModel):
    course: list = None
    subject: list = None
    number: list = None



@router.get("/", response_model=NLPResponse)
async def fetch_repo(request: NLPRequest) -> NLPResponse:
    try:
        # Your function call here
        response = await Sbert("First course in calculus and analytic geometry; basic techniques of differentiation and integration with applications including curve sketching; antidifferentation, the Riemann integral, fundamental theorem, exponential and trigonometric functions.")
        return NLPResponse(course = response['names'],subject = response['subjects'], number=response['numbers'])
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing NLP request")
