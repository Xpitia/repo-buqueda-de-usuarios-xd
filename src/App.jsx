import {useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import SearchInput from "./components/searchinput";
import Card from "./components/card";
import Query from "mysql/lib/protocol/sequences/Query";

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:8000';

  const obtenerUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(response.data);
      setError(null); // limpia error si la petición fue exitosa
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setError('Error al obtener usuarios');
      toast.error('❌ Error al obtener los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const filtrarUsuarios = useCallback(() => {
    if (!busqueda) {
      setFiltrados(usuarios);
      return;
    }

    const resultados = usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setFiltrados(resultados);
  }, [usuarios, busqueda]);

  useEffect(() => {
    filtrarUsuarios();
  }, [filtrarUsuarios]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-4">Buscador de usuarios</h1>

      <SearchInput busqueda={busqueda} setBusqueda={setBusqueda} />

      {loading ? (
        <p className="text-center">Cargando usuarios...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtrados.map((usuario) => (
            <Card key={usuario.id} data={usuario} />
          ))}
        </div>
      )}
    </div>
  );
}
