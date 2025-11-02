import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/finance/transactions";


export function useReceitas() {
  const [receitas, setReceitas] = useState([]);

  // Pega todas as receitas do backend
  const fetchReceitas = async () => {
    try {
      const res = await axios.get(API_URL);
      // Aqui ajusta os nomes se necessário, ex: backend usa "amount", frontend "valor"
      const dados = res.data.map(r => ({
        id: r.id,
        tipo: r.type === "income" ? "Serviço" : "Outro", // exemplo, adapte conforme categoria
        nome: r.description,
        cliente: r.cliente || "",
        valor: r.amount,
        data: r.date || r.created_at.split("T")[0],
        formaPagamento: r.payment_method || "Pix",
        status: r.status || "Pago",
      }));
      setReceitas(dados);
    } catch (err) {
      console.error("Erro ao buscar receitas:", err);
    }
  };

  useEffect(() => {
    fetchReceitas();
  }, []);

  // Criar nova receita
  const adicionarReceita = async (novaReceita) => {
    try {
      const payload = {
        description: novaReceita.nome,
        amount: novaReceita.valor,
        type: "income",
        cliente: novaReceita.cliente,
        date: novaReceita.data,
        status: novaReceita.status,
        payment_method: novaReceita.formaPagamento,
      };
      const res = await axios.post(API_URL, payload);
      setReceitas(prev => [...prev, {
        id: res.data.id,
        ...novaReceita
      }]);
    } catch (err) {
      console.error("Erro ao adicionar receita:", err);
    }
  };

  // Atualizar status de pagamento
  const atualizarStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status });
      setReceitas(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  // Deletar receita
  const removerReceita = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setReceitas(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error("Erro ao remover receita:", err);
    }
  };

  return {
    receitas,
    fetchReceitas,
    adicionarReceita,
    atualizarStatus,
    removerReceita
  };
}
