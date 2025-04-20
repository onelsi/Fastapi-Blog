from typing import List
from beanie import PydanticObjectId
from app.schemas import schemas
from fastapi import APIRouter, status, HTTPException, Response
import app.crud.post_crud as crud

router = APIRouter(prefix="/posts",
                   tags=["posts"])

@router.get("/", response_model=List[schemas.PostResponse], status_code=status.HTTP_200_OK)
async def get_posts_endpoint():
    posts = await crud.get_posts()
    if not posts:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No posts found")
    return posts

@router.get("/{post_id}", response_model=schemas.PostResponse, status_code=status.HTTP_200_OK)
async def get_post_endpoint(post_id: PydanticObjectId):
    post = await crud.get_post_by_id(post_id)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return post

@router.post("/", response_model=schemas.PostCreate, status_code=status.HTTP_201_CREATED)
async def create_post_endpoint(post: schemas.PostCreate):
    post = await crud.create_post(post)
    return post

@router.put("/{post_id}", response_model=schemas.Post, status_code=status.HTTP_200_OK)
async def update_post_endpoint(post_id: PydanticObjectId, post_update: schemas.PostUpdate):
    post = await crud.update_post(post_id, post_update)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post_endpoint(post_id: PydanticObjectId):
    post = await crud.delete_post(post_id)
    if not post:
        raise HTTPException(status.HTTP_404_NOT_FOUND_NO_CONTENT, detail="No author found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
