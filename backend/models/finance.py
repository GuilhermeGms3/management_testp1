from sqlalchemy import Column,Integer,String,DateTime,Float,Boolean,Date
from datetime import datetime, timezone
from ..database import Base


class Finance(Base):
    __tablename__ = "finance"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Float)
    type = Column(String)  # "income" ou "expense"
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class FinanceTransaction(Base):
    __tablename__ = "finance_transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(String, nullable=False)  # "income" | "expense"
    fixed = Column(Boolean, default=False)  # se é despesa fixa
    category = Column(String, nullable=True)  # "aluguel", "serviço", etc
    date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class FinanceSchedule(Base):
    __tablename__ = "finance_schedule"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(String, nullable=False)  # "income" ou "expense"
    date = Column(Date, nullable=False)  # data do evento
    status = Column(String, default="pending")  # "pending", "done", "cancelled"
