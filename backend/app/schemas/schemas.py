from __future__ import annotations
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from beanie import Document, PydanticObjectId



# Author Schema
class Author(BaseModel):
    name: str
    email: EmailStr
    posts: Optional[List[Post]] = None


class AuthorDocument(Document, Author):
    class Settings:
        name = "authors"


class AuthorCreate(Author):
    pass


class AuthorUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None


class AuthorResponse(BaseModel):
    id: PydanticObjectId
    name: str
    email: EmailStr
    posts: Optional[List[Post]] = None


class AuthorReference(BaseModel):
    name: str
    email: EmailStr


#Post Schema
class Post(BaseModel):
    title: str
    content: str
    author: AuthorReference
    created_at: datetime


class PostDocument(Document, Post):
    class Settings:
        name = "posts"


class PostCreate(Post):
    pass


class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None


class PostResponse(BaseModel):
    id: PydanticObjectId
    title: str
    content: str
    author: AuthorReference
    created_at: datetime