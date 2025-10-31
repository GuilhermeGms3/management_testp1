from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"  # Atenção: manter "users" para bater com os FKs nas tabelas financeiras

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="employee")  # "owner" ou "employee"
    store_id = Column(Integer, ForeignKey("store.id"), nullable=False)

    # Relacionamento com Store
    store = relationship("Store", back_populates="users")

    # Relacionamento com tabelas financeiras
    transactions = relationship("FinanceTransaction", back_populates="user")
    expenses = relationship("FinanceExpense", back_populates="user")
    schedules = relationship("FinanceSchedule", back_populates="user")
