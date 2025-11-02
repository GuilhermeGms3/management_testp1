import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/finance";

export function useFinanceiro({ tipoUsuario = "dono" } = {}) {
  const [transacoes, setTransacoes] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  const [filtro, setFiltro] = useState({
    tipo: "Todos",
    categoria: "Todos",
    funcionario: "Todos",
    cliente: "Todos",
  });

  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

  const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const mudarMes = (direcao) => {
    let novoMes = mesAtual + direcao;
    let novoAno = anoAtual;
    if (novoMes > 11) { novoMes = 0; novoAno++; }
    else if (novoMes < 0) { novoMes = 11; novoAno--; }
    setMesAtual(novoMes);
    setAnoAtual(novoAno);
  };

  // 🧠 --- CONEXÃO COM O BACKEND --- 🧠
  const carregarTransacoes = async () => {
    try {
      const res = await axios.get(`${API_URL}?mes=${mesAtual + 1}&ano=${anoAtual}`);
      setTransacoes(res.data);
    } catch (err) {
      console.error("Erro ao carregar transações:", err);
    }
  };

  const criarTransacao = async (novaTransacao) => {
    try {
      const res = await axios.post(API_URL, novaTransacao);
      setTransacoes(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Erro ao criar transação:", err);
    }
  };

  const atualizarTransacao = async (id, transacaoAtualizada) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, transacaoAtualizada);
      setTransacoes(prev => prev.map(t => t.id === id ? res.data : t));
    } catch (err) {
      console.error("Erro ao atualizar transação:", err);
    }
  };

  const deletarTransacao = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTransacoes(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Erro ao deletar transação:", err);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, [mesAtual, anoAtual]);

  // 📦 --- MOCKS FIXOS LOCAIS ---
  useEffect(() => {
    setDespesas([
      { id: 1, descricao: "Aluguel", categoria: "Fixo", valor: 1200, vencimento: "2025-10-05" },
      { id: 2, descricao: "Energia", categoria: "Fixo", valor: 300, vencimento: "2025-10-10" },
      { id: 3, descricao: "Compra de shampoo", categoria: "Variável", valor: 150, vencimento: "2025-10-15" },
    ]);

    setVendas([
      { id: 1, tipo: "Serviço", valor: 100, cliente: "João", data: "2025-10-20", funcionario: "Maria" },
      { id: 2, tipo: "Produto", valor: 50, cliente: "Carlos", data: "2025-10-19", funcionario: "Maria" },
      { id: 3, tipo: "Combo", valor: 200, cliente: "Ana", data: "2025-10-18", funcionario: "Maria" },
    ]);
  }, []);

  // 🎯 --- FILTRAGEM ---
  const transacoesFiltradas = transacoes.filter(t => {
    const data = new Date(t.date || t.data);
    return (
      (filtro.tipo === "Todos" || t.tipo === filtro.tipo) &&
      (filtro.categoria === "Todos" || t.categoria === filtro.categoria) &&
      (filtro.funcionario === "Todos" || t.funcionario === filtro.funcionario) &&
      (filtro.cliente === "Todos" || t.cliente === filtro.cliente) &&
      data.getMonth() === mesAtual &&
      data.getFullYear() === anoAtual
    );
  });

  // 💡 --- CÁLCULOS E KPI ---
  const entradas = transacoesFiltradas.filter(t => t.tipo === "Entrada").reduce((acc, t) => acc + (t.valor || t.amount || 0), 0);
  const saidas = transacoesFiltradas.filter(t => t.tipo === "Saída").reduce((acc, t) => acc + (t.valor || t.amount || 0), 0);
  const saldo = entradas - saidas;

  const custosFixos = despesas.filter(d => d.categoria === "Fixo").reduce((acc, d) => acc + d.valor, 0);
  const custosVariaveis = despesas.filter(d => d.categoria === "Variável").reduce((acc, d) => acc + d.valor, 0);

  const ticketMedio = transacoesFiltradas.filter(t => t.tipo === "Entrada").length
    ? entradas / transacoesFiltradas.filter(t => t.tipo === "Entrada").length
    : 0;

  const maiorTransacao = transacoesFiltradas.length
    ? Math.max(...transacoesFiltradas.map(t => t.valor || t.amount || 0))
    : 0;

  const numTransacoes = transacoesFiltradas.length;

  // KPI por funcionário
  const resumoPorFuncionario = {};
  transacoesFiltradas.forEach(t => {
    if (t.funcionario) {
      resumoPorFuncionario[t.funcionario] = resumoPorFuncionario[t.funcionario] || { entradas: 0, saidas: 0 };
      if (t.tipo === "Entrada") resumoPorFuncionario[t.funcionario].entradas += t.valor || t.amount || 0;
      if (t.tipo === "Saída") resumoPorFuncionario[t.funcionario].saidas += t.valor || t.amount || 0;
    }
  });

  // 🪟 --- MODAL ---
  const abrirModal = (transacao = null) => {
    setTransacaoSelecionada(transacao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setTransacaoSelecionada(null);
    setModalAberto(false);
  };

  const salvarTransacao = async (novaTransacao) => {
    if (novaTransacao.id) {
      await atualizarTransacao(novaTransacao.id, novaTransacao);
    } else {
      await criarTransacao(novaTransacao);
    }
    fecharModal();
  };

  const removerTransacao = async (id) => {
    await deletarTransacao(id);
  };

  // ⚙️ --- EXTRA: FUNÇÕES DE ANÁLISE ---
  const contasVencidas = () => {
    const hoje = new Date();
    return despesas.filter(d => new Date(d.vencimento) < hoje);
  };

  const receitaMeses = () => {
    const meses = Array.from({ length: 12 }, () => 0);
    transacoes.filter(t => t.tipo === "Entrada").forEach(t => {
      const mes = new Date(t.date || t.data).getMonth();
      meses[mes] += t.valor || t.amount || 0;
    });
    return meses;
  };

  const vendasPorCategoria = () => {
    const categorias = { Serviço: 0, Produto: 0, Combo: 0 };
    transacoes.filter(t => t.tipo === "Entrada").forEach(t => {
      if (categorias[t.categoria] !== undefined) categorias[t.categoria] += t.valor || t.amount || 0;
    });
    return categorias;
  };

  return {
    transacoes,
    transacoesFiltradas,
    vendas,
    despesas,
    entradas,
    saidas,
    saldo,
    custosFixos,
    custosVariaveis,
    ticketMedio,
    maiorTransacao,
    numTransacoes,
    resumoPorFuncionario,
    contasVencidas,
    receitaMeses,
    vendasPorCategoria,
    modalAberto,
    transacaoSelecionada,
    abrirModal,
    fecharModal,
    salvarTransacao,
    removerTransacao,
    filtro,
    setFiltro,
    mesAtual,
    anoAtual,
    nomesMeses,
    mudarMes,
  };
}
