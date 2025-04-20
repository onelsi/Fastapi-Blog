from typing import List
from beanie import PydanticObjectId
from bson import ObjectId
from app.schemas.schemas import PostDocument, PostUpdate, Post


async def create_post(post: Post):
    post = PostDocument(**post.model_dump())
    await post.insert()
    return post


async def get_posts() -> List[Post]:
    return await PostDocument.find_all().to_list()


async def get_post_by_id(post_id: PydanticObjectId) -> Post:
    return await PostDocument.get(post_id)


async def update_post(post_id: PydanticObjectId, update_data: PostUpdate):
    update_dict = update_data.model_dump(exclude_unset=True)
    if not update_dict:
        return None

    updated_post = await PostDocument.find_one(PostDocument.id == post_id)
    if not updated_post:
        return None
    await updated_post.update({"$set": update_dict})
    return updated_post


async def delete_post(post_id: PydanticObjectId):
    post = await PostDocument.find_one(PostDocument.id == post_id)
    if post:
        await post.delete()
        return post
    return None



