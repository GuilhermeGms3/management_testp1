import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // seu backend FastAPI

const Chatbot = () => {
  const [appointments, setAppointments] = useState([]);
  const [authStatus, setAuthStatus] = useState("desconectado"); // "autenticado" ou "desconectado"
  const [loading, setLoading] = useState(true);

  // Busca agendamentos do backend
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/appointment/`);
      setAppointments(
        res.data.map((a) => ({
          id: a.id,
          client: a.customer_name,
          time: new Date(a.start_at).toLocaleString(),
          status: "Pendente",
        }))
      );
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
    }
  };

  // Busca status do bot
  const fetchAuthStatus = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bot/status`); // criar endpoint no backend
      setAuthStatus(res.data.authenticated ? "autenticado" : "desconectado");
    } catch (err) {
      console.error("Erro ao buscar status do bot:", err);
      setAuthStatus("desconectado");
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchAuthStatus();
    setLoading(false);
  }, []);

  const handleAccept = (id) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status: "Aceito" } : a))
    );
  };

  const handleReject = (id) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status: "Rejeitado" } : a))
    );
  };

  const handleChat = (client) => {
    const numeroDoCliente = "5511999999999"; // substituir dinamicamente depois
    window.open(`https://web.whatsapp.com/send?phone=${numeroDoCliente}`, "_blank");
  };

  const handleReauth = async () => {
    try {
      await axios.post(`${API_BASE_URL}/bot/reauth`); // endpoint que gera novo QR
      alert("Solicitado novo QR para autenticação. Verifique o terminal do bot!");
      setAuthStatus("desconectado");
    } catch (err) {
      console.error("Erro ao solicitar reautenticação:", err);
      alert("Erro ao solicitar reautenticação.");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="mb-4 text-2xl font-bold">Chatbot de Agendamentos</h1>

      {/* Status de autenticação */}
      <div className="flex items-center justify-between p-4 bg-yellow-100 rounded shadow">
        <p>Status do WhatsApp: <strong>{authStatus}</strong></p>
        <button
          onClick={handleReauth}
          className="px-3 py-1 text-white bg-blue-600 rounded"
        >
          Reautenticar
        </button>
      </div>

      {/* Lista de agendamentos */}
      <div className="flex flex-col gap-4">
        {appointments.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between p-4 bg-gray-100 rounded shadow"
          >
            <div>
              <p>
                <strong>{a.client}</strong> - {a.time}
              </p>
              <p>Status: {a.status}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(a.id)}
                className="px-2 py-1 text-white bg-green-500 rounded"
              >
                Aceitar
              </button>
              <button
                onClick={() => handleReject(a.id)}
                className="px-2 py-1 text-white bg-red-500 rounded"
              >
                Rejeitar
              </button>
              <button
                onClick={() => handleChat(a.client)}
                className="px-2 py-1 text-white bg-blue-600 rounded"
              >
                Conversar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
