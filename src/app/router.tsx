import { createBrowserRouter } from "react-router-dom";

import MainLayout from 'src/layout/main-layout';
import AuthLayout from 'src/layout/auth-layout';
import Register from 'src/pages/register';
import Login from 'src/pages/login';
import Dashboard from 'src/pages/dashboard';
import Estimate from 'src/pages/estimate';
import Project from 'src/pages/project';

export default createBrowserRouter([
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            { path: "register", element: <Register /> },
            { path: "login", element: <Login /> },
        ],
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Dashboard /> },
            { path: "estimate", element: <Estimate /> },
            { path: "project", element: <Project /> },
        ],
    },
]);