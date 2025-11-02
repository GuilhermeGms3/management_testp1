import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Filters from "../components/Clientes/Filters";
import FormCliente from "../components/Clientes/FormCliente";
import TableClientes from "../components/Clientes/TableClientes";
import ModalCliente from "../components/Clientes/ModalCliente";

const initialHistory = [
  { name: "João Silva", type: "Corte clássico", value: 50, date: "2025-11-17", notes: "Prefere máquina 3" },
  { name: "Maria Souza", type: "Degradê", value: 60, date: "2025-10-17", notes: "" },
  { name: "Carlos Pereira", type: "Barba", value: 30, date: "2025-09-16", notes: "Alergia a produtos fortes" },
];

const Clientes = () => {
  const [history, setHistory] = useState(initialHistory);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newEntry, setNewEntry] = useState({
    name: "",
    type: "",
    value: "",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  });
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.state?.filterMonth) setFilterDate(location.state.filterMonth);
  }, [location.state]);

  const addEntry = (e) => {
    e.preventDefault();
    setHistory([...history, newEntry]);
    setNewEntry({ name: "", type: "", value: "", date: new Date().toISOString().slice(0, 10), notes: "" });
    setShowForm(false);
  };

  const removeEntry = (index) => {
    setHistory(history.filter((_, i) => i !== index));
    if (selectedClient === index) setSelectedClient(null);
  };

  const filteredHistory = useMemo(() => {
    return history
      .filter(h => search ? h.name.toLowerCase().includes(search.toLowerCase()) : true)
      .filter(h => filterDate ? h.date.startsWith(filterDate) : true)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [history, search, filterDate]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <Filters 
        search={search} 
        setSearch={setSearch} 
        filterDate={filterDate} 
        setFilterDate={setFilterDate} 
        showForm={showForm} 
        setShowForm={setShowForm} 
      />
      {showForm && (
        <FormCliente 
          newEntry={newEntry} 
          setNewEntry={setNewEntry} 
          addEntry={addEntry} 
        />
      )}
      <TableClientes 
        filteredHistory={filteredHistory || []} 
        setSelectedClient={setSelectedClient} 
        removeEntry={removeEntry} 
      />
      <ModalCliente 
        selectedClient={selectedClient} 
        setSelectedClient={setSelectedClient} 
        history={history} 
      />
    </div>
  );
};

export default Clientes;
