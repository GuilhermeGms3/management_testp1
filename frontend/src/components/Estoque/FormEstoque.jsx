import React from "react";

/**
 * Formulário para adicionar novo item ao estoque
 * - newItem: objeto com nome, quantidade e preço
 * - setNewItem: atualiza o estado do item novo
 * - addItem: função para salvar o item no estado (ou API futura)
 */
const FormEstoque = ({ newItem, setNewItem, addItem }) => {
  return (
    <form
      onSubmit={addItem}
      className="grid gap-4 p-6 bg-white shadow-md rounded-2xl sm:grid-cols-2 lg:grid-cols-4"
    >
      <input
        type="text"
        placeholder="Nome do item"
        className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Quantidade"
        className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        value={newItem.quantity}
        onChange={(e) =>
          setNewItem({ ...newItem, quantity: Number(e.target.value) })
        }
        required
      />
      <input
        type="number"
        placeholder="Preço unitário"
        className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        value={newItem.price}
        onChange={(e) =>
          setNewItem({ ...newItem, price: Number(e.target.value) })
        }
        required
      />
      <button
        type="submit"
        className="p-3 font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Adicionar
      </button>
    </form>
  );
};

export default FormEstoque;
