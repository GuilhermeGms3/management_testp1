from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models.finance import Finance
from ..schemas.finance import FinanceCreate, FinanceOut

from ..schemas.finance import FinanceCreate, FinanceOut

router = APIRouter(prefix="/finance", tags=["finance"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE
@router.post("/", response_model=FinanceOut)
def create_transaction(fin: FinanceCreate, db: Session = Depends(get_db)):
    obj = Finance(**fin.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

# LIST ALL
@router.get("/", response_model=list[FinanceOut])
def list_transactions(
    mes: int | None = None,
    ano: int | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Finance)

    if mes and ano:
        # Importar datetime no topo do arquivo
        from datetime import datetime

        # início do mês atual
        start_date = datetime(ano, mes, 1)
        # início do próximo mês (pra delimitar o intervalo)
        if mes == 12:
            end_date = datetime(ano + 1, 1, 1)
        else:
            end_date = datetime(ano, mes + 1, 1)

        query = query.filter(Finance.date >= start_date, Finance.date < end_date)

    return query.all()

# GET BY ID
@router.get("/{transaction_id}", response_model=FinanceOut)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    obj = db.query(Finance).filter(Finance.id == transaction_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return obj

# UPDATE
@router.put("/{transaction_id}", response_model=FinanceOut)
def update_transaction(transaction_id: int, fin: FinanceCreate, db: Session = Depends(get_db)):
    obj = db.query(Finance).filter(Finance.id == transaction_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    for key, value in fin.model_dump().items():
        setattr(obj, key, value)
    
    db.commit()
    db.refresh(obj)
    return obj

# DELETE
@router.delete("/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    obj = db.query(Finance).filter(Finance.id == transaction_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    db.delete(obj)
    db.commit()
    return {"message": "Deleted successfully"}

