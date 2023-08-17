import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout() {
    return (
        <div
            className="main"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '100vh'
            }}
        >
            <div
                className="navbar"
                style={{ marginBlockEnd: '20px', marginBlockStart: '100px' }}
            >
                <Navigation />
            </div>
            <Outlet />
            <div
                className="footer"
                style={{
                    position: 'relative',
                    bottom: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBlockStart: '30px'
                }}
            >
                <Footer />
            </div>
        </div>
    );
}
