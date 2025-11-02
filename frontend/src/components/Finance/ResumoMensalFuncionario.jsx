import React, { useState, useEffect } from "react";

const ResumoMensalFuncionario = () => {
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [dados, setDados] = useState({
    receita: 0,
    despesas: 0,
    lucro: 0,
  });

  const nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Alternar entre meses
  const mudarMes = (direcao) => {
    let novoMes = mesAtual + direcao;
    let novoAno = anoAtual;

    if (novoMes > 11) {
      novoMes = 0;
      novoAno++;
    } else if (novoMes < 0) {
      novoMes = 11;
      novoAno--;
    }

    setMesAtual(novoMes);
    setAnoAtual(novoAno);
  };

  // Simulação: ao mudar mês, zera ou busca novos dados
  useEffect(() => {
    // Aqui no futuro pode vir um fetch ou cálculo real por mês
    setDados({
      receita: 0,
      despesas: 0,
      lucro: 0,
    });
  }, [mesAtual, anoAtual]);

  return (
    <div className="p-6 bg-white shadow-md rounded-2xl">
      {/* Cabeçalho com setas de navegação */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => mudarMes(-1)}
          className="text-2xl text-gray-600 hover:text-gray-900"
        >
          &lt;
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          {nomesMeses[mesAtual]} {anoAtual}
        </h2>

        <button
          onClick={() => mudarMes(1)}
          className="text-2xl text-gray-600 hover:text-gray-900"
        >
          &gt;
        </button>
      </div>

      {/* Resumo numérico */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h3 className="text-sm text-gray-500">Receita</h3>
          <p className="text-lg font-semibold text-green-600">
            R$ {dados.receita.toFixed(2)}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Despesas</h3>
          <p className="text-lg font-semibold text-red-600">
            R$ {dados.despesas.toFixed(2)}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Lucro</h3>
          <p className="text-lg font-semibold text-blue-600">
            R$ {dados.lucro.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumoMensalFuncionario;
