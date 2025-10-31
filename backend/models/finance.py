from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from ..database import Base

# 💰 Transações (Entradas e Saídas)
class FinanceTransaction(Base):
    __tablename__ = "finance_transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(String, nullable=False)  # "Entrada" ou "Saída"
    category = Column(String, nullable=True)  # "Serviço", "Produto", "Fixo" etc
    client = Column(String, nullable=True)
    employee = Column(String, nullable=True)
    date = Column(Date, nullable=False)
    fixed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="transactions")


# 📊 Despesas
class FinanceExpense(Base):
    __tablename__ = "finance_expenses"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)  # "Fixo" ou "Variável"
    value = Column(Float, nullable=False)
    due_date = Column(Date, nullable=False)
    paid = Column(Boolean, default=False)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="expenses")


# 🗓️ Agendamentos financeiros
class FinanceSchedule(Base):
    __tablename__ = "finance_schedule"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(String, nullable=False)  # "Entrada" ou "Saída"
    date = Column(Date, nullable=False)
    status = Column(String, default="pending")  # "pending", "done", "cancelled"

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="schedules")
