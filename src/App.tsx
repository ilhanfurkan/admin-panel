import React from 'react';
import Dashboard from './Views/Dashboard/Dashboard';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import Layout from './Layout';
import Editor from './Views/Editor/Editor';
import Create from './Views/Create/Create';
import SignIn from './Views/Login';
import NotLoggedIn from './Routers/NotLoggedIn';
import LoggedIn from './Routers/LoggedIn';

export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<LoggedIn />}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="/edit" element={<Editor />} />
                        <Route path="/create" element={<Create />} />
                    </Route>
                </Route>
                <Route element={<NotLoggedIn />}>
                    <Route path="/login" element={<SignIn />} />
                </Route>
                <Route path="*" element={<>NotFound</>} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}
