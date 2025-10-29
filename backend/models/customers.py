from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class CustomerHistory(Base):
    __tablename__ = "customer_history"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    type = Column(String)
    value = Column(Float)
    date = Column(Date)
    notes = Column(String, default="")

    customer = relationship("Customer", back_populates="history")

# e no Customer existente:
class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    history = relationship("CustomerHistory", back_populates="customer")
