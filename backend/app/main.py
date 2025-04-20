from  fastapi import FastAPI
from app.routers import authors, posts
from app.db.database import init_db
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async  def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost",
    "https://localhost",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authors.router)
app.include_router(posts.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}