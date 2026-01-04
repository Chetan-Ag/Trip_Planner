from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import auth, trips, search, community, budget, admin

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Travel Planner API", 
    version="1.0.0",
    description="Secure Travel Planning API"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(trips.router)
app.include_router(search.router)
app.include_router(community.router)
app.include_router(budget.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Travel Planner API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}