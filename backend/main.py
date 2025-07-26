from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_URL = "https://api.frankfurter.app"

@app.get("/currencies")
async def get_currencies():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_URL}/currencies")
        return response.json()

@app.get("/convert")
async def convert(from_currency: str, to_currency: str, amount: float):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{API_URL}/latest?amount={amount}&from={from_currency}&to={to_currency}"
        )
        return response.json()
