'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import CrearPronostico from '../components/CrearPronostico';
import AnalisisPronosticos from '../components/AnalisisPronosticos';
import Navbar from '../components/Navbar';
import styles from './page.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Footer from '@/components/Footer';

export default function Home() {
    const [pronosticos, setPronosticos] = useState([]);
    const [gananciasPorDia, setGananciasPorDia] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const [componenteActivo, setComponenteActivo] = useState('CrearPronostico');
    const pronosticosRef = useRef(pronosticos);

    console.log('page.js re-render'); // Log para rastrear re-renderizaciones

    const fetchPronosticos = async () => {
        try {
            console.log('fetchPronosticos called'); // Log para rastrear llamadas a fetchPronosticos
            const pronosticosRes = await axios.get('/api/pronosticos');
            setPronosticos(pronosticosRes.data);
        } catch (error) {
            console.error('Error fetching pronosticos:', error);
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        fetchPronosticos();
    }, []);

    useEffect(() => {
        if (pronosticos.length > 0) {
            const gananciasDiarias = calcularGananciasPorDia(pronosticos);
            setGananciasPorDia(gananciasDiarias);
        }
    }, [pronosticos]);

    const calcularGananciasPorDia = (pronosticos) => {
        const ganancias = {};
        pronosticos.forEach(pronostico => {
            const fecha = new Date(pronostico.createdAt).toLocaleDateString();
            if (!ganancias[fecha]) {
                ganancias[fecha] = 0;
            }
            ganancias[fecha] += pronostico.ganancia;
        });
        const gananciasArray = Object.keys(ganancias).map(fecha => ({ fecha, ganancia: ganancias[fecha] }));
        return gananciasArray;
    };

    const handlePronosticoCreado = (nuevoPronostico) => {
        setPronosticos(prevPronosticos => [nuevoPronostico, ...prevPronosticos]);
    };

    const handleComponenteSeleccionado = (componente) => {
        setComponenteActivo(componente);
    };

    const actualizarPronosticos = useCallback((pronosticosActualizados) => {
        console.log('actualizarPronosticos called'); // Log para rastrear llamadas a actualizarPronosticos
        if (JSON.stringify(pronosticosRef.current) !== JSON.stringify(pronosticosActualizados)) {
            setPronosticos(pronosticosActualizados);
            pronosticosRef.current = pronosticosActualizados;
        }
    }, []);

    useEffect(() => {
        pronosticosRef.current = pronosticos;
    }, [pronosticos]);

    return (
        <div className={styles.page}>
            <Navbar onComponenteSeleccionado={handleComponenteSeleccionado} />
            <main className={styles.main}>
                {componenteActivo === 'CrearPronostico' && <CrearPronostico onPronosticoCreado={handlePronosticoCreado} />}
                {componenteActivo === 'AnalisisPronosticos' && (
                    <>
                        <AnalisisPronosticos pronosticos={pronosticos} actualizarPronosticos={actualizarPronosticos} />
                        <div className={styles.graficaContainer}>
                            <h2 className={styles.graficaTitle}>Ganancias por Día</h2>
                            {isClient && gananciasPorDia && gananciasPorDia.length > 0 && (
                                <LineChart width={730} height={250} data={gananciasPorDia}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="fecha" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="ganancia" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            )}
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}