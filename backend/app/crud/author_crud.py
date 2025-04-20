from typing import List, Optional

from beanie import PydanticObjectId
from bson import ObjectId

from app.schemas.schemas import AuthorUpdate, Author, AuthorDocument, AuthorCreate


async def create_author(author: AuthorCreate):
    author = AuthorDocument(**author.model_dump())
    await author.insert()
    return author


async def get_authors() -> List[Author]:
    return await AuthorDocument.find_all().to_list()


async def get_author_by_id(author_id: PydanticObjectId):
    return await AuthorDocument.get(author_id)


async def update_author(author_id: PydanticObjectId, update_data: AuthorUpdate):
    update_dict = update_data.model_dump(exclude_unset=True)
    if not update_dict:
        return None

    updated_author = await AuthorDocument.find_one(AuthorDocument.id == author_id)
    if not updated_author:
        return None

    await updated_author.update({"$set": update_dict})
    return await AuthorDocument.get(author_id)


async def delete_author(author_id: PydanticObjectId):
    author = await AuthorDocument.find_one(AuthorDocument.id == author_id)
    if author:
        await author.delete()
        return author
    return None
