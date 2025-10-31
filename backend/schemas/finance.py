from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

# -------------------
# TRANSACTIONS
# -------------------
class FinanceTransactionBase(BaseModel):
    description: str
    amount: float
    type: str
    category: Optional[str] = None
    client: Optional[str] = None
    employee: Optional[str] = None
    date: date
    fixed: Optional[bool] = False


class FinanceTransactionCreate(FinanceTransactionBase):
    pass


class FinanceTransactionOut(FinanceTransactionBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


# -------------------
# EXPENSES
# -------------------
class FinanceExpenseBase(BaseModel):
    description: str
    category: str
    value: float
    due_date: date
    paid: Optional[bool] = False


class FinanceExpenseCreate(FinanceExpenseBase):
    pass


class FinanceExpenseOut(FinanceExpenseBase):
    id: int

    class Config:
        orm_mode = True


# -------------------
# SCHEDULES
# -------------------
class FinanceScheduleBase(BaseModel):
    title: str
    amount: float
    type: str
    date: date
    status: Optional[str] = "pending"


class FinanceScheduleCreate(FinanceScheduleBase):
    pass


class FinanceScheduleOut(FinanceScheduleBase):
    id: int

    class Config:
        orm_mode = True
