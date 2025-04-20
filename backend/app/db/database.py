from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.schemas.schemas import AuthorDocument, PostDocument

MONGO_DB = "blog_db"

async def init_db():
    """
    Initialize the database
    """
    client = AsyncIOMotorClient("mongodb://localhost:27017")

    db = client[MONGO_DB]

    await init_beanie(database=db, document_models=[AuthorDocument, PostDocument])
