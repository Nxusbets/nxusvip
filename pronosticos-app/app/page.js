'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import CrearPronostico from '../components/CrearPronostico';
import AnalisisPronosticos from '../components/AnalisisPronosticos';
import Navbar from '../components/Navbar';
import styles from './page.module.css';
import Footer from '@/components/Footer';

export default function Home() {
    const [pronosticos, setPronosticos] = useState([]);
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
        fetchPronosticos();
    }, []);

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
                    <AnalisisPronosticos pronosticos={pronosticos} actualizarPronosticos={actualizarPronosticos} />
                )}
            </main>
            <Footer />
        </div>
    );
}