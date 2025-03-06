import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#000', padding: '20px', textAlign: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <p style={{ color: 'yellow', fontFamily: 'Arial, sans-serif' }}>
                    © 2025 Nxusbets. Todos los derechos reservados.
                </p>
                <div style={{ marginTop: '10px' }}>
                    <Link href="https://youtube.com/@nxusbets" target="_blank" style={{ margin: '0 10px' }}>
                        <FontAwesomeIcon icon={faYoutube} size="2x" style={{ color: 'yellow' }} />
                    </Link>
                    <Link href="https://tiktok.com/@nxusbets" target="_blank" style={{ margin: '0 10px' }}>
                        <FontAwesomeIcon icon={faTiktok} size="2x" style={{ color: 'yellow' }} />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;