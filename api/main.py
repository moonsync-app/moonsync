from http.client import HTTPException

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec
from pydantic import BaseModel
from starlette.responses import StreamingResponse
from dotenv import load_dotenv
import os

app = FastAPI()

# Load the .env file
load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY') or 'OPENAI_API_KEY'
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY') or 'OPENAI_API_KEY'

client = OpenAI(api_key=OPENAI_API_KEY)
pinecone = Pinecone()

origins = [
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def main_route():
  return {"message": "Hey, It is me Rui"}

@app.get("/openai/")
async def create_completion():
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
            {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
        ]
    )

    return {"message": completion.choices[0].message.content}

@app.get("/pinecone/test")
async def test_pinecone():
    index_list = pinecone.list_indexes()

    index_name = index_list[0]['name']
    dimension = index_list[0]['dimension']

    return {"index_name": index_name, "dimension": dimension}
