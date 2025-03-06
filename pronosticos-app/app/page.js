// app/page.js
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CrearPronostico from '../components/CrearPronostico';
import AnalisisPronosticos from '../components/AnalisisPronosticos';
import styles from "./page.module.css";

export default function Home() {
  const [pronosticos, setPronosticos] = useState([]);

  const fetchPronosticos = async () => {
    try {
      const pronosticosRes = await axios.get('/api/pronosticos');
      setPronosticos(pronosticosRes.data);
    } catch (error) {
      console.error('Error fetching pronosticos:', error);
    }
  };

  useEffect(() => {
    fetchPronosticos();
  }, []);

  const handlePronosticoCreado = () => {
    // Recarga los pronósticos cuando se crea uno nuevo
    fetchPronosticos();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CrearPronostico onPronosticoCreado={handlePronosticoCreado} />
        <AnalisisPronosticos />
        <div>
          <h2>Pronósticos</h2>
          <table>
            <thead>
              <tr>
                <th>Partido</th>
                <th>Pronóstico</th>
                <th>Resultado</th>
                <th>Cuota</th>
                <th>Ganancia</th>
              </tr>
            </thead>
            <tbody>
              {pronosticos.map((pronostico) => (
                <tr key={pronostico._id}>
                  <td>{pronostico.partido}</td>
                  <td>{pronostico.pronostico}</td>
                  <td>{pronostico.resultado}</td>
                  <td>{pronostico.cuota}</td>
                  <td>{pronostico.ganancia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}