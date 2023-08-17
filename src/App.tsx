import React from 'react';
import Dashboard from './Views/Dashboard';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import Layout from './Layout';
import Edit from './Views/Edit';
import Create from './Views/Create';

export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/create" element={<Create />} />
                </Route>
                <Route path="/login" element={<>Login</>} />
                <Route path="*" element={<>NotFound</>} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}
