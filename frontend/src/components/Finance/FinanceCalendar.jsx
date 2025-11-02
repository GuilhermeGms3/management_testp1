import React from "react";

const FinanceCalendar = ({ month, transactions, onEdit }) => {
  // Exibe calendário simples: dias do mês com pequenas listas de transações
  const diasDoMes = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="mb-4 text-lg font-bold">Calendário - Mês {month}</h2>
      <div className="grid grid-cols-7 gap-2">
        {diasDoMes.map(dia => (
          <div key={dia} className="h-20 p-2 overflow-auto border">
            <p className="font-semibold">{dia}</p>
            {transactions
              .filter(t => new Date(t.data).getDate() === dia)
              .map(t => (
                <p
                  key={t.id}
                  className={`text-sm cursor-pointer ${t.tipo === "Entrada" ? "text-green-600" : "text-red-600"}`}
                  onClick={() => onEdit(t)}
                >
                  {t.descricao}: R$ {t.valor.toFixed(2)}
                </p>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceCalendar;
