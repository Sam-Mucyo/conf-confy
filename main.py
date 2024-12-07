from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Quiz data structure
questions = [
    {
        "question": "How do you view human nature?",
        "options": [
            {"text": "People are inherently good and can be guided to virtue", "philosopher": "Mencius"},
            {"text": "People need education and ritual to become good", "philosopher": "Xunzi"},
            {"text": "People should follow the natural way without interference", "philosopher": "Laozi"},
            {"text": "People should focus on practical benefits for society", "philosopher": "Mozi"}
        ]
    },
    {
        "question": "What is the best approach to governance?",
        "options": [
            {"text": "Minimal intervention, letting things follow their natural course", "philosopher": "Laozi"},
            {"text": "Strong institutions and clear social roles", "philosopher": "Xunzi"},
            {"text": "Moral education and leading by example", "philosopher": "Confucius"},
            {"text": "Promoting what benefits all people equally", "philosopher": "Mozi"}
        ]
    },
    {
        "question": "What is the most important virtue?",
        "options": [
            {"text": "Benevolence and human-heartedness (ren)", "philosopher": "Confucius"},
            {"text": "Universal love and impartial care", "philosopher": "Mozi"},
            {"text": "Spontaneity and naturalness", "philosopher": "Zhuangzi"},
            {"text": "Ritual propriety and social order", "philosopher": "Xunzi"}
        ]
    }
]

philosopher_descriptions = {
    "Mencius": "You believe in the inherent goodness of humanity and value compassion and moral growth.",
    "Xunzi": "You value structure, discipline, and the transformative power of education.",
    "Laozi": "You trust in simplicity and the natural flow of life.",
    "Mozi": "You advocate for universal love and practical solutions to benefit society."
}

class QuizResponse(BaseModel):
    answers: List[str]

@app.get("/questions")
async def get_questions():
    return {"questions": questions}

@app.post("/analyze")
async def analyze_responses(response: QuizResponse):
    # Calculate philosopher scores
    philosopher_scores = {}
    for philosopher in response.answers:
        philosopher_scores[philosopher] = philosopher_scores.get(philosopher, 0) + 1
    
    # Find top philosopher
    sorted_philosophers = sorted(
        philosopher_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )
    top_philosopher = sorted_philosophers[0]
    
    # Generate AI response
    # client = Anthropic(api_key=os.getenv("GPT_API_KEY"))
    
    # prompt = f"""Based on the quiz results, the user aligned most with {top_philosopher[0]}'s philosophy.
    # Their scores across philosophers were: {philosopher_scores}.
    # Please provide a personalized 2-paragraph analysis of what this alignment means for their philosophical outlook,
    # incorporating specific aspects of {top_philosopher[0]}'s teachings and how they might apply to modern life."""
    
    # try:
    #     message = client.messages.create(
    #         model="claude-3-sonnet-20240229",
    #         max_tokens=500,
    #         temperature=0.7,
    #         messages=[
    #             {"role": "user", "content": prompt}
    #         ]
    #     )
    #     ai_analysis = message.content
    # except Exception as e:
    #     ai_analysis = f"{philosopher_descriptions[top_philosopher[0]]}"
    
    return {
        "topPhilosopher": top_philosopher[0],
        "scores": sorted_philosophers,
        "aiAnalysis": f"{philosopher_descriptions[top_philosopher[0]]}" # ai_analysis
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
