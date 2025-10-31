# backend/routers/finance.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import SessionLocal  # sua factory de sessão
from ..models.finance import (
    FinanceTransaction,
    FinanceExpense,
    FinanceSchedule,
)
from ..schemas.finance import (
    FinanceTransactionCreate,
    FinanceTransactionOut,
    FinanceExpenseCreate,
    FinanceExpenseOut,
    FinanceScheduleCreate,
    FinanceScheduleOut,
)

router = APIRouter(prefix="/finance", tags=["finance"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------------
# TRANSACTIONS (CRUD)
# ------------------------
@router.post("/transactions", response_model=FinanceTransactionOut)
def create_transaction(payload: FinanceTransactionCreate, db: Session = Depends(get_db)):
    obj = FinanceTransaction(**payload.model_dump()) if hasattr(payload, "model_dump") else FinanceTransaction(**payload.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/transactions", response_model=list[FinanceTransactionOut])
def list_transactions(mes: int | None = None, ano: int | None = None, db: Session = Depends(get_db)):
    query = db.query(FinanceTransaction)
    if mes and ano:
        start_date = datetime(ano, mes, 1).date()
        if mes == 12:
            end_date = datetime(ano + 1, 1, 1).date()
        else:
            end_date = datetime(ano, mes + 1, 1).date()
        # FinanceTransaction.date é do tipo Date
        query = query.filter(FinanceTransaction.date >= start_date, FinanceTransaction.date < end_date)
    return query.all()

@router.get("/transactions/{transaction_id}", response_model=FinanceTransactionOut)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    obj = db.query(FinanceTransaction).filter(FinanceTransaction.id == transaction_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return obj

@router.put("/transactions/{transaction_id}", response_model=FinanceTransactionOut)
def update_transaction(transaction_id: int, payload: FinanceTransactionCreate, db: Session = Depends(get_db)):
    obj = db.query(FinanceTransaction).filter(FinanceTransaction.id == transaction_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Transaction not found")
    data = payload.model_dump() if hasattr(payload, "model_dump") else payload.dict()
    for key, value in data.items():
        setattr(obj, key, value)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/transactions/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    obj = db.query(FinanceTransaction).filter(FinanceTransaction.id == transaction_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(obj)
    db.commit()
    return {"message": "Deleted successfully"}


# ------------------------
# EXPENSES
# ------------------------
@router.post("/expenses", response_model=FinanceExpenseOut)
def create_expense(payload: FinanceExpenseCreate, db: Session = Depends(get_db)):
    obj = FinanceExpense(**(payload.model_dump() if hasattr(payload, "model_dump") else payload.dict()))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/expenses", response_model=list[FinanceExpenseOut])
def list_expenses(db: Session = Depends(get_db)):
    return db.query(FinanceExpense).all()


# ------------------------
# SCHEDULE
# ------------------------
@router.post("/schedule", response_model=FinanceScheduleOut)
def create_schedule(payload: FinanceScheduleCreate, db: Session = Depends(get_db)):
    obj = FinanceSchedule(**(payload.model_dump() if hasattr(payload, "model_dump") else payload.dict()))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/schedule", response_model=list[FinanceScheduleOut])
def list_schedule(db: Session = Depends(get_db)):
    return db.query(FinanceSchedule).all()
