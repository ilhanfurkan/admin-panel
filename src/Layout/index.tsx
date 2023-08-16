import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function Layout() {
    return (
        <div className="main">
            <div className="navbar">
                <Navigation />
            </div>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}
