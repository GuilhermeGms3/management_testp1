import React from "react";
import FinanceCard from "../../components/Finance/FinanceCard";
import CategoryCard from "../../components/Finance/CategoryCard";
import FinanceTable from "../../components/Finance/Financetable";
import FinanceCalendar from "../../components/Finance/FinanceCalendar";
import TransactionForm from "../../components/Finance/TransactionForm";
import MonthlySummary from "../../components/Finance/MonthlySummary";
import SidebarFinanceiro from "../../components/Finance/SidebarFinanceiro";
import { useFinanceiro } from "../../hooks/useFinanceiro";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, 
  BarChart, Bar, ResponsiveContainer 
} from "recharts";
import { Tooltip } from "react-tooltip";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

const ExpensesTab = ({ expenses, onAddExpense }) => {
  const [newExpense, setNewExpense] = useState({
    description: "",
    category: "",
    value: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.value) return;
    onAddExpense(newExpense);
    setNewExpense({ description: "", category: "", value: "" });
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Despesas</h2>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Descrição"
          className="flex-1 p-2 border rounded-md"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({ ...newExpense, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Categoria"
          className="flex-1 p-2 border rounded-md"
          value={newExpense.category}
          onChange={(e) =>
            setNewExpense({ ...newExpense, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          className="w-32 p-2 border rounded-md"
          value={newExpense.value}
          onChange={(e) =>
            setNewExpense({ ...newExpense, value: e.target.value })
          }
        />
        <button
          type="submit"
          className="flex items-center gap-1 px-4 py-2 text-white bg-green-600 rounded-md"
        >
          <PlusCircle size={16} />
          Adicionar
        </button>
      </form>

      {/* Tabela de despesas */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="p-2">Descrição</th>
            <th className="p-2">Categoria</th>
            <th className="p-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{e.description}</td>
              <td className="p-2">{e.category}</td>
              <td className="p-2 font-semibold text-red-600">
                R$ {parseFloat(e.value).toFixed(2)}
              </td>
            </tr>
          ))}
          {expenses.length === 0 && (
            <tr>
              <td className="p-2 italic text-gray-500" colSpan={3}>
                Nenhuma despesa registrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTab;
