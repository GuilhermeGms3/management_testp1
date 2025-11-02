import React from "react";
import FinanceCard from "../../components/Finance/FinanceCard";
import FinanceTable from "../../components/Finance/Financetable";
import TransactionForm from "../../components/Finance/TransactionForm";
import ResumoMensalFuncionario from "../../components/Finance/ResumoMensalFuncionario";
import { useFinanceiro } from "../../hooks/useFinanceiro";

const FinanceiroFuncionario = () => {
  const {
    transacoes,
    entradas,
    saidas,
    saldo,
    modalAberto,
    transacaoSelecionada,
    abrirModal,
    fecharModal,
    salvarTransacao,
    removerTransacao,
  } = useFinanceiro({ tipoUsuario: "funcionario" })

  return (
    <div className="min-h-screen p-8 space-y-10 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Financeiro do Funcionário
      </h1>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <FinanceCard title="Saldo Atual" value={`R$ ${saldo.toFixed(2)}`} color="text-green-600" />
        <FinanceCard title="Entradas" value={`R$ ${entradas.toFixed(2)}`} color="text-blue-600" />
        <FinanceCard title="Saídas" value={`R$ ${saidas.toFixed(2)}`} color="text-red-600" />
      </div>

      {/* Botão de adicionar */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => abrirModal()}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Adicionar Transação
        </button>
      </div>

      {/* Resumo mensal */}
      <ResumoMensalFuncionario />

      {/* Modal */}
      {modalAberto && (
        <TransactionForm
          onClose={fecharModal}
          onSave={salvarTransacao}
          transaction={transacaoSelecionada}
        />
      )}

      {/* Tabela */}
      <FinanceTable
        transactions={transacoes}
        onEdit={abrirModal}
        onRemove={removerTransacao}
      />
    </div>
  );
};

export default FinanceiroFuncionario;
