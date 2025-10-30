from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str
    role: str
    store_id: int

class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "employee"
    store_id: int

class UserOut(UserBase):
    id: int
    class Config:
        orm_mode = True
