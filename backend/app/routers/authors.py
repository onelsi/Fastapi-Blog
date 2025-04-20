from typing import List
from beanie import PydanticObjectId
from app.schemas import schemas
from fastapi import APIRouter, HTTPException, status, Response
import app.crud.author_crud as crud
from app.schemas.schemas import AuthorUpdate

router = APIRouter(prefix="/authors",
                   tags=["authors"])

@router.get("/", response_model=List[schemas.AuthorResponse], status_code=status.HTTP_200_OK)
async def get_authors_endpoint():
    authors = await crud.get_authors()
    if not authors:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No authors found")
    return authors


@router.get("/{author_id}", response_model=schemas.Author, status_code=status.HTTP_200_OK)
async def get_author_endpoint(author_id: PydanticObjectId):
    author = await crud.get_author_by_id(author_id)
    if not author:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No author found")
    return author

@router.post("/", response_model=schemas.AuthorResponse, status_code=status.HTTP_201_CREATED)
async def create_author_endpoint(author: schemas.AuthorCreate):
    new_author = await crud.create_author(author)
    return schemas.AuthorResponse(id=new_author.id, **author.model_dump())


@router.put("/{author_id}", response_model=schemas.Author, status_code=status.HTTP_200_OK)
async def update_author_endpoint(author_id: PydanticObjectId, update_data: AuthorUpdate):
    author = await crud.update_author(author_id, update_data)
    if not author:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No author found")
    return author


@router.delete("/{author_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_author_endpoint(author_id: PydanticObjectId):
    author = await crud.delete_author(author_id)
    if not author:
        raise HTTPException(status.HTTP_404_NOT_FOUND_NO_CONTENT, detail="No author found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)