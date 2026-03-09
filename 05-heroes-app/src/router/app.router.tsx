import { AdminPage } from "@/admin/pages/AdminPage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { HeroesLayout } from "@/herores/layouts/HeroesLayout";
import { HeroPage } from "@/herores/pages/hero/HeroPage";
import { HomePage } from "@/herores/pages/home/HomePage";
import { createBrowserRouter, Navigate } from "react-router";
// import { SearchPage } from "@/herores/pages/search/SearchPage";

import { lazy } from "react";

const SearchPage = lazy(() => import('@/herores/pages/search/SearchPage'))

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'heroes/:idSlug',
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    },
    
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    }
])