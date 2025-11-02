import React, { useState } from "react";
// import axios from "axios"; // futura integração com API
import Dashboard from "../components/Estoque/Dashboard";
import FormEstoque from "../components/Estoque/FormEstoque";
import TabelaEstoque from "../components/Estoque/TabelaEstoque";

// Dados simulados
const initialItems = [
  { id: 1, name: "Pomada", quantity: 10, price: 15 },
  { id: 2, name: "Shampoo", quantity: 5, price: 25 },
];

const Estoque = () => {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editingValues, setEditingValues] = useState({ quantity: 0 });

  // gera id simples (futuro backend vai fornecer)
  const nextId = () => (items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1);

  // adicionar novo item
  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    const itemToAdd = { id: nextId(), ...newItem };
    setItems([...items, itemToAdd]);
    setNewItem({ name: "", quantity: 0, price: 0 });
    // TODO: POST para API
  };

  // remover item
  const removeItem = (id) => {
    const ok = window.confirm("Remover este item do estoque?");
    if (!ok) return;
    setItems(items.filter((it) => it.id !== id));
    // TODO: DELETE para API
  };

  // começar edição
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingValues({ quantity: item.quantity });
  };

  // cancelar edição
  const cancelEdit = () => {
    setEditingId(null);
    setEditingValues({ quantity: 0 });
  };

  // salvar edição
  const saveEdit = (id) => {
    setItems(items.map((it) =>
      it.id === id ? { ...it, quantity: Number(editingValues.quantity) } : it
    ));
    setEditingId(null);
    // TODO: PUT/PATCH para API
  };

  const changeEditingQuantity = (val) => setEditingValues({ quantity: val });

  const incr = (id, delta = 1) => {
    setItems(items.map((it) =>
      it.id === id ? { ...it, quantity: Math.max(0, it.quantity + delta) } : it
    ));
    // TODO: PATCH para API
  };

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalValue = items.reduce((acc, i) => acc + i.quantity * i.price, 0);

  return (
    <div className="flex flex-col gap-8 p-6">
      <Dashboard totalItems={totalItems} totalValue={totalValue} totalProducts={items.length} />
      <FormEstoque newItem={newItem} setNewItem={setNewItem} addItem={addItem} />
      <TabelaEstoque
        items={items}
        editingId={editingId}
        editingValues={editingValues}
        startEdit={startEdit}
        cancelEdit={cancelEdit}
        saveEdit={saveEdit}
        changeEditingQuantity={changeEditingQuantity}
        incr={incr}
        removeItem={removeItem}
      />
    </div>
  );
};

export default Estoque;
