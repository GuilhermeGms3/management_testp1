from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base

class Store(Base):
    __tablename__ = "store"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    address = Column(String, nullable=True)

    # Relacionamento com usuários
    users = relationship("User", back_populates="store")
