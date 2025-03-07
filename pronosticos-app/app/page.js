'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CrearPronostico from '../components/CrearPronostico';
import AnalisisPronosticos from '../components/AnalisisPronosticos';
import Navbar from '../components/Navbar';
import styles from './page.module.css';
import Footer from '@/components/Footer';
import axios from 'axios';

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [componenteActivo, setComponenteActivo] = useState('CrearPronostico');
    const [pronosticos, setPronosticos] = useState([]);

    useEffect(() => {
        const checkAuth = () => {
            console.log("useEffect: status =", status, "session =", session);

            if (status === 'unauthenticated') {
                console.log("useEffect: Redirigiendo a /login");
                router.push('/login');
            } else if (status === 'authenticated' && session?.user && session.user.role) {
                console.log("useEffect: Autenticado, setIsLoading(false)");
                setIsLoading(false);
                fetchPronosticos(); // Obtener pronósticos al cargar el componente
            }
        };

        checkAuth();
    }, [status, session, router]);

    const fetchPronosticos = async () => {
        try {
            const response = await axios.get('/api/pronosticos');
            setPronosticos(response.data);
        } catch (error) {
            console.error('Error fetching pronosticos:', error);
        }
    };

    const handleComponenteSeleccionado = (componente) => {
        setComponenteActivo(componente);
    };

    const handlePronosticoCreado = () => {
        console.log("Pronóstico creado");
        fetchPronosticos(); // Actualizar pronósticos después de la creación
    };

    const actualizarPronosticos = (pronosticosActualizados) => {
        setPronosticos(pronosticosActualizados);
    };

    if (isLoading) {
        console.log("isLoading: true");
        return <p>Cargando...</p>;
    }

    console.log("session:", session);
    console.log("session?.user?.role:", session?.user?.role);

    return (
        <div className={styles.page}>
            <Navbar onComponenteSeleccionado={handleComponenteSeleccionado} />
            <main className={styles.main}>
                {componenteActivo === "CrearPronostico" ? (
                    <CrearPronostico onPronosticoCreado={handlePronosticoCreado} />
                ) : (
                    <AnalisisPronosticos pronosticos={pronosticos} actualizarPronosticos={actualizarPronosticos} />
                )}
            </main>
            <Footer />
        </div>
    );
}