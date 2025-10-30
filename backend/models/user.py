from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="employee")  # "owner" ou "employee"
    store_id = Column(Integer, ForeignKey("store.id"), nullable=False)

    store = relationship("Store", backref="users")
