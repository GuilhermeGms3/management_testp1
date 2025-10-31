from fastapi import FastAPI
from .database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from .routers import appointment, customers, finance, chatbot
from .models import store, user, finance as finance_models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(appointment.router)
app.include_router(customers.router)
app.include_router(finance.router)  # <-- router do routers/finance.py
app.include_router(chatbot.router, prefix="/bot")

@app.get("/")
@app.get("/h")
async def health():
    return {"message": "Hello World"}
