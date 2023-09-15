import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import styles from './index.module.css';

export default function Layout() {
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Navigation />
            </div>
            <Outlet />
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
