import React from "react";

/**
 * Tabela de produtos
 * - items: lista de itens do estoque
 * - editingId / editingValues: controle de edição inline
 * - startEdit / cancelEdit / saveEdit: funções para edição
 * - changeEditingQuantity: altera a quantidade em edição
 * - incr: incrementa/decrementa quantidade rapidamente
 * - removeItem: remove item do estoque
 */
const TabelaEstoque = ({
  items,
  editingId,
  editingValues,
  startEdit,
  cancelEdit,
  saveEdit,
  changeEditingQuantity,
  incr,
  removeItem,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 font-semibold text-left text-gray-600">Produto</th>
            <th className="px-4 py-3 font-semibold text-left text-gray-600">Quantidade</th>
            <th className="px-4 py-3 font-semibold text-left text-gray-600">Preço (R$)</th>
            <th className="px-4 py-3 font-semibold text-center text-gray-600">Total (R$)</th>
            <th className="px-4 py-3 font-semibold text-center text-gray-600">Ações</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            const isEditing = editingId === item.id;
            return (
              <tr key={item.id} className="transition-colors border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.name}</td>

                {/* quantidade - se editando mostra input, senão mostra controles */}
                <td className="px-4 py-3">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          changeEditingQuantity(Math.max(0, Number(editingValues.quantity) - 1))
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="w-20 p-1 text-center border rounded"
                        value={editingValues.quantity}
                        onChange={(e) => changeEditingQuantity(Number(e.target.value))}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          changeEditingQuantity(Number(editingValues.quantity) + 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => incr(item.id, -1)}
                        className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                        title="Diminuir"
                      >
                        −
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => incr(item.id, +1)}
                        className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                        title="Aumentar"
                      >
                        +
                      </button>
                    </div>
                  )}
                </td>

                <td className="px-4 py-3">R$ {item.price.toFixed(2)}</td>
                <td className="px-4 py-3 font-medium text-center">
                  R$ {(item.quantity * item.price).toFixed(2)}
                </td>

                <td className="px-4 py-3 text-center">
                  {isEditing ? (
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => saveEdit(item.id)}
                        className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-500"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="inline-flex justify-center gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="px-3 py-1 text-black bg-yellow-400 rounded hover:bg-yellow-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-400"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaEstoque;
