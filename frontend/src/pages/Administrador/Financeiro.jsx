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

const Financeiro = () => {
  const {
    transacoesFiltradas,
    entradas,
    saidas,
    saldo,
    custosFixos,
    custosVariaveis,
    ticketMedio,
    maiorTransacao,
    resumoPorFuncionario,
    modalAberto,
    transacaoSelecionada,
    abrirModal,
    fecharModal,
    salvarTransacao,
    removerTransacao,
    filtro,
    setFiltro,
    receitaMeses,
    vendasPorCategoria,
    contasVencidas,
    mesAtual,
    anoAtual,
    nomesMeses,
    mudarMes,
  } = useFinanceiro();

  // Fallbacks
  const transacoes = transacoesFiltradas ?? [];
  const resumoFuncionarios = resumoPorFuncionario ?? {};
  const receitas = receitaMeses?.() ?? [];
  const vendasCategoria = vendasPorCategoria?.() ?? {};
  const contas = contasVencidas?.() ?? [];

  return (
  <div className="flex min-h-screen bg-gray-100">
    {/* SIDEBAR LATERAL */}
    <SidebarFinanceiro />

    {/* CONTEÚDO PRINCIPAL */}
    <div className="flex-1 p-8 space-y-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Painel Financeiro</h1>

      {/* 1️⃣ Cards de resumo */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
        <FinanceCard title="Saldo Atual" value={`R$ ${(saldo ?? 0).toFixed(2)}`} color="text-green-600" />
        <FinanceCard title="Entradas" value={`R$ ${(entradas ?? 0).toFixed(2)}`} color="text-blue-600" />
        <FinanceCard title="Saídas" value={`R$ ${(saidas ?? 0).toFixed(2)}`} color="text-red-600" />
        <FinanceCard title="Lucro do Mês" value={`R$ ${((entradas ?? 0) - (saidas ?? 0)).toFixed(2)}`} color="text-purple-600" />
        <FinanceCard title="Ticket Médio" value={`R$ ${(ticketMedio ?? 0).toFixed(2)}`} color="text-indigo-600" tooltip="Média de valor gasto por cliente" />
        <FinanceCard title="Maior Transação" value={`R$ ${(maiorTransacao ?? 0).toFixed(2)}`} color="text-pink-600" />
      </div>

      {/* 2️⃣ Custos Fixos x Variáveis */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <CategoryCard 
          title="Custos Fixos" 
          value={custosFixos ?? 0} 
          color="text-yellow-500"
          tooltip="Despesas recorrentes que a empresa precisa pagar todo mês"
        />
        <CategoryCard title="Custos Variáveis" value={custosVariaveis ?? 0} color="text-orange-500" />
      </div>

      {/* 3️⃣ Filtros e tabela */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          <select value={filtro.tipo} onChange={e => setFiltro({...filtro, tipo: e.target.value})} className="px-2 py-1 border rounded">
            <option value="Todos">Todos os tipos</option>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
          <select value={filtro.categoria} onChange={e => setFiltro({...filtro, categoria: e.target.value})} className="px-2 py-1 border rounded">
            <option value="Todos">Todas categorias</option>
            <option value="Fixo">Fixo</option>
            <option value="Variável">Variável</option>
          </select>
          <select value={filtro.funcionario} onChange={e => setFiltro({...filtro, funcionario: e.target.value})} className="px-2 py-1 border rounded">
            <option value="Todos">Todos funcionários</option>
            {Object.keys(resumoFuncionarios).map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        
      </div>

      <FinanceTable transactions={transacoes} onEdit={abrirModal} onRemove={removerTransacao} />

      {/* 4️⃣ Controle de mês */}
      <div className="flex items-center justify-center mt-6 space-x-4">
        <button onClick={() => mudarMes(-1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">&lt;</button>
        <span className="font-semibold">
          {(nomesMeses ? nomesMeses[mesAtual] : "") ?? ""} {(anoAtual ?? "")}
        </span>
        <button onClick={() => mudarMes(1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">&gt;</button>
      </div>

      {/* 5️⃣ Gráficos */}
      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
        <div className="p-4 bg-white shadow rounded-xl">
          <p className="mb-2 text-sm font-medium text-gray-500">Receita Mês a Mês</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={receitas.map((v,i)=>({mes:i+1, receita:v ?? 0}))}>
              <XAxis dataKey="mes" />
              <YAxis />
              <RechartsTooltip />
              <Line type="monotone" dataKey="receita" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <p className="mb-2 text-sm font-medium text-gray-500">Vendas por Categoria</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={Object.entries(vendasCategoria).map(([cat, valor])=>({categoria:cat, valor:valor ?? 0}))}>
              <XAxis dataKey="categoria" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="valor" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6️⃣ Fluxo de caixa resumido */}
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        <FinanceCard title="Fluxo de Entradas" value={`R$ ${(entradas ?? 0).toFixed(2)}`} color="text-green-600" />
        <FinanceCard title="Fluxo de Saídas" value={`R$ ${(saidas ?? 0).toFixed(2)}`} color="text-red-600" />
      </div>

      {/* 7️⃣ KPIs de clientes com tooltip */}
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
        <FinanceCard 
          title="Ticket Médio por Cliente" 
          value={`R$ ${(ticketMedio ?? 0).toFixed(2)}`} 
          color="text-purple-600" 
          tooltip="Média de gasto por cliente em entradas" 
        />
        <FinanceCard 
          title="Clientes Atendidos" 
          value={ [...new Set(transacoes.map(t=>t.cliente))].length } 
          color="text-blue-600" 
          tooltip="Número total de clientes únicos atendidos neste mês" 
        />
        <FinanceCard 
          title="Taxa de Retenção" 
          value={`${Math.round((transacoes.filter((t,i,a)=>a.filter(x=>x.cliente===t.cliente).length>1).length / [...new Set(transacoes.map(t=>t.cliente))].length)*100) || 0}%`} 
          color="text-green-600" 
          tooltip="Porcentagem de clientes que voltaram neste mês" 
        />
      </div>

      {/* 8️⃣ Alertas de contas vencidas */}
      {contas.length > 0 && (
        <div className="p-4 mt-6 text-red-800 bg-red-100 shadow rounded-xl">
          <p className="mb-2 font-semibold">⚠ Contas Vencidas</p>
          <ul className="ml-5 text-sm list-disc">
            {contas.map(d => (
              <li key={d.id}>{d.descricao} - R$ {(d.valor ?? 0).toFixed(2)} (Vencimento: {d.vencimento ?? "-"})</li>
            ))}
          </ul>
        </div>
      )}

      {/* 9️⃣ Calendário compacto */}
      <FinanceCalendar month={mesAtual ?? 0} transactions={transacoes} compact onEdit={abrirModal} />

      {/* 10️⃣ Resumo Mensal */}
      <MonthlySummary
        entradas={entradas ?? 0}
        saidasFixas={custosFixos ?? 0}
        saidasVariaveis={custosVariaveis ?? 0}
        lucro={(entradas ?? 0) - ((custosFixos ?? 0) + (custosVariaveis ?? 0))}
      />

      {/* 11️⃣ Modal */}
      {modalAberto && <TransactionForm onClose={fecharModal} onSave={salvarTransacao} transaction={transacaoSelecionada} />}

      <Tooltip id="tooltip" />
      </div>
  </div>
  );
};

export default Financeiro;
